import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CartItem {
  variantId: string;
  title: string;
  productTitle: string;
  handle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

    // Build Stripe line items
    const lineItems = items.map((item) => {
      const optionParts = [item.color, item.size].filter(Boolean);
      const nameSuffix = optionParts.length > 0 ? ` — ${optionParts.join(" / ")}` : "";

      // Stripe requires absolute URLs for product images
      let imageUrl: string | undefined;
      if (item.image && !item.image.startsWith("data:")) {
        imageUrl = item.image.startsWith("http")
          ? item.image
          : `${siteUrl}${item.image}`;
      }

      return {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(parseFloat(item.price.amount) * 100),
          product_data: {
            name: `${item.productTitle}${nameSuffix}`,
            ...(imageUrl ? { images: [imageUrl] } : {}),
          },
        },
        quantity: item.quantity,
      };
    });

    // Serialize cart metadata for the webhook
    // Stripe metadata values max 500 chars per key
    const cartMeta = items.map((i) => ({
      h: i.handle,
      v: i.variantId,
      q: i.quantity,
      s: i.size || "",
      c: i.color || "",
    }));
    const cartJson = JSON.stringify(cartMeta);

    // Split across keys if needed (500 char limit per key)
    const metadataEntries: Record<string, string> = {};
    if (cartJson.length <= 500) {
      metadataEntries.cart_items = cartJson;
    } else {
      const chunks = [];
      for (let i = 0; i < cartJson.length; i += 500) {
        chunks.push(cartJson.slice(i, i + 500));
      }
      chunks.forEach((chunk, idx) => {
        metadataEntries[`cart_items_${idx}`] = chunk;
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      // Note: automatic_tax is disabled. Prices are set inclusive of any applicable
      // taxes. Revisit when WI tax obligations are confirmed and revenue justifies
      // the added complexity of Stripe Tax.
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      metadata: metadataEntries,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
