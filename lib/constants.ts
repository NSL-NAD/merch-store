export const SITE_NAME = "GAS Merch Lab";
export const SITE_DESCRIPTION =
  "Premium graphic tees and art posters celebrating cultures from some of the world's most inspiring places. Powered by GAS Studio.";
export const SITE_URL = "https://merch.goodatscale.studio";
export const GAS_STUDIO_URL = "https://goodatscale.studio";

export const COUNTRIES = [
  { name: "Mexico", region: "Latin America", slug: "mexico" },
  { name: "Japan", region: "Asia-Pacific", slug: "japan" },
  { name: "New Zealand", region: "Asia-Pacific", slug: "new-zealand" },
  { name: "Costa Rica", region: "Latin America", slug: "costa-rica" },
  { name: "Italy", region: "Europe", slug: "italy" },
  { name: "Spain", region: "Europe", slug: "spain" },
  { name: "Egypt", region: "Africa / Middle East", slug: "egypt" },
  { name: "France", region: "Europe", slug: "france" },
  { name: "Greece", region: "Europe", slug: "greece" },
  { name: "Colombia", region: "Latin America", slug: "colombia" },
  { name: "Croatia", region: "Europe", slug: "croatia" },
  { name: "Morocco", region: "Africa", slug: "morocco" },
] as const;

export const TEE_SIZES = ["S", "M", "L", "XL", "2XL"] as const;

export const TEE_PRICE = "45.00";
export const POSTER_PRICE = "35.00";

// GAS Dot Collection — launch products
export const GAS_TEE_PRICE = "45.00";
export const GAS_SWEATSHIRT_PRICE = "75.00";
export const GAS_BEANIE_PRICE = "30.00";
export const GAS_SOCKS_PRICE = "25.00";

export interface ProductColor {
  name: string;
  slug: string;
}

export const GAS_PRODUCTS = [
  {
    slug: "gas-tee",
    title: "THE EVERYDAY Tee",
    type: "tee" as const,
    dotStyle: "triple" as const,
    price: GAS_TEE_PRICE,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Faded Black", slug: "faded-black" },
      { name: "Faded Dust", slug: "faded-dust" },
      { name: "Faded Army", slug: "faded-army" },
    ] as ProductColor[],
    description:
      "A premium faded wash tee with a printed GAS triple dot design — a reminder that there is always more good to be done. Never settle. Keep pushing forward.",
  },
  {
    slug: "gas-sweatshirt",
    title: "THE GO-TO Sweatshirt",
    type: "sweatshirt" as const,
    dotStyle: "single" as const,
    price: GAS_SWEATSHIRT_PRICE,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Bone", slug: "bone" },
      { name: "Cypress", slug: "cypress" },
    ] as ProductColor[],
    description:
      "A heavyweight hoodie with an embroidered GAS single dot — a symbol of completion. Start what you finish. Execute with intention.",
  },
  {
    slug: "gas-beanie",
    title: "THE CAP Beanie",
    type: "beanie" as const,
    dotStyle: "triple" as const,
    price: GAS_BEANIE_PRICE,
    sizes: ["One Size"],
    colors: [
      { name: "Army", slug: "army" },
      { name: "Black", slug: "black" },
      { name: "Coal", slug: "coal" },
      { name: "Cypress", slug: "cypress" },
      { name: "Ecru", slug: "ecru" },
      { name: "Eucalyptus", slug: "eucalyptus" },
    ] as ProductColor[],
    description:
      "A cuffed knit beanie with an embroidered GAS triple dot — a reminder that there is always more good to be done. Never settle.",
  },
  {
    slug: "gas-socks",
    title: "THE STEPS Socks",
    type: "socks" as const,
    dotStyle: "single" as const,
    price: GAS_SOCKS_PRICE,
    sizes: ["One Size"],
    colors: [] as ProductColor[],
    description:
      "Premium mid-length crew socks with a printed GAS single dot — a symbol of completion. Every step counts.",
  },
] as const;

export const MARQUEE_TEXT =
  "COMING SOON: COUNTRY TEES + POSTERS • 12 COUNTRIES • 12 DESIGNS • 1 PHILOSOPHY • LIMITED EDITION RELEASE • ";

export const SIZE_CHART = [
  { size: "S", chest: '34-36"', length: '27"' },
  { size: "M", chest: '38-40"', length: '28"' },
  { size: "L", chest: '42-44"', length: '29"' },
  { size: "XL", chest: '46-48"', length: '30"' },
  { size: "2XL", chest: '50-52"', length: '31"' },
];

export const FAQ_ITEMS = [
  {
    question: "What are the shirts made of?",
    answer:
      "Our tees are printed on AS Colour Staple Faded Tee blanks — a premium, relaxed-fit unisex tee made from 100% combed cotton. The faded wash gives each shirt a unique, slightly worn-in look right out of the box.",
  },
  {
    question: "How do the posters ship?",
    answer:
      "Each 18×24\" poster is printed on museum-quality matte paper and ships rolled in a protective cardboard tube to prevent any damage during transit.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Since all products are printed on demand, we can't accept returns for buyer's remorse. However, if your order arrives damaged or with a printing defect, contact us and we'll make it right with a reprint or refund.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are printed and shipped within 3–7 business days. Most US orders arrive within 5–10 business days from the date you place your order. You'll receive a tracking number via email once your order ships.",
  },
  {
    question: "What sizes do you offer?",
    answer:
      "T-shirts are available in S, M, L, XL, and 2XL. They're a relaxed unisex fit — check our size guide on any product page for detailed measurements.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We currently ship within the United States only. International shipping is coming soon.",
  },
  {
    question: "Who is GAS Studio?",
    answer:
      "GAS Studio (Good At Scale Studio) builds purpose-driven businesses powered by systems, automation, and AI. GAS Merch Lab is one of our live ventures — a creative outlet that combines our love of design, travel, and celebrating cultures from around the world. Learn more at goodatscale.studio.",
  },
  {
    question: "Can I buy both the tee and poster for one country?",
    answer:
      "You can add both the tee and poster for any country to your cart and check out in a single order.",
  },
];
