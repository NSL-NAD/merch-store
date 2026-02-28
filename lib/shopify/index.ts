import { shopifyFetch } from "./client";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from "./queries";
import { getMockProducts, getMockProductByHandle } from "./mock-data";
import type { ShopifyProduct, StorefrontProductEdge } from "./types";

const USE_MOCK =
  !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN === "placeholder";

function reshapeProduct(edge: StorefrontProductEdge): ShopifyProduct {
  const { node } = edge;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    tags: node.tags,
    priceRange: node.priceRange,
    images: node.images.edges.map((e) => e.node),
    variants: node.variants.edges.map((e) => e.node),
    metafields: node.metafields?.filter(Boolean) as
      | { key: string; value: string }[]
      | undefined,
  };
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  if (USE_MOCK) {
    return getMockProducts();
  }

  const data = await shopifyFetch<{
    products: { edges: StorefrontProductEdge[] };
  }>({
    query: GET_PRODUCTS,
    variables: { first: 50 },
  });

  return data.products.edges.map(reshapeProduct);
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  if (USE_MOCK) {
    return getMockProductByHandle(handle) ?? null;
  }

  const data = await shopifyFetch<{
    productByHandle: StorefrontProductEdge["node"] | null;
  }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  if (!data.productByHandle) return null;

  return reshapeProduct({ node: data.productByHandle });
}
