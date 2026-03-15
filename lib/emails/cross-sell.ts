import { GAS_PRODUCTS } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";

// Map each product slug to its primary (black/darkest) product image filename
const PRIMARY_IMAGES: Record<string, string> = {
  "gas-tee": "tee-black-brick.jpg",
  "gas-sweatshirt": "hoodie-black.jpg",
  "gas-beanie": "beanie-black.jpg",
  "gas-socks": "socks.jpg",
  "gas-baby-beanie": "baby-beanie.jpg",
  "gas-jacket": "jacket-charcoal.jpg",
  "gas-infant-tee": "infant-tee-black.jpg",
  "gas-womens-tee": "womens-tee-black.jpg",
  "gas-journal": "journal-front.jpg",
  "gas-mug": "mug-black.jpg",
  "gas-everyday-tee": "everyday-tee-black.jpg",
  "gas-tote": "tote-black.jpg",
};

// Map product type to display label (matches site badge)
function getTypeLabel(type: string): string {
  switch (type) {
    case "tee":
      return "TEE";
    case "everyday-tee":
      return "TEE";
    case "sweatshirt":
      return "SWEATSHIRT";
    case "beanie":
      return "BEANIE";
    case "socks":
      return "SOCKS";
    case "jacket":
      return "JACKET";
    case "journal":
      return "JOURNAL";
    case "mug":
      return "MUG";
    case "bag":
      return "BAG";
    default:
      return "APPAREL";
  }
}

// Split product title into name part and type part (e.g. "THE PREMIUM" / "Tee")
function splitTitle(title: string): { name: string; typeSuffix: string } {
  // Titles are like "THE PREMIUM Tee", "THE GO-TO Sweatshirt", "THE MORNING BREW Mug"
  const words = title.split(" ");
  const typeSuffix = words[words.length - 1]; // last word is the type
  const name = words.slice(0, -1).join(" ");
  return { name, typeSuffix };
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Generate HTML for 3 random cross-sell product cards.
 * Excludes products the customer already ordered.
 */
export function generateCrossSellHtml(excludeSlugs: string[] = []): string {
  const excludeSet = new Set(excludeSlugs);
  const candidates = GAS_PRODUCTS.filter((p) => !excludeSet.has(p.slug));
  const selected = shuffle([...candidates]).slice(0, 3);

  const cardCells = selected
    .map((product) => {
      const imageFile = PRIMARY_IMAGES[product.slug] || "";
      const imageUrl = `${SITE_URL}/products/${imageFile}`;
      const productUrl = `${SITE_URL}/products/${product.slug}`;
      const typeLabel = getTypeLabel(product.type);
      const { name } = splitTitle(product.title);
      const price = `$${parseInt(product.price)}`;

      return `
                  <td style="width: 33.33%; padding: 0 6px; vertical-align: top;">
                    <a href="${productUrl}" style="text-decoration: none; display: block;">
                      <div style="border: 1px solid #2a2a2a; background-color: #141414; overflow: hidden;">
                        <img src="${imageUrl}" alt="${product.title}" width="160" style="width: 100%; height: auto; display: block;" />
                        <div style="padding: 10px 10px 12px;">
                          <span style="display: inline-block; background-color: #1e1e1e; color: #a0a0a0; font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 6px; margin-bottom: 6px;">DOT COLLECTION</span>
                          <p style="margin: 0 0 2px; color: #ffffff; font-size: 13px; font-weight: 700; line-height: 1.3;">${name}</p>
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #a0a0a0; font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">${typeLabel}</span>
                            <span style="color: #cccccc; font-size: 13px; font-weight: 600;">${price}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </td>`;
    })
    .join("");

  return `
          <!-- Cross-sell -->
          <tr>
            <td style="padding: 32px 0 0; border-top: 1px solid #222;">
              <p style="margin: 0 0 16px; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">
                More from the Dot Collection
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
${cardCells}
                </tr>
              </table>
              <div style="padding-top: 16px;">
                <a href="${SITE_URL}/#products" style="color: #FF462E; font-size: 12px; text-decoration: none; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                  Shop All &rarr;
                </a>
              </div>
            </td>
          </tr>`;
}
