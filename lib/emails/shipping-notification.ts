import { Resend } from "resend";
import { generateCrossSellHtml } from "./cross-sell";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ShippingNotificationParams {
  email: string;
  name: string;
  orderId: string;
  trackingNumber: string | null;
  trackingUrl: string | null;
  carrier: string | null;
  packageNumber?: number;
  totalPackages?: number;
}

export async function sendShippingNotification({
  email,
  name,
  orderId,
  trackingNumber,
  trackingUrl,
  carrier,
  packageNumber,
  totalPackages,
}: ShippingNotificationParams) {
  const orderNumber = orderId.slice(0, 8).toUpperCase();
  const firstName = name.split(" ")[0] || "there";
  const hasMultiplePackages =
    packageNumber !== undefined && totalPackages !== undefined;

  const packageLabel = hasMultiplePackages
    ? ` (Package ${packageNumber} of ${totalPackages})`
    : "";

  const trackingSection = trackingNumber
    ? `
          <tr>
            <td style="padding: 24px 16px; background-color: #111; border: 1px solid #222;">
              ${
                hasMultiplePackages
                  ? `<span style="color: #fff; font-size: 12px; font-weight: 700; font-family: monospace; display: block; margin-bottom: 8px;">Package ${packageNumber} of ${totalPackages}</span>`
                  : ""
              }
              <span style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Tracking${carrier ? `, ${carrier}` : ""}</span>
              <br />
              ${
                trackingUrl
                  ? `<a href="${trackingUrl}" style="color: #FF462E; font-size: 16px; font-weight: 700; font-family: monospace; text-decoration: none;">${trackingNumber}</a>`
                  : `<span style="color: #FF462E; font-size: 16px; font-weight: 700; font-family: monospace;">${trackingNumber}</span>`
              }
            </td>
          </tr>`
    : "";

  const crossSellHtml = generateCrossSellHtml();

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
                Your Order Has Shipped!${packageLabel}
              </h1>
              <p style="margin: 12px 0 0; color: #999; font-size: 14px; line-height: 1.6;">
                Hey ${firstName}, great news, your order <strong style="color: #FF462E;">#${orderNumber}</strong> is on its way.
              </p>
            </td>
          </tr>

          ${trackingSection}

          <!-- Delivery estimate -->
          <tr>
            <td style="padding: 24px 0;">
              <p style="margin: 0; color: #ccc; font-size: 14px; line-height: 1.6;">
                Most US orders arrive within <strong style="color: #fff;">5-10 business days</strong> from the ship date.
                ${trackingUrl ? `<a href="${trackingUrl}" style="color: #FF462E; text-decoration: none;">Track your package &rarr;</a>` : ""}
              </p>
            </td>
          </tr>

          ${crossSellHtml}

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0; border-top: 1px solid #222;">
              <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.6;">
                GAS Merch Lab. A GAS Studio Venture
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

  const subjectPackageLabel = hasMultiplePackages
    ? ` (Package ${packageNumber} of ${totalPackages})`
    : "";

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "merch@goodatscale.co",
    to: email,
    subject: `Your Order Has Shipped${subjectPackageLabel}, GAS Merch Lab #${orderNumber}`,
    html,
  });
}
