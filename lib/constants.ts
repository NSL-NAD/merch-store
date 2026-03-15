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

export const TEE_PRICE = "47.00";
export const POSTER_PRICE = "35.00";

// GAS Dot Collection prices
export const GAS_TEE_PRICE = "52.00";
export const GAS_SWEATSHIRT_PRICE = "79.00";
export const GAS_BEANIE_PRICE = "39.00";
export const GAS_SOCKS_PRICE = "29.00";
export const GAS_BABY_BEANIE_PRICE = "22.00";
export const GAS_JACKET_PRICE = "119.00";
export const GAS_INFANT_TEE_PRICE = "19.00";
export const GAS_WOMENS_TEE_PRICE = "22.00";
export const GAS_JOURNAL_PRICE = "12.00";
export const GAS_MUG_PRICE = "32.00";
export const GAS_EVERYDAY_TEE_PRICE = "29.00";
export const GAS_TOTE_PRICE = "22.00";

export interface ProductColor {
  name: string;
  slug: string;
}

export const GAS_PRODUCTS = [
  {
    slug: "gas-tee",
    title: "THE PREMIUM Tee",
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
      "A premium faded wash tee with a printed GAS triple dot design, a reminder that there is always more good to be done. Never settle. Keep pushing forward.",
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
      { name: "Cypress", slug: "cypress" },
      { name: "Bone", slug: "bone" },
    ] as ProductColor[],
    description:
      "A heavyweight hoodie with an embroidered GAS single dot, a symbol of completion. Start what you finish. Execute with intention.",
  },
  {
    slug: "gas-beanie",
    title: "THE CAP Beanie",
    type: "beanie" as const,
    dotStyle: "triple" as const,
    price: GAS_BEANIE_PRICE,
    sizes: ["One Size"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Army", slug: "army" },
      { name: "Coal", slug: "coal" },
      { name: "Cypress", slug: "cypress" },
      { name: "Ecru", slug: "ecru" },
      { name: "Eucalyptus", slug: "eucalyptus" },
    ] as ProductColor[],
    description:
      "A cuffed knit beanie with an embroidered GAS triple dot, a reminder that there is always more good to be done. Never settle.",
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
      "Premium mid-length crew socks with a printed GAS single dot, a symbol of completion. Every step counts.",
  },
  {
    slug: "gas-baby-beanie",
    title: "THE BABY CAP Beanie",
    type: "beanie" as const,
    dotStyle: "triple" as const,
    price: GAS_BABY_BEANIE_PRICE,
    sizes: ["One Size"],
    colors: [
      { name: "Black", slug: "black" },
    ] as ProductColor[],
    description:
      "A soft knit baby beanie with an embroidered GAS triple dot, a reminder that there is always more good to be done. Start them young.",
  },
  {
    slug: "gas-jacket",
    title: "THE RUGGED Jacket",
    type: "jacket" as const,
    dotStyle: "single" as const,
    price: GAS_JACKET_PRICE,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
    colors: [
      { name: "Charcoal", slug: "charcoal" },
      { name: "Duck Brown", slug: "brown" },
    ] as ProductColor[],
    description:
      "A rugged duck cloth jacket with an embroidered GAS single dot, a symbol of completion. Built to endure. Execute with intention.",
  },
  {
    slug: "gas-infant-tee",
    title: "THE INFANT EVERYDAY Tee",
    type: "tee" as const,
    dotStyle: "triple" as const,
    price: GAS_INFANT_TEE_PRICE,
    sizes: ["6M", "12M", "18M", "24M"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Light Blue", slug: "blue" },
      { name: "Charcoal", slug: "charcoal" },
      { name: "Natural Heather", slug: "natural" },
    ] as ProductColor[],
    description:
      "A soft cotton infant tee with a printed GAS triple dot design, a reminder that there is always more good to be done. Never too young to start.",
  },
  {
    slug: "gas-womens-tee",
    title: "THE WOMENS EVERYDAY Tee",
    type: "tee" as const,
    dotStyle: "triple" as const,
    price: GAS_WOMENS_TEE_PRICE,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Army", slug: "army" },
      { name: "Asphalt", slug: "asphalt" },
      { name: "Baby Blue", slug: "blue" },
      { name: "Soft Cream", slug: "cream" },
    ] as ProductColor[],
    description:
      "A relaxed fit women's tee with a printed GAS triple dot design, a reminder that there is always more good to be done. Never settle.",
  },
  {
    slug: "gas-journal",
    title: "THE NOTES Journal",
    type: "journal" as const,
    dotStyle: "both" as const,
    price: GAS_JOURNAL_PRICE,
    sizes: ["One Size"],
    colors: [] as ProductColor[],
    description:
      "A softcover ruled journal featuring the GAS triple dot on the front and single dot on the back. Start something new, finish what you start.",
  },
  {
    slug: "gas-mug",
    title: "THE MORNING BREW Mug",
    type: "mug" as const,
    dotStyle: "triple" as const,
    price: GAS_MUG_PRICE,
    sizes: ["One Size"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Dark Gray", slug: "gray" },
      { name: "Teal", slug: "teal" },
    ] as ProductColor[],
    description:
      "A 15oz ceramic mug with a printed GAS triple dot, a reminder that there is always more good to be done. Fuel the mission.",
  },
  {
    slug: "gas-everyday-tee",
    title: "THE EVERYDAY Tee",
    type: "everyday-tee" as const,
    dotStyle: "triple" as const,
    price: GAS_EVERYDAY_TEE_PRICE,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Black Frost", slug: "black-frost" },
      { name: "Desert Tan Heather", slug: "tan" },
      { name: "Grey Frost", slug: "grey" },
      { name: "Military Green Frost", slug: "green" },
      { name: "Coyote Brown Heather", slug: "brown" },
    ] as ProductColor[],
    description:
      "An everyday essential tee with a printed GAS triple dot design, a reminder that there is always more good to be done. Your daily uniform.",
  },
  {
    slug: "gas-tote",
    title: "THE TOTE Tote",
    type: "bag" as const,
    dotStyle: "single" as const,
    price: GAS_TOTE_PRICE,
    sizes: ["One Size"],
    colors: [
      { name: "Black", slug: "black" },
      { name: "Natural", slug: "natural" },
    ] as ProductColor[],
    description:
      "A durable canvas tote bag with a printed GAS single dot, a symbol of completion. Carry what matters.",
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
    question: "What collections do you offer?",
    answer:
      "We currently have two collections. The Dot Collection is our flagship line featuring tees, sweatshirts, jackets, beanies, mugs, journals, totes, and more, each carrying the GAS dot symbol. The Country Collection (coming soon) will feature graphic tees and museum-quality art posters inspired by 12 countries from around the world.",
  },
  {
    question: "What are the tees made of?",
    answer:
      "Our tees are printed on premium blanks, a relaxed-fit unisex tee made from 100% combed cotton. The faded wash gives each shirt a unique, slightly worn-in look right out of the box. The design is DTG (direct-to-garment) printed.",
  },
  {
    question: "What about the sweatshirts?",
    answer:
      "The GO-TO Sweatshirt is a 350 GSM heavyweight cotton blend with a relaxed fit, kangaroo pocket, and brushed fleece interior. The GAS Studio design is embroidered, not printed, for a premium finish.",
  },
  {
    question: "What sizes do you offer?",
    answer:
      "Tees are available in S through 2XL (relaxed unisex fit). The Everyday Tee runs XS through 4XL. Sweatshirts run XS through 3XL. The Rugged Jacket runs XS through 6XL. Infant tees come in 6M, 12M, 18M, and 24M. Women's tees run S through 2XL. Beanies, socks, mugs, journals, and totes are one size. Check the size guide on any product page for detailed measurements.",
  },
  {
    question: "What's the deal with the dots?",
    answer:
      "The GAS orange dot is our brand emblem. The single dot represents completion. Start what you finish, execute with intention. The triple dot is a reminder that there's always more good to be done. You'll find one of these marks on every product in the Dot Collection.",
  },
  {
    question: "How do the posters ship?",
    answer:
      "Each 18×24\" poster is printed on museum-quality matte paper and ships rolled in a protective cardboard tube to prevent any damage during transit. Posters are part of the Country Collection (coming soon).",
  },
  {
    question: "What's your return policy?",
    answer:
      "Since all products are printed on demand, we can't accept returns for buyer's remorse. However, if your order arrives damaged or with a printing defect, contact us and we'll make it right with a reprint or refund.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are printed and shipped within 3-7 business days. Most US orders arrive within 5-10 business days from the date you place your order. You'll receive a tracking number via email once your order ships.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We currently ship within the United States only. International shipping is coming soon.",
  },
  {
    question: "Who is GAS Studio?",
    answer:
      "GAS Studio (Good At Scale Studio) builds purpose-driven businesses powered by systems, automation, and AI. GAS Merch Lab is one of our live ventures, a creative outlet that combines our love of design and celebrating cultures from around the world. Learn more at goodatscale.studio.",
  },
];
