"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import type { ShopifyProduct } from "@/lib/shopify/types";
import type { CollectionTab } from "./CollectionSection";

type Sort = "featured" | "price-asc" | "price-desc";

interface ProductGridProps {
  shopProducts: ShopifyProduct[];
  comingSoonProducts: ShopifyProduct[];
  tab: CollectionTab;
  onTabChange: (tab: CollectionTab) => void;
}

export default function ProductGrid({
  shopProducts,
  comingSoonProducts,
  tab,
  onTabChange,
}: ProductGridProps) {
  const [sort, setSort] = useState<Sort>("featured");

  const activeProducts = tab === "shop" ? shopProducts : comingSoonProducts;

  const sorted = useMemo(() => {
    if (sort === "featured") return activeProducts;

    return [...activeProducts].sort((a, b) => {
      const aPrice = parseFloat(a.priceRange.minVariantPrice.amount);
      const bPrice = parseFloat(b.priceRange.minVariantPrice.amount);
      return sort === "price-asc" ? aPrice - bPrice : bPrice - aPrice;
    });
  }, [activeProducts, sort]);

  const tabs: { value: CollectionTab; label: string; count: number }[] = [
    { value: "shop", label: "Shop", count: shopProducts.length },
    {
      value: "coming-soon",
      label: "Coming Soon",
      count: comingSoonProducts.length,
    },
  ];

  return (
    <section id="products" className="bg-bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-8">
          {tab === "shop" ? "The Dot Collection" : "Coming Soon"}
        </h2>

        {/* Tab + Sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={() => onTabChange(t.value)}
                className={cn(
                  "px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors cursor-pointer",
                  tab === t.value
                    ? "border-gas-orange text-gas-orange"
                    : "border-border-default text-text-secondary hover:text-white hover:border-border-hover"
                )}
              >
                {t.label}
                <span className="ml-1.5 opacity-50">{t.count}</span>
              </button>
            ))}
          </div>

          {/* Sort - only show for shop tab */}
          {tab === "shop" && (
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-bg-secondary border border-border-default text-text-secondary font-mono text-xs uppercase tracking-wider px-3 py-2 cursor-pointer focus:outline-none focus:border-gas-orange"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {sorted.length === 0 && (
          <p className="text-center font-mono text-sm text-text-muted py-12">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
