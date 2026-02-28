import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderConfirmationParams {
  email: string;
  name: string;
  orderId: string;
  items: { title: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: {
    line1?: string;
    line2?: string | null;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null | undefined;
}

export async function sendOrderConfirmation({
  email,
  name,
  orderId,
  items,
  total,
  shippingAddress,
}: OrderConfirmationParams) {
  const orderNumber = orderId.slice(0, 8).toUpperCase();
  const firstName = name.split(" ")[0] || "there";

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #ccc; font-size: 14px;">
            ${item.title}
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #999; font-size: 14px; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #ccc; font-size: 14px; text-align: right;">
            $${item.price.toFixed(2)}
          </td>
        </tr>`
    )
    .join("");

  const addressLine = shippingAddress
    ? [
        shippingAddress.line1,
        shippingAddress.line2,
        [shippingAddress.city, shippingAddress.state, shippingAddress.postal_code]
          .filter(Boolean)
          .join(", "),
      ]
        .filter(Boolean)
        .join("<br />")
    : "";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid #222;">
              <span style="font-size: 18px; font-weight: 900; letter-spacing: -0.02em;">
                <span style="color: #FF462E; opacity: 0.5;">GAS</span>
                <span style="color: #ffffff;">STUDIO</span>
              </span>
              <span style="color: #666; font-size: 11px; letter-spacing: 0.1em; margin-left: 8px; text-transform: uppercase; font-family: monospace;">Merch Lab</span>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 0 24px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Order Confirmed
              </h1>
              <p style="margin: 12px 0 0; color: #999; font-size: 14px; line-height: 1.6;">
                Hey ${firstName}, thanks for your order! We're getting it ready for production.
              </p>
            </td>
          </tr>

          <!-- Order Number -->
          <tr>
            <td style="padding: 16px; background-color: #111; border: 1px solid #222; margin-bottom: 24px;">
              <span style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Order</span>
              <br />
              <span style="color: #FF462E; font-size: 18px; font-weight: 700; font-family: monospace;">#${orderNumber}</span>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 24px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace; border-bottom: 1px solid #333;">Item</td>
                  <td style="padding: 8px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace; text-align: center; border-bottom: 1px solid #333;">Qty</td>
                  <td style="padding: 8px 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace; text-align: right; border-bottom: 1px solid #333;">Price</td>
                </tr>
                ${itemRows}
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding: 16px 0; border-top: 2px solid #333;">
              <table width="100%">
                <tr>
                  <td style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Shipping</td>
                  <td style="color: #ccc; font-size: 14px; text-align: right;">Free</td>
                </tr>
                <tr>
                  <td style="color: #ffffff; font-size: 16px; font-weight: 700; padding-top: 8px;">Total</td>
                  <td style="color: #ffffff; font-size: 16px; font-weight: 700; text-align: right; padding-top: 8px;">$${total.toFixed(2)}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            addressLine
              ? `
          <!-- Shipping Address -->
          <tr>
            <td style="padding: 24px 0; border-top: 1px solid #222;">
              <span style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Ships to</span>
              <p style="margin: 8px 0 0; color: #ccc; font-size: 14px; line-height: 1.6;">
                ${addressLine}
              </p>
            </td>
          </tr>`
              : ""
          }

          <!-- Timeline -->
          <tr>
            <td style="padding: 24px 16px; background-color: #111; border: 1px solid #222;">
              <p style="margin: 0; color: #ccc; font-size: 14px; line-height: 1.6;">
                Your order will be printed and shipped within <strong style="color: #fff;">3–7 business days</strong>.
                You'll receive another email with tracking info once it ships.
              </p>
            </td>
          </tr>

          <!-- Cross-sell -->
          <tr>
            <td style="padding: 32px 0 0; border-top: 1px solid #222;">
              <p style="margin: 0 0 16px; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">
                More from the Dot Collection
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <a href="https://merch.goodatscale.studio/products/gas-tee" style="color: #ccc; text-decoration: none; font-size: 14px;">
                      THE EVERYDAY Tee
                    </a>
                    <span style="color: #666; font-size: 13px; float: right;">$45</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <a href="https://merch.goodatscale.studio/products/gas-sweatshirt" style="color: #ccc; text-decoration: none; font-size: 14px;">
                      THE GO-TO Hoodie
                    </a>
                    <span style="color: #666; font-size: 13px; float: right;">$75</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <a href="https://merch.goodatscale.studio/products/gas-beanie" style="color: #ccc; text-decoration: none; font-size: 14px;">
                      THE CAP Beanie
                    </a>
                    <span style="color: #666; font-size: 13px; float: right;">$30</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <a href="https://merch.goodatscale.studio/products/gas-socks" style="color: #ccc; text-decoration: none; font-size: 14px;">
                      THE STEPS Socks
                    </a>
                    <span style="color: #666; font-size: 13px; float: right;">$25</span>
                  </td>
                </tr>
              </table>
              <div style="padding-top: 16px;">
                <a href="https://merch.goodatscale.studio/#products" style="color: #FF462E; font-size: 12px; text-decoration: none; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                  Shop All &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0; border-top: 1px solid #222; margin-top: 32px;">
              <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.6;">
                GAS Merch Lab — A GAS Studio Venture
                <br />
                <a href="https://merch.goodatscale.studio" style="color: #FF462E; text-decoration: none;">merch.goodatscale.studio</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "merch@goodatscale.co",
    to: email,
    subject: `Order Confirmed — GAS Merch Lab #${orderNumber}`,
    html,
  });
}
