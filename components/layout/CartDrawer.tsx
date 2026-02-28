"use client";

import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    checkout,
    isCheckingOut,
  } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-bg-primary border-l border-border-default flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
              <h2 className="font-display text-lg uppercase tracking-wider">
                Your Cart ({cartCount})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-text-secondary hover:text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Line items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <p className="font-mono text-sm text-text-muted">
                    Your cart is empty
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 pb-4 border-b border-border-default"
                    >
                      {/* Thumbnail */}
                      <div className="h-20 w-16 flex-shrink-0 bg-bg-secondary rounded overflow-hidden flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.imageAlt || item.productTitle}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-mono text-[10px] text-text-muted">
                            IMG
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-text-primary truncate">
                          {item.productTitle}
                        </p>
                        {(item.color || item.size) && (
                          <p className="font-mono text-xs text-text-muted mt-0.5">
                            {[
                              item.color,
                              item.size ? `Size: ${item.size}` : null,
                            ]
                              .filter(Boolean)
                              .join(" / ")}
                          </p>
                        )}
                        <p className="font-mono text-sm text-text-primary mt-1">
                          {formatPrice(item.price.amount)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-6 w-6 flex items-center justify-center border border-border-default text-text-secondary hover:text-white hover:border-border-hover transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-6 w-6 flex items-center justify-center border border-border-default text-text-secondary hover:text-white hover:border-border-hover transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-text-muted hover:text-red-400 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-4 border-t border-border-default">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-text-secondary uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="font-mono text-lg font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="font-mono text-xs text-text-muted mb-4">
                  Free shipping on all orders.
                </p>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={checkout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Redirecting..." : "Checkout"}
                </Button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full mt-2 font-mono text-xs text-text-secondary hover:text-white text-center py-2 transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
