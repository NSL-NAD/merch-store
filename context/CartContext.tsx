"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { ShopifyPrice } from "@/lib/shopify/types";

interface CartItem {
  id: string;
  variantId: string;
  title: string;
  productTitle: string;
  handle: string;
  price: ShopifyPrice;
  quantity: number;
  image?: string;
  imageAlt?: string;
  size?: string;
  color?: string;
}

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  subtotal: string;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "gas-merch-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCart(parsed.items || []);
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ items: cart })
      );
    } catch {
      // Silently fail
    }
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart
    .reduce(
      (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
      0
    )
    .toFixed(2);

  const addToCart = useCallback(
    (newItem: Omit<CartItem, "id">) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) => item.variantId === newItem.variantId
        );
        if (existing) {
          return prev.map((item) =>
            item.variantId === newItem.variantId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        return [
          ...prev,
          { ...newItem, id: `local-${Date.now()}-${newItem.variantId}` },
        ];
      });
      setCartOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        checkout,
        isCheckingOut,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
