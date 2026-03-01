"use client";

import { useState, useEffect } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";

interface ProductImagesProps {
  images: ShopifyImage[];
  productTitle: string;
  /** Externally controlled image index (e.g. when color changes) */
  activeIndex?: number;
}

export default function ProductImages({
  images,
  productTitle,
  activeIndex,
}: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync with external activeIndex when it changes
  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== selectedIndex) {
      setSelectedIndex(activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

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
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-sm overflow-hidden border-2 transition-colors cursor-pointer ${
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
