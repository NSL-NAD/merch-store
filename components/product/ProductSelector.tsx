"use client";

import { cn } from "@/lib/utils";
import type { ShopifyVariant } from "@/lib/shopify/types";

// ── Color Selector ──────────────────────────────────────────────────

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  onColorChange: (color: string) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  if (colors.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
        Color{selectedColor ? ` — ${selectedColor}` : ""}
      </p>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = selectedColor === color;

          return (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={cn(
                "px-3 py-2 font-mono text-xs uppercase tracking-wider border transition-colors cursor-pointer",
                isSelected
                  ? "border-gas-orange text-gas-orange"
                  : "border-border-default text-text-secondary hover:text-white hover:border-border-hover"
              )}
            >
              {color}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Size Selector ───────────────────────────────────────────────────

interface SizeSelectorProps {
  variants: ShopifyVariant[];
  selectedVariant: ShopifyVariant | null;
  onVariantChange: (variant: ShopifyVariant) => void;
}

export function SizeSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: SizeSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
        Size
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const size =
            variant.selectedOptions.find((o) => o.name === "Size")?.value ||
            variant.title;
          const isSelected = selectedVariant?.id === variant.id;
          const isAvailable = variant.availableForSale;

          return (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant)}
              disabled={!isAvailable}
              className={cn(
                "min-w-[48px] px-3 py-2 font-mono text-xs uppercase tracking-wider border transition-colors cursor-pointer",
                isSelected
                  ? "border-gas-orange text-gas-orange"
                  : "border-border-default text-text-secondary hover:text-white hover:border-border-hover",
                !isAvailable && "opacity-30 cursor-not-allowed line-through"
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Legacy default export (backwards compat) ────────────────────────

interface ProductSelectorProps {
  variants: ShopifyVariant[];
  selectedVariant: ShopifyVariant | null;
  onVariantChange: (variant: ShopifyVariant) => void;
  hasSizes: boolean;
}

export default function ProductSelector({
  variants,
  selectedVariant,
  onVariantChange,
  hasSizes,
}: ProductSelectorProps) {
  if (!hasSizes) return null;

  return (
    <SizeSelector
      variants={variants}
      selectedVariant={selectedVariant}
      onVariantChange={onVariantChange}
    />
  );
}
