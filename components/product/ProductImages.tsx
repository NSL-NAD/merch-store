"use client";

import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductImagesProps {
  images: ShopifyImage[];
  productTitle: string;
}

export default function ProductImages({
  images,
  productTitle,
}: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-bg-secondary">
        {current ? (
          <img
            src={current.url}
            alt={current.altText || productTitle}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-sm text-text-muted">
              No image available
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 h-16 w-16 rounded-sm overflow-hidden border-2 transition-colors cursor-pointer ${
                selectedIndex === i
                  ? "border-gas-orange"
                  : "border-border-default hover:border-border-hover"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.url}
                alt={img.altText || `${productTitle} view ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
