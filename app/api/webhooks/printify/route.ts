import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendShippingNotification } from "@/lib/emails/shipping-notification";

export const runtime = "nodejs";

interface StoredShipment {
  tracking_number: string | null;
  tracking_url: string | null;
  carrier: string | null;
  created_at: string;
}

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

    // Get the newest shipment from the payload (last in the array)
    // Printify webhook may use `tracking_number`/`tracking_url` or `number`/`url`
    const latestShipment = shipments[shipments.length - 1];
    const trackingNumber =
      latestShipment.tracking_number || latestShipment.number || null;
    const trackingUrl =
      latestShipment.tracking_url || latestShipment.url || null;
    const carrier = latestShipment.carrier || null;

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

    // Build the full shipments array — deduplicate by tracking number
    const existingShipments: StoredShipment[] = Array.isArray(order.shipments)
      ? order.shipments
      : [];
    const existingTrackingNumbers = new Set(
      existingShipments.map((s: StoredShipment) => s.tracking_number)
    );

    const newShipments: StoredShipment[] = [];
    for (const s of shipments) {
      const tn = s.tracking_number || s.number || null;
      if (!existingTrackingNumbers.has(tn)) {
        newShipments.push({
          tracking_number: tn,
          tracking_url: s.tracking_url || s.url || null,
          carrier: s.carrier || null,
          created_at: s.shipped_at || new Date().toISOString(),
        });
      }
    }

    const allShipments = [...existingShipments, ...newShipments];

    // Update order with all shipments + latest scalar tracking fields
    await getSupabase()
      .from("orders")
      .update({
        status: "shipped",
        tracking_number: trackingNumber,
        tracking_url: trackingUrl,
        carrier,
        shipments: allShipments,
      })
      .eq("id", order.id);

    // Send shipping notification for each NEW shipment
    const totalPackages = allShipments.length;
    for (const newShipment of newShipments) {
      const packageNumber =
        allShipments.findIndex(
          (s) => s.tracking_number === newShipment.tracking_number
        ) + 1;

      try {
        await sendShippingNotification({
          email: order.customer_email,
          name: order.customer_name,
          orderId: order.id,
          trackingNumber: newShipment.tracking_number,
          trackingUrl: newShipment.tracking_url,
          carrier: newShipment.carrier,
          packageNumber: totalPackages > 1 ? packageNumber : undefined,
          totalPackages: totalPackages > 1 ? totalPackages : undefined,
        });
      } catch (emailError) {
        console.error(
          `Shipping notification email failed for package ${packageNumber}:`,
          emailError
        );
      }

      // Small delay between emails to avoid Resend rate limits
      if (newShipments.length > 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
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
