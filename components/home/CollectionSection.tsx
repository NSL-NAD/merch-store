"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";
import BrandStory from "./BrandStory";
import type { ShopifyProduct } from "@/lib/shopify/types";

export type CollectionTab = "shop" | "coming-soon";

interface CollectionSectionProps {
  shopProducts: ShopifyProduct[];
  comingSoonProducts: ShopifyProduct[];
}

export default function CollectionSection({
  shopProducts,
  comingSoonProducts,
}: CollectionSectionProps) {
  const [tab, setTab] = useState<CollectionTab>("shop");

  return (
    <>
      <ProductGrid
        shopProducts={shopProducts}
        comingSoonProducts={comingSoonProducts}
        tab={tab}
        onTabChange={setTab}
      />
      <BrandStory tab={tab} />
    </>
  );
}
