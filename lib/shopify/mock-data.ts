import { ShopifyProduct } from "./types";
import { COUNTRIES, TEE_PRICE, POSTER_PRICE, TEE_SIZES, GAS_PRODUCTS } from "../constants";

const DESIGN_STORIES: Record<string, string> = {
  mexico:
    "Vibrant Day of the Dead imagery meets ancient Aztec geometry, a celebration of Mexico's rich cultural tapestry, from its bustling mercados to its sacred temples.",
  japan:
    "Cherry blossoms meet neon-lit streets, capturing the harmony between Japan's ancient traditions and its cutting-edge modernity, from Kyoto's temples to Tokyo's electric energy.",
  "new-zealand":
    "Maori-inspired patterns intertwine with dramatic landscapes, from the volcanic peaks of Tongariro to the glowing caves of Waitomo, New Zealand's wild beauty comes alive.",
  "costa-rica":
    "Tropical rainforest canopies, toucans, and volcanic coastlines, a love letter to Costa Rica's pura vida philosophy and its breathtaking biodiversity.",
  italy:
    "Renaissance artistry meets la dolce vita, from the rolling hills of Tuscany to the ancient streets of Rome, Italy's timeless beauty is distilled into a single design.",
  spain:
    "Flamenco passion meets Gaudi's mosaics, a fiery tribute to Spain's artistic spirit, from the plazas of Seville to the shores of Barcelona.",
  egypt:
    "Pyramids rise from golden sands as hieroglyphics tell ancient stories. Egypt's 5,000-year legacy of wonder captured in bold, modern illustration.",
  france:
    "Parisian elegance meets provincial charm, lavender fields, iron lattice, and the unmistakable silhouette of a city that defined art, fashion, and cuisine.",
  greece:
    "Whitewashed walls and cobalt domes against the Aegean blue. Greece's mythic beauty, from the Parthenon to the sunlit islands of the Cyclades.",
  colombia:
    "Emerald mountains, cumbia rhythms, and streets bursting with color. Colombia's vibrant energy and warmth radiate from every element of this design.",
  croatia:
    "Adriatic coastlines meet medieval stone walls. Croatia's stunning blend of Mediterranean beauty and old-world charm, from Dubrovnik to Plitvice's waterfalls.",
  morocco:
    "Geometric zellige tiles, bustling souks, and the warm glow of desert sunsets. Morocco's sensory richness translated into a bold, intricate illustration.",
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
    <text x="400" y="500" font-family="monospace" font-size="10" fill="%23292929" text-anchor="middle" letter-spacing="3">${encodeURIComponent(region.toUpperCase())} - TEE</text>
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
    <text x="400" y="550" font-family="monospace" font-size="10" fill="%23292929" text-anchor="middle" letter-spacing="3">${encodeURIComponent(region.toUpperCase())} - POSTER</text>
    <circle cx="400" cy="580" r="4" fill="%23FF462E" opacity="0.6"/>
  </svg>`;
  return `data:image/svg+xml,${svg}`;
}

// GAS Dot Collection - product images
// Image order: Primary → Alternate → Lifestyle (context at end)
import type { ShopifyImage } from "./types";

const GAS_PRODUCT_IMAGES: Record<string, ShopifyImage[]> = {
  "gas-tee": [
    // Faded Black
    { url: "/products/tee-black-brick.jpg", altText: "GAS Tee - Faded Black on brick", width: 1440, height: 1800 },
    { url: "/products/tee-black-concrete.jpg", altText: "GAS Tee - Faded Black on concrete", width: 1201, height: 1800 },
    // Faded Dust
    { url: "/products/tee-grey-brick.jpg", altText: "GAS Tee - Faded Dust on brick", width: 1440, height: 1800 },
    { url: "/products/tee-grey-concrete.jpg", altText: "GAS Tee - Faded Dust on concrete", width: 1201, height: 1800 },
    // Faded Army
    { url: "/products/tee-green-brick.jpg", altText: "GAS Tee - Faded Army on brick", width: 1440, height: 1800 },
    { url: "/products/tee-green-concrete.jpg", altText: "GAS Tee - Faded Army on concrete", width: 1201, height: 1800 },
  ],
  "gas-sweatshirt": [
    // Black
    { url: "/products/hoodie-black.jpg", altText: "GAS Hoodie - Black", width: 1264, height: 848 },
    { url: "/products/hoodie-black-002.jpg", altText: "GAS Hoodie - Black alternate", width: 1024, height: 1024 },
    { url: "/products/hoodie-black-lifestyle.jpg", altText: "GAS Hoodie - Black lifestyle", width: 1200, height: 1800 },
    // Cypress
    { url: "/products/hoodie-green.jpg", altText: "GAS Hoodie - Cypress", width: 1024, height: 1024 },
    { url: "/products/hoodie-green-002.jpg", altText: "GAS Hoodie - Cypress alternate", width: 1024, height: 1024 },
    { url: "/products/hoodie-green-lifestyle.jpg", altText: "GAS Hoodie - Cypress lifestyle", width: 1200, height: 1800 },
    // Bone
    { url: "/products/hoodie-tan.jpg", altText: "GAS Hoodie - Bone", width: 1264, height: 848 },
    { url: "/products/hoodie-tan-002.jpg", altText: "GAS Hoodie - Bone alternate", width: 1024, height: 1024 },
    { url: "/products/hoodie-tan-lifestyle.jpg", altText: "GAS Hoodie - Bone lifestyle", width: 1800, height: 1800 },
  ],
  "gas-beanie": [
    { url: "/products/beanie-black.jpg", altText: "GAS Beanie - Black", width: 1264, height: 848 },
    { url: "/products/beanie-army.jpg", altText: "GAS Beanie - Army", width: 1024, height: 1024 },
    { url: "/products/beanie-coal.jpg", altText: "GAS Beanie - Coal", width: 1024, height: 1024 },
    { url: "/products/beanie-cypress.jpg", altText: "GAS Beanie - Cypress", width: 1024, height: 1024 },
    { url: "/products/beanie-ecru.jpg", altText: "GAS Beanie - Ecru", width: 1024, height: 1024 },
    { url: "/products/beanie-eucalyptus.jpg", altText: "GAS Beanie - Eucalyptus", width: 1024, height: 1024 },
  ],
  "gas-socks": [
    { url: "/products/socks.jpg", altText: "GAS Socks", width: 1024, height: 1024 },
    { url: "/products/socks-pants.jpg", altText: "GAS Socks lifestyle", width: 1024, height: 1024 },
  ],
  "gas-baby-beanie": [
    { url: "/products/baby-beanie.jpg", altText: "GAS Baby Beanie - Black", width: 1024, height: 1024 },
  ],
  "gas-jacket": [
    // Charcoal (darkest first)
    { url: "/products/jacket-charcoal.jpg", altText: "GAS Jacket - Charcoal", width: 1024, height: 1024 },
    // Duck Brown
    { url: "/products/jacket-brown.jpg", altText: "GAS Jacket - Duck Brown", width: 1024, height: 1024 },
  ],
  "gas-infant-tee": [
    { url: "/products/infant-tee-black.jpg", altText: "GAS Infant Tee - Black", width: 1024, height: 1024 },
    { url: "/products/infant-tee-blue.jpg", altText: "GAS Infant Tee - Light Blue", width: 1024, height: 1024 },
    { url: "/products/infant-tee-charcoal.jpg", altText: "GAS Infant Tee - Charcoal", width: 1024, height: 1024 },
    { url: "/products/infant-tee-natural.jpg", altText: "GAS Infant Tee - Natural Heather", width: 1024, height: 1024 },
  ],
  "gas-womens-tee": [
    { url: "/products/womens-tee-black.jpg", altText: "GAS Womens Tee - Black", width: 1024, height: 1024 },
    { url: "/products/womens-tee-army.jpg", altText: "GAS Womens Tee - Army", width: 1024, height: 1024 },
    { url: "/products/womens-tee-asphalt.jpg", altText: "GAS Womens Tee - Asphalt", width: 1024, height: 1024 },
    { url: "/products/womens-tee-blue.jpg", altText: "GAS Womens Tee - Baby Blue", width: 1024, height: 1024 },
    { url: "/products/womens-tee-cream.jpg", altText: "GAS Womens Tee - Soft Cream", width: 1024, height: 1024 },
  ],
  "gas-journal": [
    { url: "/products/journal-front.jpg", altText: "GAS Journal front", width: 1024, height: 1024 },
    { url: "/products/journal-back.jpg", altText: "GAS Journal back", width: 1024, height: 1024 },
    { url: "/products/journal-context.jpg", altText: "GAS Journal lifestyle", width: 1200, height: 1200 },
    { url: "/products/journal-mockup-white.jpg", altText: "GAS Journal mockup", width: 1200, height: 1200 },
  ],
  "gas-mug": [
    { url: "/products/mug-black.jpg", altText: "GAS Mug - Black", width: 1024, height: 1024 },
    { url: "/products/mug-grey.jpg", altText: "GAS Mug - Dark Gray", width: 1024, height: 1024 },
    { url: "/products/mug-teal.jpg", altText: "GAS Mug - Teal", width: 1024, height: 1024 },
  ],
  "gas-everyday-tee": [
    { url: "/products/everyday-tee-black.jpg", altText: "GAS Everyday Tee - Black", width: 1264, height: 848 },
    { url: "/products/everyday-tee-black-frost.jpg", altText: "GAS Everyday Tee - Black Frost", width: 1024, height: 1024 },
    { url: "/products/everyday-tee-tan.jpg", altText: "GAS Everyday Tee - Desert Tan Heather", width: 1024, height: 1024 },
    { url: "/products/everyday-tee-grey.jpg", altText: "GAS Everyday Tee - Grey Frost", width: 1024, height: 1024 },
    { url: "/products/everyday-tee-green.jpg", altText: "GAS Everyday Tee - Military Green Frost", width: 1024, height: 1024 },
    { url: "/products/everyday-tee-brown.jpg", altText: "GAS Everyday Tee - Coyote Brown Heather", width: 1024, height: 1024 },
  ],
  "gas-tote": [
    // Black first
    { url: "/products/tote-black.jpg", altText: "GAS Tote - Black", width: 1024, height: 1024 },
    { url: "/products/tote-natural.jpg", altText: "GAS Tote - Natural", width: 1024, height: 1024 },
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
        altText: `${country.name} Tee - Front View`,
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
        altText: `${country.name} Poster - 18x24 Museum-Quality Print`,
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
