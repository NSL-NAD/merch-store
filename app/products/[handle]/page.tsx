import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProducts, getProductByHandle } from "@/lib/shopify";
import ProductDetail from "@/components/product/ProductDetail";
import RelatedProducts from "@/components/product/RelatedProducts";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: product.images[0]
        ? [{ url: product.images[0].url }]
        : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([
    getProductByHandle(handle),
    getAllProducts(),
  ]);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6">
      <ProductDetail product={product} />
      <RelatedProducts products={allProducts} currentHandle={handle} />
    </div>
  );
}
