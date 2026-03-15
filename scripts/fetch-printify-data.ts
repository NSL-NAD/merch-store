/**
 * One-time script to fetch Printify product data for new products.
 * Run with: npx tsx scripts/fetch-printify-data.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(import.meta.dirname || __dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const PRINTIFY_API_BASE = "https://api.printify.com/v1";
const SHOP_ID = process.env.PRINTIFY_SHOP_ID!;
const TOKEN = process.env.PRINTIFY_API_TOKEN!;

// Products we want to find (by Printify title prefix)
const TARGET_PRODUCTS = [
  "26-03-GAS-Baby Beanie",
  "26-03-GAS-Rugged Jacket",
  "26-03-GAS-Infant Everyday Tee",
  "26-03-GAS-Women's Everyday Tee",
  "26-03-GAS-Journal",
  "26-03-GAS-Coffee Mug",
  "26-03-GAS-Everyday Tee",
  "26-03-GAS-Tote",
];

async function fetchProducts() {
  const res = await fetch(`${PRINTIFY_API_BASE}/shops/${SHOP_ID}/products.json`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.data || [];
}

async function main() {
  console.log("Fetching Printify products...\n");
  const allProducts = await fetchProducts();

  console.log(`Found ${allProducts.length} total products in shop.\n`);
  console.log("All product titles:");
  for (const p of allProducts) {
    console.log(`  - "${p.title}" (ID: ${p.id})`);
  }
  console.log("");

  for (const targetTitle of TARGET_PRODUCTS) {
    const product = allProducts.find(
      (p: any) => p.title === targetTitle || p.title.includes(targetTitle)
    );

    if (!product) {
      console.log(`\n❌ NOT FOUND: "${targetTitle}"`);
      continue;
    }

    console.log(`\n${"=".repeat(80)}`);
    console.log(`Product: "${product.title}"`);
    console.log(`  Printify ID: ${product.id}`);
    console.log(`  Blueprint ID: ${product.blueprint_id}`);
    console.log(`  Print Provider: ${product.print_provider_id}`);

    // Get images
    console.log(`  Images (${product.images?.length || 0}):`);
    for (const img of product.images || []) {
      console.log(`    - ${img.src} (variant_ids: [${img.variant_ids?.join(", ")}])`);
    }

    // Get variants with costs
    const enabledVariants = (product.variants || []).filter(
      (v: any) => v.is_enabled
    );

    console.log(`  Enabled Variants (${enabledVariants.length}):`);

    // Track unique sizes and colors
    const sizes = new Set<string>();
    const colors = new Set<string>();
    let maxCost = 0;

    for (const variant of enabledVariants) {
      const cost = variant.cost / 100; // Printify costs are in cents
      const markup30 = Math.ceil(cost * 1.3);
      if (variant.cost > maxCost) maxCost = variant.cost;

      // Parse title for color/size
      const title = variant.title || "";

      console.log(
        `    ID: ${variant.id} | Title: "${title}" | Cost: $${cost.toFixed(2)} | 30% Markup: $${markup30} | SKU: ${variant.sku || "N/A"}`
      );

      // Try to extract color and size from options
      if (variant.options) {
        for (const opt of variant.options) {
          // Printify options are typically indexed by blueprint option IDs
        }
      }
    }

    // Calculate suggested retail price
    const maxCostDollars = maxCost / 100;
    const suggestedPrice = Math.ceil(maxCostDollars * 1.3);
    console.log(`\n  MAX Base Cost: $${maxCostDollars.toFixed(2)}`);
    console.log(`  Suggested Retail (30% markup on max): $${suggestedPrice}.00`);

    // Show print areas / options structure
    if (product.print_areas) {
      console.log(`  Print Areas: ${product.print_areas.length}`);
    }

    // Show option types
    if (product.options) {
      console.log(`  Options:`);
      for (const opt of product.options) {
        console.log(`    - ${opt.name}: ${opt.type} (${opt.values?.length || 0} values)`);
        if (opt.values) {
          for (const val of opt.values) {
            console.log(`      ${val.id}: "${val.title}"`);
          }
        }
      }
    }
  }
}

main().catch(console.error);
