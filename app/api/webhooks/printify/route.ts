import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendShippingNotification } from "@/lib/emails/shipping-notification";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // Verify webhook secret via query param
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.PRINTIFY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const eventType = payload.type;

  if (eventType === "order:shipment:created") {
    const { id: printifyOrderId, shipments } = payload.resource;

    if (!shipments || shipments.length === 0) {
      return NextResponse.json({ received: true });
    }

    const shipment = shipments[shipments.length - 1];
    const trackingNumber = shipment.tracking_number || null;
    const trackingUrl = shipment.tracking_url || null;
    const carrier = shipment.carrier || null;

    // Find the order in Supabase
    const { data: order } = await getSupabase()
      .from("orders")
      .select("*")
      .eq("printify_order_id", String(printifyOrderId))
      .single();

    if (!order) {
      console.warn(
        `Printify webhook: no order found for printify_order_id=${printifyOrderId}`
      );
      return NextResponse.json({ received: true });
    }

    // Update order with tracking info
    await getSupabase()
      .from("orders")
      .update({
        status: "shipped",
        tracking_number: trackingNumber,
        tracking_url: trackingUrl,
        carrier,
      })
      .eq("id", order.id);

    // Send shipping notification email
    try {
      await sendShippingNotification({
        email: order.customer_email,
        name: order.customer_name,
        orderId: order.id,
        trackingNumber,
        trackingUrl,
        carrier,
      });
    } catch (emailError) {
      console.error("Shipping notification email failed:", emailError);
    }
  }

  if (eventType === "order:shipment:delivered") {
    const { id: printifyOrderId } = payload.resource;

    await getSupabase()
      .from("orders")
      .update({ status: "delivered" })
      .eq("printify_order_id", String(printifyOrderId));
  }

  return NextResponse.json({ received: true });
}
