import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabase } from "@/lib/supabase";
import { createPrintifyOrder, sendToProduction } from "@/lib/printify/client";
import { getPrintifyMapping } from "@/lib/printify/product-map";
import { sendOrderConfirmation } from "@/lib/emails/order-confirmation";

export const runtime = "nodejs";

function parseCartMetadata(
  metadata: Record<string, string>
): { h: string; v: string; q: number; s: string }[] {
  // Cart may be in a single key or split across multiple keys
  if (metadata.cart_items) {
    return JSON.parse(metadata.cart_items);
  }

  // Reassemble split keys
  const chunks: string[] = [];
  let i = 0;
  while (metadata[`cart_items_${i}`]) {
    chunks.push(metadata[`cart_items_${i}`]);
    i++;
  }
  if (chunks.length > 0) {
    return JSON.parse(chunks.join(""));
  }

  return [];
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Check for duplicate processing
    const { data: existing } = await getSupabase()
      .from("orders")
      .select("id")
      .eq("stripe_session_id", session.id)
      .single();

    if (existing) {
      return NextResponse.json({ received: true });
    }

    // Parse cart items from metadata
    const cartItems = parseCartMetadata(
      (session.metadata as Record<string, string>) || {}
    );

    // Retrieve full session for line items and shipping details
    // The webhook event payload may omit shipping_details, so we
    // always pull the canonical session from the Stripe API.
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items"],
    });

    const customerEmail =
      fullSession.customer_details?.email ||
      session.customer_details?.email ||
      "";
    const customerName =
      fullSession.customer_details?.name ||
      session.customer_details?.name ||
      "";
    // Stripe SDK v20+ moved shipping to collected_information.shipping_details
    const shippingDetails =
      fullSession.collected_information?.shipping_details ?? null;
    const subtotalCents = fullSession.amount_subtotal || 0;
    const taxCents = fullSession.total_details?.amount_tax || 0;
    const totalCents = fullSession.amount_total || session.amount_total || 0;

    // Build line items for storage
    const lineItemsForDb = cartItems.map((item) => ({
      handle: item.h,
      variantId: item.v,
      quantity: item.q,
      size: item.s,
    }));

    // Insert order into Supabase
    const { data: order, error: dbError } = await getSupabase()
      .from("orders")
      .insert({
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        status: "paid",
        customer_email: customerEmail,
        customer_name: customerName,
        shipping_address: shippingDetails?.address || null,
        line_items: lineItemsForDb,
        subtotal_cents: subtotalCents,
        tax_cents: taxCents,
        shipping_cents: 0,
        total_cents: totalCents,
        currency: "usd",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ received: true });
    }

    // Create Printify order
    try {
      const printifyLineItems = cartItems
        .map((item) => {
          const mapping = getPrintifyMapping(item.h, item.v);
          if (!mapping) {
            console.warn(
              `No Printify mapping for handle=${item.h} variant=${item.v}`
            );
            return null;
          }
          return {
            product_id: mapping.productId,
            variant_id: mapping.variantId,
            quantity: item.q,
          };
        })
        .filter(Boolean) as {
        product_id: string;
        variant_id: number;
        quantity: number;
      }[];

      if (printifyLineItems.length > 0) {
        const shippingAddr = shippingDetails?.address;
        const nameParts = (shippingDetails?.name || customerName).split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const printifyOrder = await createPrintifyOrder({
          externalId: order.id,
          lineItems: printifyLineItems,
          shippingAddress: {
            first_name: firstName,
            last_name: lastName,
            email: customerEmail,
            address1: shippingAddr?.line1 || "",
            address2: shippingAddr?.line2 || undefined,
            city: shippingAddr?.city || "",
            region: shippingAddr?.state || "",
            zip: shippingAddr?.postal_code || "",
            country: shippingAddr?.country || "US",
          },
        });

        // Send to production
        await sendToProduction(printifyOrder.id);

        // Update order with Printify ID
        await getSupabase()
          .from("orders")
          .update({
            printify_order_id: printifyOrder.id,
            status: "sent_to_production",
          })
          .eq("id", order.id);
      }
    } catch (printifyError) {
      console.error("Printify order creation failed:", printifyError);

      // Mark order as needing manual attention
      await getSupabase()
        .from("orders")
        .update({ status: "paid_printify_failed" })
        .eq("id", order.id);
    }

    // Send confirmation email
    try {
      const stripeLineItems =
        fullSession.line_items?.data.map((li) => ({
          title: li.description || "",
          quantity: li.quantity || 1,
          price: (li.amount_total || 0) / 100,
        })) || [];

      await sendOrderConfirmation({
        email: customerEmail,
        name: customerName,
        orderId: order.id,
        items: stripeLineItems,
        total: totalCents / 100,
        shippingAddress: shippingDetails?.address,
      });
    } catch (emailError) {
      console.error("Confirmation email failed:", emailError);
    }
  }

  return NextResponse.json({ received: true });
}
