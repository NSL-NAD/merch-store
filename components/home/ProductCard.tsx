"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isTee =
    product.tags.includes("tee") || product.tags.includes("t-shirt") || product.tags.includes("everyday-tee");
  const isPoster = product.tags.includes("poster");
  const productType = isTee
    ? "TEE"
    : isPoster
      ? "POSTER"
      : product.tags.find(
          (t) =>
            ["sweatshirt", "beanie", "socks", "jacket", "journal", "mug", "bag"].includes(t)
        )?.toUpperCase() || "APPAREL";
  const price = product.priceRange.minVariantPrice;
  const image = product.images[0];
  const isComingSoon = product.comingSoon;

  // Determine collection label
  const isGasCollection = product.tags.includes("gas-collection");
  const collectionLabel = isGasCollection
    ? "DOT COLLECTION"
    : isComingSoon
      ? "COUNTRY COLLECTION"
      : productType;

  // Extract display name from product title (strips type suffix)
  const displayName = product.title
    .replace(/ (Tee|Poster|Sweatshirt|Beanie|Socks|Jacket|Journal|Mug|Tote)$/i, "")
    .trim();

  const cardContent = (
    <div
      className={`relative overflow-hidden rounded-sm border border-border-default bg-bg-secondary transition-all duration-300 ${
        isComingSoon
          ? "opacity-60"
          : "group-hover:border-border-hover group-hover:shadow-lg group-hover:shadow-black/20 group-hover:scale-[1.02]"
      }`}
    >
      {/* Image */}
      <div className="p-3">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || product.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-bg-tertiary">
              <span className="font-mono text-sm text-text-muted">
                {displayName}
              </span>
            </div>
          )}

          {/* Coming Soon overlay */}
          {isComingSoon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-white/70 bg-black/50 px-4 py-2">
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Badge - collection name */}
      <div className="px-4 pb-1">
        <Badge>{collectionLabel}</Badge>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 pt-2">
        <h3 className="font-display text-base uppercase tracking-wider">
          {displayName}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-mono text-xs text-text-muted uppercase">
            {productType}
          </span>
          {isComingSoon ? (
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Coming Soon
            </span>
          ) : (
            <span className="font-mono text-sm font-semibold">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {isComingSoon ? (
        <div className="block">{cardContent}</div>
      ) : (
        <Link href={`/products/${product.handle}`} className="group block">
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}
