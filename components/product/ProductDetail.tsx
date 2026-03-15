"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductImages from "./ProductImages";
import { ColorSelector, SizeSelector } from "./ProductSelector";
import AddToCart from "./AddToCart";
import SizeGuide from "./SizeGuide";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { ShopifyProduct, ShopifyVariant } from "@/lib/shopify/types";

interface ProductDetailProps {
  product: ShopifyProduct;
}

const PRODUCT_DETAILS: Record<string, string[]> = {
  tee: [
    "100% combed cotton",
    "Relaxed unisex fit",
    "Printed design, DTG (direct-to-garment) full-back print",
    "DTG front left-chest accent",
    "GAS Studio orange dot emblem",
    "Pre-shrunk, side-seamed",
  ],
  "everyday-tee": [
    "Tri-blend: 50% polyester, 25% combed ring-spun cotton, 25% rayon",
    "Lightweight 4.5 oz fabric, ultra-soft feel",
    "Relaxed unisex fit",
    "Printed design, DTG (direct-to-garment) full-back print",
    "DTG front left-chest accent",
    "GAS Studio orange dot emblem",
    "Tear-away label, shoulder-to-shoulder taping",
  ],
  sweatshirt: [
    "350 GSM heavyweight cotton blend",
    "Relaxed unisex fit with kangaroo pocket",
    "Embroidered GAS Studio design",
    "GAS Studio orange dot emblem",
    "Ribbed cuffs and hem",
    "Brushed fleece interior",
  ],
  beanie: [
    "100% acrylic knit",
    "One size fits most",
    "Embroidered GAS Studio orange dot emblem",
    "Cuffed design with ribbed texture",
  ],
  socks: [
    "Premium mid-length crew socks",
    "One size fits most",
    "Printed all-over knit GAS Studio orange dot",
    "Reinforced toe and heel",
    "Comfortable elastic band",
  ],
  jacket: [
    "Duck Cloth Work Jacket",
    "12 oz. 100% cotton duck cloth",
    "Quilted lining for warmth",
    "Embroidered GAS Studio design",
    "Corduroy collar, brass-finish hardware",
    "Interior and exterior pockets",
  ],
  journal: [
    '5.75" x 8" softcover ruled journal',
    "100 pages (50 sheets), ruled line",
    "GAS triple dot on front, single dot on back",
    "Matte laminated cover",
    "Lay-flat binding",
  ],
  mug: [
    "15oz ceramic mug",
    "Printed GAS Studio design, wrap-around print",
    "Microwave and dishwasher safe",
    "C-handle, glossy finish",
  ],
  bag: [
    "100% cotton canvas tote bag",
    '15" x 16" with reinforced handles',
    "Printed GAS Studio design",
    "Flat bottom for easy packing",
  ],
  poster: [
    '18×24" museum-quality matte paper',
    "Vivid, long-lasting color reproduction",
    "Ships in protective cardboard tube",
    "Ready for framing",
  ],
};

// Product types that have care instructions (wearable items)
const WEARABLE_TYPES = ["tee", "everyday-tee", "sweatshirt", "beanie", "socks", "jacket"];
// Product types that require size selection
const SIZED_TYPES = ["tee", "everyday-tee", "sweatshirt", "jacket"];

const SHIPPING_INFO = [
  "Printed and shipped within 3-7 business days",
  "US shipping only (launch market)",
  "Tracking number provided via email",
];

const CARE_INSTRUCTIONS = [
  "Machine wash cold, inside out",
  "Tumble dry low or air dry",
  "Do not iron directly on print",
  "Do not bleach",
];

function getProductType(tags: string[]): string {
  return (
    tags.find((t) =>
      ["tee", "everyday-tee", "sweatshirt", "beanie", "socks", "jacket", "journal", "mug", "bag", "poster"].includes(t)
    ) || "product"
  );
}

function Accordion({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-default">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="pb-4 space-y-1.5">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="font-body text-sm text-text-secondary flex items-start gap-2"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gas-orange flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const productType = getProductType(product.tags);
  const hasSizes = SIZED_TYPES.includes(productType);
  const isWearable = WEARABLE_TYPES.includes(productType);

  // Extract unique colors from variants
  const availableColors = useMemo(() => {
    const colorSet = new Set<string>();
    product.variants.forEach((v) => {
      const colorOpt = v.selectedOptions.find((o) => o.name === "Color");
      if (colorOpt) colorSet.add(colorOpt.value);
    });
    return Array.from(colorSet);
  }, [product.variants]);

  const hasColors = availableColors.length > 0;

  // Color selection state
  const [selectedColor, setSelectedColor] = useState<string | null>(
    hasColors ? availableColors[0] : null
  );

  // Filter variants by selected color (for size selection)
  const filteredVariants = useMemo(() => {
    if (!hasColors) return product.variants;
    if (!selectedColor) return [];
    return product.variants.filter((v) =>
      v.selectedOptions.some(
        (o) => o.name === "Color" && o.value === selectedColor
      )
    );
  }, [product.variants, hasColors, selectedColor]);

  // Variant selection state
  const needsSelection = hasSizes || hasColors;
  const [selectedVariant, setSelectedVariant] =
    useState<ShopifyVariant | null>(() => {
      if (!needsSelection) return product.variants[0] || null;
      // For color-only products (beanie), auto-select the first color's variant
      if (hasColors && !hasSizes && availableColors.length > 0) {
        return (
          product.variants.find((v) =>
            v.selectedOptions.some(
              (o) => o.name === "Color" && o.value === availableColors[0]
            )
          ) || null
        );
      }
      return null;
    });

  // Map color names to the index of their first (primary) image
  const colorImageIndex = useMemo(() => {
    const map: Record<string, number> = {};
    for (const color of availableColors) {
      const idx = product.images.findIndex(
        (img) => img.altText?.includes(color)
      );
      if (idx !== -1) map[color] = idx;
    }
    return map;
  }, [product.images, availableColors]);

  // Track which image to show when a color is selected
  const [activeImageIndex, setActiveImageIndex] = useState<number | undefined>(
    () => (hasColors && availableColors[0] ? colorImageIndex[availableColors[0]] : undefined)
  );

  // Handle color change
  const handleColorChange = useCallback(
    (color: string) => {
      setSelectedColor(color);

      // Jump to primary image for this color
      if (colorImageIndex[color] !== undefined) {
        setActiveImageIndex(colorImageIndex[color]);
      }

      if (!hasSizes) {
        // For color-only products (beanie), directly select the variant
        const variant = product.variants.find((v) =>
          v.selectedOptions.some(
            (o) => o.name === "Color" && o.value === color
          )
        );
        setSelectedVariant(variant || null);
      } else {
        // For color+size products, reset size selection
        setSelectedVariant(null);
      }
    },
    [colorImageIndex, hasSizes, product.variants]
  );

  const displayName = product.title
    .replace(/ (Tee|Poster|Sweatshirt|Beanie|Socks|Jacket|Journal|Mug|Tote)$/i, "")
    .trim();

  const designStory =
    product.metafields?.find((m) => m.key === "design_story")?.value ||
    product.description;

  const displayPrice = selectedVariant
    ? selectedVariant.price
    : product.priceRange.minVariantPrice;

  const details = PRODUCT_DETAILS[productType] || PRODUCT_DETAILS.poster;

  // Determine collection label from tags
  const isGasCollection = product.tags.includes("gas-collection");
  const collectionLabel = isGasCollection ? "DOT COLLECTION" : productType.toUpperCase();

  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 lg:gap-16">
        {/* Left: Images */}
        <div className="min-w-0">
          <ProductImages
            images={product.images}
            productTitle={product.title}
            activeIndex={activeImageIndex}
          />
        </div>

        {/* Right: Info */}
        <div className="min-w-0 md:sticky md:top-24 md:self-start space-y-6">
          {/* Collection badge */}
          <Badge variant="orange">
            {collectionLabel}
          </Badge>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight">
            {displayName}
          </h1>

          {/* Story */}
          <p className="font-body text-text-secondary leading-relaxed">
            {designStory}
          </p>

          {/* Color selector */}
          {hasColors && (
            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          )}

          {/* Size selector */}
          {hasSizes && (
            <div className="space-y-3">
              <SizeSelector
                variants={filteredVariants}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
              <SizeGuide />
            </div>
          )}

          {/* Price */}
          <p className="font-mono text-2xl font-semibold">
            {formatPrice(displayPrice.amount, displayPrice.currencyCode)}
          </p>

          {/* Add to cart */}
          <AddToCart
            product={product}
            selectedVariant={selectedVariant}
            needsSelection={needsSelection}
            hasSizes={hasSizes}
            selectedColor={selectedColor}
            activeImage={
              activeImageIndex !== undefined
                ? product.images[activeImageIndex]
                : undefined
            }
          />

          {/* Accordions */}
          <div className="pt-4">
            <Accordion title="Product Details" items={details} />
            <Accordion title="Shipping Info" items={SHIPPING_INFO} />
            {isWearable && (
              <Accordion
                title="Care Instructions"
                items={CARE_INSTRUCTIONS}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
