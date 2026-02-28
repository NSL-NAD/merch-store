"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import type { ShopifyVariant, ShopifyProduct } from "@/lib/shopify/types";

interface AddToCartProps {
  product: ShopifyProduct;
  selectedVariant: ShopifyVariant | null;
  needsSelection: boolean;
  hasSizes: boolean;
  selectedColor?: string | null;
}

export default function AddToCart({
  product,
  selectedVariant,
  needsSelection,
  hasSizes,
  selectedColor,
}: AddToCartProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const variant = needsSelection ? selectedVariant : product.variants[0];

  const handleAdd = () => {
    if (!variant) return;

    const size = variant.selectedOptions.find((o) => o.name === "Size")?.value;
    const color =
      selectedColor ||
      variant.selectedOptions.find((o) => o.name === "Color")?.value;

    addToCart({
      variantId: variant.id,
      title: variant.title,
      productTitle: product.title,
      handle: product.handle,
      price: variant.price,
      quantity: 1,
      image: product.images[0]?.url,
      imageAlt: product.images[0]?.altText || product.title,
      size,
      color,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const disabled = needsSelection && !selectedVariant;

  let buttonLabel = "Add to Cart";
  if (added) {
    buttonLabel = "Added!";
  } else if (disabled) {
    buttonLabel = hasSizes ? "Select a Size" : "Select an Option";
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={disabled}
      className={cn(
        "w-full gap-2",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      size="lg"
    >
      <ShoppingBag size={18} />
      {buttonLabel}
    </Button>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
