/**
 * Downloads Printify mockup images, removes white backgrounds,
 * and composites them onto brick and concrete background images.
 * Also downloads lifestyle images from Printify as-is.
 *
 * Run with: npx tsx scripts/generate-mockups.ts
 * Diagnostic: npx tsx scripts/generate-mockups.ts --list-images
 */

import sharp from "sharp";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Load .env.local
const envPath = resolve(import.meta.dirname || __dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const PRINTIFY_API_BASE = "https://api.printify.com/v1";
const SHOP_ID = process.env.PRINTIFY_SHOP_ID!;
const TOKEN = process.env.PRINTIFY_API_TOKEN!;
const OUTPUT_DIR = resolve(import.meta.dirname || __dirname, "../public/products");
const BRICK_BG = resolve(OUTPUT_DIR, "LAB-Background-Brick.jpg");
const CONCRETE_BG = resolve(OUTPUT_DIR, "LAB-Background-Concrete.jpg");

// Target output size
const OUTPUT_SIZE = 1200;

// ── White Background Removal Options ──

interface RemoveWhiteBgOptions {
  threshold?: number; // RGB above this → fully transparent (default: 220)
  softThreshold?: number; // RGB above this → semi-transparent edge (default: 170)
  erode?: boolean; // 1px alpha erosion to remove fringe (default: true)
  colorSpill?: boolean; // darken semi-transparent edges to remove white bleed (default: true)
}

const DEFAULT_BG_OPTIONS: Required<RemoveWhiteBgOptions> = {
  threshold: 220,
  softThreshold: 170,
  erode: true,
  colorSpill: true,
};

// ── Product Configuration ──

interface ProductConfig {
  printifyId: string;
  typeSlug: string;
  colorMap: Record<number, string>; // variant_id → color slug for filenames
  cameraLabels?: string[]; // preferred camera labels (default: ["front", "cover"])
  whiteBgOptions?: RemoveWhiteBgOptions; // product-level override
  variantWhiteBgOptions?: Record<string, RemoveWhiteBgOptions>; // per-color override
  lifestyleLabels?: string[]; // specific lifestyle labels to download (default: download all non-mockup)
  skipLifestyle?: boolean; // skip lifestyle images entirely
}

const PRODUCTS: ProductConfig[] = [
  {
    printifyId: "69a39d2da5dcb1b9a904a3b3", // Baby Beanie
    typeSlug: "baby-beanie",
    colorMap: { 71671: "white" },
    lifestyleLabels: ["context"],
  },
  {
    printifyId: "69a62c58d1ff0c1d4f028ae8", // Rugged Jacket
    typeSlug: "jacket",
    colorMap: {
      121887: "brown", // Duck Brown - L used as representative
      121886: "charcoal", // Charcoal - L
    },
    lifestyleLabels: ["folded"],
  },
  {
    printifyId: "69a62cf9159295bd3b0ab6a3", // Infant Tee
    typeSlug: "infant-tee",
    colorMap: {
      21560: "black", // Black / 12M
      21620: "blue", // Light Blue / 12M
      21572: "charcoal", // Charcoal / 12M
      105880: "natural", // Natural Heather / 12M
    },
    lifestyleLabels: ["front-collar-closeup"],
  },
  {
    printifyId: "69a6f5b38ba84ca389028896", // Women's Tee
    typeSlug: "womens-tee",
    colorMap: {
      17745: "black", // Black / L
      17715: "army", // Army / L
      17721: "asphalt", // Asphalt / L
      17733: "blue", // Baby Blue / L
      17931: "cream", // Soft Cream / L
    },
    skipLifestyle: true, // no lifestyle images available
  },
  {
    printifyId: "69a703fbf1dc3031ea072fcd", // Journal
    typeSlug: "journal",
    colorMap: { 104026: "default" },
    lifestyleLabels: ["context", "context-2"],
  },
  {
    printifyId: "69a79907e2353ca9ec0a8a6c", // Coffee Mug
    typeSlug: "mug",
    colorMap: {
      109067: "black", // Black / 15oz
      109064: "gray", // Dark Gray / 15oz
      109078: "teal", // Teal / 15oz
    },
    // Prefer right view to show the printed dots (left shows handle side)
    cameraLabels: ["right"],
    lifestyleLabels: ["person"],
    // Teal mug is light colored — reduce aggressiveness
    variantWhiteBgOptions: {
      teal: { threshold: 245, softThreshold: 230, erode: false, colorSpill: false },
    },
  },
  {
    printifyId: "69a70152a9dfed15aa0767b8", // Everyday Tee
    typeSlug: "everyday-tee",
    colorMap: {
      124652: "black", // Black / L
      124660: "black-frost", // Black Frost / L
      124700: "tan", // Desert Tan Heather / L
      124748: "grey", // Grey Frost / L
      124812: "green", // Military Green Frost / L
      124924: "brown", // Coyote Brown Heather / L
    },
    skipLifestyle: true, // no lifestyle images available
  },
  {
    printifyId: "69a89dc49f5481e57c02a0e5", // Tote
    typeSlug: "tote",
    colorMap: {
      101409: "natural", // Natural
      103598: "black", // Black
    },
    // Natural tote is light/cream — only remove pure white
    variantWhiteBgOptions: {
      natural: { threshold: 248, softThreshold: 240, erode: false, colorSpill: false },
    },
    lifestyleLabels: ["person-front", "context-front"],
  },
];

// ── API Helpers ──

async function fetchProduct(productId: string): Promise<any> {
  const res = await fetch(
    `${PRINTIFY_API_BASE}/shops/${SHOP_ID}/products/${productId}.json`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch product ${productId}: ${res.status}`);
  return res.json();
}

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── Enhanced White Background Removal ──

async function removeWhiteBg(
  imageBuffer: Buffer,
  options?: RemoveWhiteBgOptions
): Promise<Buffer> {
  const opts = { ...DEFAULT_BG_OPTIONS, ...options };

  const metadata = await sharp(imageBuffer).metadata();
  const { width, height } = metadata;
  if (!width || !height) throw new Error("Could not get image dimensions");

  // Extract raw pixel data
  const { data, info } = await sharp(imageBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  const channels = info.channels;
  const w = info.width;
  const h = info.height;

  // Pass 1: Replace near-white pixels with transparency
  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (r > opts.threshold && g > opts.threshold && b > opts.threshold) {
      pixels[i + 3] = 0;
    } else if (r > opts.softThreshold && g > opts.softThreshold && b > opts.softThreshold) {
      const brightness = (r + g + b) / 3;
      const alpha = Math.round(
        255 * (1 - (brightness - opts.softThreshold) / (255 - opts.softThreshold))
      );
      pixels[i + 3] = Math.min(pixels[i + 3], alpha);
    }
  }

  // Pass 2: Color spill removal — darken semi-transparent edge pixels
  if (opts.colorSpill) {
    for (let i = 0; i < pixels.length; i += channels) {
      const a = pixels[i + 3];
      if (a > 0 && a < 255) {
        const aFrac = a / 255;
        // Remove white contribution from the color channels
        for (let c = 0; c < 3; c++) {
          const original = pixels[i + c];
          const corrected = Math.max(0, Math.round((original - 255 * (1 - aFrac)) / aFrac));
          pixels[i + c] = corrected;
        }
      }
    }
  }

  // Pass 3: 1px alpha erosion — set each pixel's alpha to min of 3×3 neighborhood
  if (opts.erode) {
    const alphaCopy = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        alphaCopy[y * w + x] = pixels[(y * w + x) * channels + 3];
      }
    }

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let minAlpha = 255;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const na = alphaCopy[(y + dy) * w + (x + dx)];
            if (na < minAlpha) minAlpha = na;
          }
        }
        pixels[(y * w + x) * channels + 3] = minAlpha;
      }
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: w, height: h, channels: channels as 4 },
  })
    .png()
    .toBuffer();
}

// ── Compositing ──

async function compositeOnBackground(
  productPng: Buffer,
  bgPath: string,
  outputPath: string
): Promise<void> {
  const bg = sharp(bgPath).resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: "cover" });

  const productResized = await sharp(productPng)
    .resize(Math.round(OUTPUT_SIZE * 0.75), Math.round(OUTPUT_SIZE * 0.75), {
      fit: "inside",
      withoutEnlargement: false,
    })
    .toBuffer();

  const productMeta = await sharp(productResized).metadata();
  const pWidth = productMeta.width || 0;
  const pHeight = productMeta.height || 0;

  const left = Math.round((OUTPUT_SIZE - pWidth) / 2);
  const top = Math.round((OUTPUT_SIZE - pHeight) / 2);

  await bg
    .composite([{ input: productResized, left, top }])
    .jpeg({ quality: 85 })
    .toFile(outputPath);
}

// ── Lifestyle Image Processing ──

async function processLifestyleImage(
  imageUrl: string,
  outputPath: string
): Promise<void> {
  const imageBuffer = await downloadImage(imageUrl);
  await sharp(imageBuffer)
    .resize(OUTPUT_SIZE, OUTPUT_SIZE, { fit: "cover" })
    .jpeg({ quality: 85 })
    .toFile(outputPath);
}

// ── Helpers ──

function getCameraLabel(src: string): string {
  const match = src.match(/camera_label=([^&]+)/);
  return match?.[1] || "unknown";
}

function isMockupImage(src: string): boolean {
  const label = getCameraLabel(src);
  return ["front", "cover", "back", "side", "right", "left"].includes(label);
}

// ── Processing ──

async function processProduct(config: ProductConfig): Promise<string[]> {
  console.log(`\nProcessing: ${config.typeSlug}`);
  const lifestyleFiles: string[] = [];

  const product = await fetchProduct(config.printifyId);
  const images: any[] = product.images || [];

  // Determine which camera labels to prefer for mockup images
  const preferredLabels = config.cameraLabels || ["front", "cover"];

  // Process front/side mockup images for each variant color
  for (const [variantIdStr, colorSlug] of Object.entries(config.colorMap)) {
    const variantId = parseInt(variantIdStr);

    // Determine white bg options for this variant
    const bgOptions = config.variantWhiteBgOptions?.[colorSlug] || config.whiteBgOptions;

    // Find preferred mockup image for this variant
    let mockupImage = images.find(
      (img: any) =>
        img.variant_ids?.includes(variantId) &&
        preferredLabels.some((label) => img.src?.includes(`camera_label=${label}`))
    );

    if (!mockupImage) {
      console.log(`  ⚠ No preferred image (${preferredLabels.join("/")}) for ${colorSlug} (variant ${variantId})`);
      // Fall back to any image with camera_label=front or cover
      mockupImage = images.find(
        (img: any) =>
          img.variant_ids?.includes(variantId) &&
          (img.src?.includes("camera_label=front") || img.src?.includes("camera_label=cover"))
      );
    }

    if (!mockupImage) {
      // Try any image for this variant
      mockupImage = images.find((img: any) => img.variant_ids?.includes(variantId));
      if (!mockupImage) {
        console.log(`  ❌ No image at all for ${colorSlug}`);
        continue;
      }
      console.log(`  Using alternate image: [${getCameraLabel(mockupImage.src)}]`);
    }

    console.log(`  Processing ${colorSlug} [${getCameraLabel(mockupImage.src)}]...`);
    await processImage(mockupImage.src, config.typeSlug, colorSlug, bgOptions);
  }

  // Download lifestyle images
  if (!config.skipLifestyle) {
    // Build a reverse map: variant_id → color slug
    const variantToColor: Record<number, string> = {};
    for (const [vid, color] of Object.entries(config.colorMap)) {
      variantToColor[parseInt(vid)] = color;
    }
    const allVariantIds = Object.keys(config.colorMap).map(Number);

    // Find lifestyle images matching our preferred labels
    const lifestyleImages = images.filter((img: any) => {
      const label = getCameraLabel(img.src);
      // Skip size-chart images always
      if (label === "size-chart") return false;

      // If specific labels requested, only match those
      if (config.lifestyleLabels) {
        if (!config.lifestyleLabels.includes(label)) return false;
      } else {
        // Default: skip standard mockup angles
        if (["front", "cover", "back", "side", "right", "left"].includes(label)) return false;
      }

      // Must be associated with at least one of our variants
      if (img.variant_ids?.length > 0) {
        return img.variant_ids.some((vid: number) => allVariantIds.includes(vid));
      }
      return true;
    });

    if (lifestyleImages.length > 0) {
      console.log(`  Found ${lifestyleImages.length} lifestyle image(s)`);
      const usedFilenames = new Set<string>();

      for (const img of lifestyleImages) {
        const label = getCameraLabel(img.src);

        // Determine the color this lifestyle image belongs to
        let colorSlug: string | null = null;
        if (img.variant_ids?.length > 0) {
          for (const vid of img.variant_ids) {
            if (variantToColor[vid]) {
              colorSlug = variantToColor[vid];
              break;
            }
          }
        }

        // Build filename: include color if variant-specific, include label if multiple labels
        let filename: string;
        if (colorSlug && Object.keys(config.colorMap).length > 1) {
          filename = `${config.typeSlug}-${colorSlug}-${label}.jpg`;
        } else {
          filename = `${config.typeSlug}-${label}.jpg`;
        }

        // Avoid duplicates
        if (usedFilenames.has(filename)) continue;
        usedFilenames.add(filename);

        const outputPath = resolve(OUTPUT_DIR, filename);
        console.log(`    Downloading lifestyle → ${filename} [${label}]`);
        try {
          await processLifestyleImage(img.src, outputPath);
          lifestyleFiles.push(filename);
          console.log(`    ✓ ${filename}`);
        } catch (err) {
          console.error(`    ❌ Error downloading lifestyle: ${err}`);
        }
      }
    } else {
      console.log(`  No lifestyle images found`);
    }
  }

  return lifestyleFiles;
}

async function processImage(
  imageUrl: string,
  typeSlug: string,
  colorSlug: string,
  bgOptions?: RemoveWhiteBgOptions
): Promise<void> {
  try {
    console.log(`    Downloading mockup...`);
    const imageBuffer = await downloadImage(imageUrl);

    console.log(`    Removing white background...`);
    const transparentPng = await removeWhiteBg(imageBuffer, bgOptions);

    const brickOutput = resolve(OUTPUT_DIR, `${typeSlug}-${colorSlug}-brick.jpg`);
    console.log(`    Compositing on brick → ${typeSlug}-${colorSlug}-brick.jpg`);
    await compositeOnBackground(transparentPng, BRICK_BG, brickOutput);

    const concreteOutput = resolve(OUTPUT_DIR, `${typeSlug}-${colorSlug}-concrete.jpg`);
    console.log(`    Compositing on concrete → ${typeSlug}-${colorSlug}-concrete.jpg`);
    await compositeOnBackground(transparentPng, CONCRETE_BG, concreteOutput);

    console.log(`    ✓ Done: ${typeSlug}-${colorSlug}`);
  } catch (err) {
    console.error(`    ❌ Error processing ${typeSlug}-${colorSlug}:`, err);
  }
}

// ── Diagnostic Mode ──

async function listImages() {
  console.log("=== Printify Image Diagnostic ===\n");
  for (const config of PRODUCTS) {
    const product = await fetchProduct(config.printifyId);
    const images: any[] = product.images || [];

    console.log(`\n${config.typeSlug} (${config.printifyId}):`);
    console.log(`  Blueprint: ${product.blueprint_id}, Provider: ${product.print_provider_id}`);

    for (const img of images) {
      const label = getCameraLabel(img.src);
      const variantStr = img.variant_ids?.join(",") || "all";
      const isMockup = isMockupImage(img.src);
      console.log(
        `  [${label}] ${isMockup ? "MOCKUP" : "LIFESTYLE"} variants:[${variantStr}] → ${img.src.substring(0, 100)}...`
      );
    }
  }
}

// ── Main ──

async function main() {
  // Diagnostic mode
  if (process.argv.includes("--list-images")) {
    await listImages();
    return;
  }

  console.log("=== GAS Merch Lab Mockup Generator ===\n");

  if (!existsSync(BRICK_BG)) {
    throw new Error(`Brick background not found: ${BRICK_BG}`);
  }
  if (!existsSync(CONCRETE_BG)) {
    throw new Error(`Concrete background not found: ${CONCRETE_BG}`);
  }
  console.log("✓ Background images found");

  const allLifestyleFiles: Record<string, string[]> = {};

  for (const product of PRODUCTS) {
    const lifestyleFiles = await processProduct(product);
    if (lifestyleFiles.length > 0) {
      allLifestyleFiles[product.typeSlug] = lifestyleFiles;
    }
  }

  console.log("\n=== Summary ===");
  console.log("\nLifestyle images generated:");
  for (const [typeSlug, files] of Object.entries(allLifestyleFiles)) {
    console.log(`  ${typeSlug}: ${files.join(", ")}`);
  }
  if (Object.keys(allLifestyleFiles).length === 0) {
    console.log("  (none)");
  }

  console.log("\n=== All done! ===");
}

main().catch(console.error);
