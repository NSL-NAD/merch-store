import ProductCard from "@/components/home/ProductCard";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface RelatedProductsProps {
  products: ShopifyProduct[];
  currentHandle: string;
}

export default function RelatedProducts({
  products,
  currentHandle,
}: RelatedProductsProps) {
  const related = products
    .filter((p) => p.handle !== currentHandle)
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 border-t border-border-default pt-12">
      <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight mb-8">
        More from GAS Merch Lab
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {related.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
