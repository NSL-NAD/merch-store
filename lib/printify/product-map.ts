// Maps local product variant IDs to Printify product + variant IDs.
// Populated from Printify API: GET /v1/shops/26636376/products.json
//
// Tee colors: Faded Black, Faded Dust, Faded Army (sizes S-2XL)
// Hoodie colors: Black, Bone, Cypress (sizes XS-3XL)
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
  "gas-baby-beanie": {
    printifyProductId: "69a39d2da5dcb1b9a904a3b3",
    variants: {
      "gid://shopify/ProductVariant/mock-gas-baby-beanie-white": 71671,
    },
  },
  "gas-jacket": {
    printifyProductId: "69a62c58d1ff0c1d4f028ae8",
    variants: {
      // Charcoal
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-xs": 121902,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-s": 121894,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-m": 121890,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-l": 121886,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-xl": 121898,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-2xl": 121866,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-3xl": 121870,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-4xl": 121874,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-5xl": 121878,
      "gid://shopify/ProductVariant/mock-gas-jacket-charcoal-6xl": 121882,
      // Duck Brown
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-xs": 121903,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-s": 121895,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-m": 121891,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-l": 121887,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-xl": 121899,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-2xl": 121867,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-3xl": 121871,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-4xl": 121875,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-5xl": 121879,
      "gid://shopify/ProductVariant/mock-gas-jacket-brown-6xl": 121883,
    },
  },
  "gas-infant-tee": {
    printifyProductId: "69a62cf9159295bd3b0ab6a3",
    variants: {
      // Black
      "gid://shopify/ProductVariant/mock-gas-infant-tee-black-6m": 25911,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-black-12m": 21560,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-black-18m": 21561,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-black-24m": 21562,
      // Light Blue
      "gid://shopify/ProductVariant/mock-gas-infant-tee-blue-6m": 25926,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-blue-12m": 21620,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-blue-18m": 21621,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-blue-24m": 21622,
      // Charcoal
      "gid://shopify/ProductVariant/mock-gas-infant-tee-charcoal-6m": 25914,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-charcoal-12m": 21572,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-charcoal-18m": 21573,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-charcoal-24m": 21574,
      // Natural Heather
      "gid://shopify/ProductVariant/mock-gas-infant-tee-natural-6m": 105879,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-natural-12m": 105880,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-natural-18m": 105881,
      "gid://shopify/ProductVariant/mock-gas-infant-tee-natural-24m": 105882,
    },
  },
  "gas-womens-tee": {
    printifyProductId: "69a6f5b38ba84ca389028896",
    variants: {
      // Black
      "gid://shopify/ProductVariant/mock-gas-womens-tee-black-s": 17743,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-black-m": 17744,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-black-l": 17745,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-black-xl": 17746,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-black-2xl": 17747,
      // Army
      "gid://shopify/ProductVariant/mock-gas-womens-tee-army-s": 17713,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-army-m": 17714,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-army-l": 17715,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-army-xl": 17716,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-army-2xl": 17717,
      // Asphalt
      "gid://shopify/ProductVariant/mock-gas-womens-tee-asphalt-s": 17719,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-asphalt-m": 17720,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-asphalt-l": 17721,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-asphalt-xl": 17722,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-asphalt-2xl": 17723,
      // Baby Blue
      "gid://shopify/ProductVariant/mock-gas-womens-tee-blue-s": 17731,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-blue-m": 17732,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-blue-l": 17733,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-blue-xl": 17734,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-blue-2xl": 17735,
      // Soft Cream
      "gid://shopify/ProductVariant/mock-gas-womens-tee-cream-s": 17929,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-cream-m": 17930,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-cream-l": 17931,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-cream-xl": 17932,
      "gid://shopify/ProductVariant/mock-gas-womens-tee-cream-2xl": 17933,
    },
  },
  "gas-journal": {
    printifyProductId: "69a703fbf1dc3031ea072fcd",
    variants: {
      "gid://shopify/ProductVariant/mock-gas-journal-one-size": 104026,
    },
  },
  "gas-mug": {
    printifyProductId: "69a79907e2353ca9ec0a8a6c",
    variants: {
      "gid://shopify/ProductVariant/mock-gas-mug-black": 109067,
      "gid://shopify/ProductVariant/mock-gas-mug-gray": 109064,
      "gid://shopify/ProductVariant/mock-gas-mug-teal": 109078,
    },
  },
  "gas-everyday-tee": {
    printifyProductId: "69a70152a9dfed15aa0767b8",
    variants: {
      // Black
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-xs": 124649,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-s": 124650,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-m": 124651,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-l": 124652,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-xl": 124653,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-2xl": 124654,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-3xl": 124655,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-4xl": 124656,
      // Black Frost
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-xs": 124657,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-s": 124658,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-m": 124659,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-l": 124660,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-xl": 124661,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-2xl": 124662,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-3xl": 124663,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-black-frost-4xl": 124664,
      // Desert Tan Heather
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-xs": 124697,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-s": 124698,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-m": 124699,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-l": 124700,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-xl": 124701,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-2xl": 124702,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-3xl": 124703,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-tan-4xl": 124704,
      // Grey Frost
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-xs": 124745,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-s": 124746,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-m": 124747,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-l": 124748,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-xl": 124749,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-2xl": 124750,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-3xl": 124751,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-grey-4xl": 124752,
      // Military Green Frost
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-xs": 124809,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-s": 124810,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-m": 124811,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-l": 124812,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-xl": 124813,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-2xl": 124814,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-3xl": 124815,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-green-4xl": 124816,
      // Coyote Brown Heather
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-xs": 124921,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-s": 124922,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-m": 124923,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-l": 124924,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-xl": 124925,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-2xl": 124926,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-3xl": 124927,
      "gid://shopify/ProductVariant/mock-gas-everyday-tee-brown-4xl": 124928,
    },
  },
  "gas-tote": {
    printifyProductId: "69a89dc49f5481e57c02a0e5",
    variants: {
      "gid://shopify/ProductVariant/mock-gas-tote-natural": 101409,
      "gid://shopify/ProductVariant/mock-gas-tote-black": 103598,
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
