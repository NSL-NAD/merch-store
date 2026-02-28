import { ShopifyProduct } from "./types";
import { COUNTRIES, TEE_PRICE, POSTER_PRICE, TEE_SIZES, GAS_PRODUCTS } from "../constants";

const DESIGN_STORIES: Record<string, string> = {
  mexico:
    "Vibrant Day of the Dead imagery meets ancient Aztec geometry — a celebration of Mexico's rich cultural tapestry, from its bustling mercados to its sacred temples.",
  japan:
    "Cherry blossoms meet neon-lit streets — capturing the harmony between Japan's ancient traditions and its cutting-edge modernity, from Kyoto's temples to Tokyo's electric energy.",
  "new-zealand":
    "Maori-inspired patterns intertwine with dramatic landscapes — from the volcanic peaks of Tongariro to the glowing caves of Waitomo, New Zealand's wild beauty comes alive.",
  "costa-rica":
    "Tropical rainforest canopies, toucans, and volcanic coastlines — a love letter to Costa Rica's pura vida philosophy and its breathtaking biodiversity.",
  italy:
    "Renaissance artistry meets la dolce vita — from the rolling hills of Tuscany to the ancient streets of Rome, Italy's timeless beauty is distilled into a single design.",
  spain:
    "Flamenco passion meets Gaudí's mosaics — a fiery tribute to Spain's artistic spirit, from the plazas of Seville to the shores of Barcelona.",
  egypt:
    "Pyramids rise from golden sands as hieroglyphics tell ancient stories — Egypt's 5,000-year legacy of wonder captured in bold, modern illustration.",
  france:
    "Parisian elegance meets provincial charm — lavender fields, iron lattice, and the unmistakable silhouette of a city that defined art, fashion, and cuisine.",
  greece:
    "Whitewashed walls and cobalt domes against the Aegean blue — Greece's mythic beauty, from the Parthenon to the sunlit islands of the Cyclades.",
  colombia:
    "Emerald mountains, cumbia rhythms, and streets bursting with color — Colombia's vibrant energy and warmth radiate from every element of this design.",
  croatia:
    "Adriatic coastlines meet medieval stone walls — Croatia's stunning blend of Mediterranean beauty and old-world charm, from Dubrovnik to Plitvice's waterfalls.",
  morocco:
    "Geometric zellige tiles, bustling souks, and the warm glow of desert sunsets — Morocco's sensory richness translated into a bold, intricate illustration.",
};

function createTeePlaceholder(countryName: string, region: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <rect width="100%" height="100%" fill="%23111111"/>
    <rect x="32" y="32" width="736" height="936" fill="%23161616" rx="4"/>
    <line x1="32" y1="32" x2="768" y2="968" stroke="%231a1a1a" stroke-width="1"/>
    <line x1="768" y1="32" x2="32" y2="968" stroke="%231a1a1a" stroke-width="1"/>
    <rect x="250" y="380" width="300" height="160" rx="2" fill="%23131313" stroke="%231e1e1e" stroke-width="1"/>
    <text x="400" y="435" font-family="monospace" font-size="11" fill="%23444444" text-anchor="middle" letter-spacing="6">COMING SOON</text>
    <text x="400" y="468" font-family="sans-serif" font-size="24" font-weight="bold" fill="%23333333" text-anchor="middle">${encodeURIComponent(countryName.toUpperCase())}</text>
    <text x="400" y="500" font-family="monospace" font-size="10" fill="%23292929" text-anchor="middle" letter-spacing="3">${encodeURIComponent(region.toUpperCase())} %E2%80%94 TEE</text>
    <circle cx="400" cy="530" r="4" fill="%23FF462E" opacity="0.6"/>
  </svg>`;
  return `data:image/svg+xml,${svg}`;
}

function createPosterPlaceholder(countryName: string, region: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
    <rect width="100%" height="100%" fill="%23111111"/>
    <rect x="32" y="32" width="736" height="1003" fill="%23161616" rx="4"/>
    <line x1="32" y1="32" x2="768" y2="1035" stroke="%231a1a1a" stroke-width="1"/>
    <line x1="768" y1="32" x2="32" y2="1035" stroke="%231a1a1a" stroke-width="1"/>
    <rect x="250" y="430" width="300" height="160" rx="2" fill="%23131313" stroke="%231e1e1e" stroke-width="1"/>
    <text x="400" y="485" font-family="monospace" font-size="11" fill="%23444444" text-anchor="middle" letter-spacing="6">COMING SOON</text>
    <text x="400" y="518" font-family="sans-serif" font-size="24" font-weight="bold" fill="%23333333" text-anchor="middle">${encodeURIComponent(countryName.toUpperCase())}</text>
    <text x="400" y="550" font-family="monospace" font-size="10" fill="%23292929" text-anchor="middle" letter-spacing="3">${encodeURIComponent(region.toUpperCase())} %E2%80%94 POSTER</text>
    <circle cx="400" cy="580" r="4" fill="%23FF462E" opacity="0.6"/>
  </svg>`;
  return `data:image/svg+xml,${svg}`;
}

// GAS Dot Collection — real product images
// Image order: Brick (primary) → Concrete → Lifestyle
import type { ShopifyImage } from "./types";

const GAS_PRODUCT_IMAGES: Record<string, ShopifyImage[]> = {
  "gas-tee": [
    // Brick backgrounds (primary)
    { url: "/products/tee-black-brick.jpg", altText: "GAS Tee — Faded Black on brick", width: 1440, height: 1800 },
    { url: "/products/tee-grey-brick.jpg", altText: "GAS Tee — Faded Dust on brick", width: 1440, height: 1800 },
    { url: "/products/tee-green-brick.jpg", altText: "GAS Tee — Faded Army on brick", width: 1440, height: 1800 },
    // Concrete backgrounds
    { url: "/products/tee-black-concrete.jpg", altText: "GAS Tee — Faded Black on concrete", width: 1201, height: 1800 },
    { url: "/products/tee-grey-concrete.jpg", altText: "GAS Tee — Faded Dust on concrete", width: 1201, height: 1800 },
    { url: "/products/tee-green-concrete.jpg", altText: "GAS Tee — Faded Army on concrete", width: 1201, height: 1800 },
  ],
  "gas-sweatshirt": [
    // Brick backgrounds (primary)
    { url: "/products/hoodie-black-brick.jpg", altText: "GAS Hoodie — Black on brick", width: 1200, height: 1200 },
    { url: "/products/hoodie-green-brick.jpg", altText: "GAS Hoodie — Cypress on brick", width: 1200, height: 1200 },
    { url: "/products/hoodie-tan-brick.jpg", altText: "GAS Hoodie — Bone on brick", width: 1200, height: 1200 },
    // Concrete backgrounds (folded)
    { url: "/products/hoodie-black-concrete.jpg", altText: "GAS Hoodie — Black folded on concrete", width: 1200, height: 1200 },
    { url: "/products/hoodie-green-concrete.jpg", altText: "GAS Hoodie — Cypress folded on concrete", width: 1200, height: 1200 },
    { url: "/products/hoodie-tan-concrete.jpg", altText: "GAS Hoodie — Bone folded on concrete", width: 1200, height: 1200 },
    // Lifestyle
    { url: "/products/hoodie-black-lifestyle.jpg", altText: "GAS Hoodie — Black lifestyle", width: 1200, height: 1800 },
    { url: "/products/hoodie-green-lifestyle.jpg", altText: "GAS Hoodie — Cypress lifestyle", width: 1200, height: 1800 },
    { url: "/products/hoodie-tan-lifestyle.jpg", altText: "GAS Hoodie — Bone lifestyle", width: 1800, height: 1800 },
  ],
  "gas-beanie": [
    // Brick backgrounds (primary)
    { url: "/products/beanie-black-brick.jpg", altText: "GAS Beanie — Black on brick", width: 1200, height: 1200 },
    { url: "/products/beanie-green-brick.jpg", altText: "GAS Beanie — Army on brick", width: 1200, height: 1200 },
    { url: "/products/beanie-grey-brick.jpg", altText: "GAS Beanie — Coal on brick", width: 1200, height: 1200 },
    { url: "/products/beanie-tan-brick.jpg", altText: "GAS Beanie — Ecru on brick", width: 1200, height: 1200 },
    { url: "/products/beanie-cypress-brick.jpg", altText: "GAS Beanie — Cypress on brick", width: 1200, height: 1200 },
    { url: "/products/beanie-eucalyptus-brick.jpg", altText: "GAS Beanie — Eucalyptus on brick", width: 1200, height: 1200 },
    // Concrete backgrounds
    { url: "/products/beanie-black-concrete.jpg", altText: "GAS Beanie — Black on concrete", width: 1800, height: 1350 },
    { url: "/products/beanie-green-concrete.jpg", altText: "GAS Beanie — Army on concrete", width: 1800, height: 1350 },
    { url: "/products/beanie-grey-concrete.jpg", altText: "GAS Beanie — Coal on concrete", width: 1800, height: 1350 },
    { url: "/products/beanie-tan-concrete.jpg", altText: "GAS Beanie — Ecru on concrete", width: 1800, height: 1350 },
  ],
  "gas-socks": [
    { url: "/products/socks-black-brick.jpg", altText: "GAS Socks — Black on brick", width: 1200, height: 1200 },
  ],
};

function createGasProduct(product: (typeof GAS_PRODUCTS)[number]): ShopifyProduct {
  const hasColors = product.colors.length > 0;
  const isSingleSize = product.sizes.length === 1 && product.sizes[0] === "One Size";

  // Generate variants for all color+size combinations
  const variants: ShopifyProduct["variants"] = [];

  if (hasColors) {
    for (const color of product.colors) {
      if (isSingleSize) {
        // Beanie: color only, no size option needed
        variants.push({
          id: `gid://shopify/ProductVariant/mock-${product.slug}-${color.slug}`,
          title: color.name,
          price: { amount: product.price, currencyCode: "USD" },
          availableForSale: true,
          selectedOptions: [{ name: "Color", value: color.name }],
        });
      } else {
        // Tee / Sweatshirt: color + size
        for (const size of product.sizes) {
          variants.push({
            id: `gid://shopify/ProductVariant/mock-${product.slug}-${color.slug}-${size.toLowerCase().replace(" ", "-")}`,
            title: `${color.name} / ${size}`,
            price: { amount: product.price, currencyCode: "USD" },
            availableForSale: true,
            selectedOptions: [
              { name: "Color", value: color.name },
              { name: "Size", value: size },
            ],
          });
        }
      }
    }
  } else {
    // Socks: single variant, no color or size options
    for (const size of product.sizes) {
      variants.push({
        id: `gid://shopify/ProductVariant/mock-${product.slug}-${size.toLowerCase().replace(" ", "-")}`,
        title: size,
        price: { amount: product.price, currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: size }],
      });
    }
  }

  return {
    id: `gid://shopify/Product/mock-${product.slug}`,
    handle: product.slug,
    title: product.title,
    description: product.description,
    descriptionHtml: `<p>${product.description}</p>`,
    tags: [product.type, "gas-collection", `dot-${product.dotStyle}`],
    priceRange: {
      minVariantPrice: { amount: product.price, currencyCode: "USD" },
    },
    images: GAS_PRODUCT_IMAGES[product.slug] || [],
    variants,
    metafields: [
      { key: "dot_style", value: product.dotStyle },
      { key: "design_story", value: product.description },
    ],
  };
}

function createMockTee(
  country: (typeof COUNTRIES)[number]
): ShopifyProduct {
  return {
    id: `gid://shopify/Product/mock-tee-${country.slug}`,
    handle: `${country.slug}-tee`,
    title: `${country.name} Tee`,
    description: DESIGN_STORIES[country.slug] || `A premium acid wash tee featuring a bold illustration inspired by ${country.name}.`,
    descriptionHtml: `<p>${DESIGN_STORIES[country.slug] || `A premium acid wash tee featuring a bold illustration inspired by ${country.name}.`}</p>`,
    tags: ["tee", "t-shirt", country.slug, country.region.toLowerCase()],
    comingSoon: true,
    priceRange: {
      minVariantPrice: { amount: TEE_PRICE, currencyCode: "USD" },
    },
    images: [
      {
        url: createTeePlaceholder(country.name, country.region),
        altText: `${country.name} Tee — Front View`,
        width: 800,
        height: 1000,
      },
    ],
    variants: TEE_SIZES.map((size) => ({
      id: `gid://shopify/ProductVariant/mock-tee-${country.slug}-${size.toLowerCase()}`,
      title: size,
      price: { amount: TEE_PRICE, currencyCode: "USD" },
      availableForSale: true,
      selectedOptions: [{ name: "Size", value: size }],
    })),
    metafields: [
      { key: "country", value: country.name },
      { key: "design_story", value: DESIGN_STORIES[country.slug] || "" },
    ],
  };
}

function createMockPoster(
  country: (typeof COUNTRIES)[number]
): ShopifyProduct {
  return {
    id: `gid://shopify/Product/mock-poster-${country.slug}`,
    handle: `${country.slug}-poster`,
    title: `${country.name} Poster`,
    description: DESIGN_STORIES[country.slug] || `A museum-quality art poster featuring a bold illustration inspired by ${country.name}.`,
    descriptionHtml: `<p>${DESIGN_STORIES[country.slug] || `A museum-quality art poster featuring a bold illustration inspired by ${country.name}.`}</p>`,
    tags: ["poster", country.slug, country.region.toLowerCase()],
    comingSoon: true,
    priceRange: {
      minVariantPrice: { amount: POSTER_PRICE, currencyCode: "USD" },
    },
    images: [
      {
        url: createPosterPlaceholder(country.name, country.region),
        altText: `${country.name} Poster — 18×24 Museum-Quality Print`,
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: `gid://shopify/ProductVariant/mock-poster-${country.slug}`,
        title: '18×24"',
        price: { amount: POSTER_PRICE, currencyCode: "USD" },
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: '18×24"' }],
      },
    ],
    metafields: [
      { key: "country", value: country.name },
      { key: "design_story", value: DESIGN_STORIES[country.slug] || "" },
    ],
  };
}

// GAS Dot Collection (available for purchase)
export const GAS_MOCK_PRODUCTS: ShopifyProduct[] = GAS_PRODUCTS.map(createGasProduct);

// Country Collection (coming soon)
export const COUNTRY_MOCK_PRODUCTS: ShopifyProduct[] = [
  ...COUNTRIES.map(createMockTee),
  ...COUNTRIES.map(createMockPoster),
];

// All products combined
export const MOCK_PRODUCTS: ShopifyProduct[] = [
  ...GAS_MOCK_PRODUCTS,
  ...COUNTRY_MOCK_PRODUCTS,
];

export function getMockProductByHandle(
  handle: string
): ShopifyProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.handle === handle);
}

export function getMockProducts(): ShopifyProduct[] {
  return MOCK_PRODUCTS;
}
