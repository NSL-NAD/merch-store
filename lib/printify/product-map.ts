// Maps local product variant IDs to Printify product + variant IDs.
// Populated from Printify API: GET /v1/shops/26636376/products.json
//
// Tee colors: Faded Black, Faded Dust, Faded Army (sizes S–2XL)
// Hoodie colors: Black, Bone, Cypress (sizes XS–3XL)
// Beanie colors: Army, Black, Coal, Cypress, Ecru, Eucalyptus (one size)
// Socks: single variant (one size)

interface PrintifyVariantMapping {
  printifyProductId: string;
  variants: Record<string, number>; // local variantId → Printify variant ID
}

export const PRINTIFY_PRODUCT_MAP: Record<string, PrintifyVariantMapping> = {
  "gas-tee": {
    printifyProductId: "69a32776eb470f86b105bb9e",
    variants: {
      // Faded Black
      "gid://shopify/ProductVariant/mock-gas-tee-faded-black-s": 110236,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-black-m": 110243,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-black-l": 110250,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-black-xl": 110257,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-black-2xl": 110264,
      // Faded Dust
      "gid://shopify/ProductVariant/mock-gas-tee-faded-dust-s": 110238,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-dust-m": 110245,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-dust-l": 110252,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-dust-xl": 110259,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-dust-2xl": 110266,
      // Faded Army
      "gid://shopify/ProductVariant/mock-gas-tee-faded-army-s": 110235,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-army-m": 110242,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-army-l": 110249,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-army-xl": 110256,
      "gid://shopify/ProductVariant/mock-gas-tee-faded-army-2xl": 110263,
    },
  },
  "gas-sweatshirt": {
    printifyProductId: "69a322c8eb470f86b105ba7b",
    variants: {
      // Black
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-xs": 115730,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-s": 115731,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-m": 115732,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-l": 115733,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-xl": 115734,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-2xl": 115735,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-black-3xl": 115736,
      // Bone
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-xs": 115737,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-s": 115738,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-m": 115739,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-l": 115740,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-xl": 115741,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-2xl": 115742,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-bone-3xl": 115743,
      // Cypress
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-xs": 115772,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-s": 115773,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-m": 115774,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-l": 115775,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-xl": 115776,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-2xl": 115777,
      "gid://shopify/ProductVariant/mock-gas-sweatshirt-cypress-3xl": 115778,
    },
  },
  "gas-beanie": {
    printifyProductId: "69a324c4874d66e74c0e8c41",
    variants: {
      "gid://shopify/ProductVariant/mock-gas-beanie-army": 116201,
      "gid://shopify/ProductVariant/mock-gas-beanie-black": 116203,
      "gid://shopify/ProductVariant/mock-gas-beanie-coal": 116204,
      "gid://shopify/ProductVariant/mock-gas-beanie-cypress": 116205,
      "gid://shopify/ProductVariant/mock-gas-beanie-ecru": 116206,
      "gid://shopify/ProductVariant/mock-gas-beanie-eucalyptus": 116207,
    },
  },
  "gas-socks": {
    printifyProductId: "69a33871f7d8be67940cd0e0",
    variants: {
      "gid://shopify/ProductVariant/mock-gas-socks-one-size": 77921,
    },
  },
};

export function getPrintifyMapping(
  handle: string,
  localVariantId: string
): { productId: string; variantId: number } | null {
  const product = PRINTIFY_PRODUCT_MAP[handle];
  if (!product) return null;

  const variantId = product.variants[localVariantId];
  if (variantId === undefined || variantId === 0) return null;

  return {
    productId: product.printifyProductId,
    variantId,
  };
}
