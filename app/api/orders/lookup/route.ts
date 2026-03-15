import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { OrderLookupResult, OrderStatus, ShipmentInfo } from "@/lib/orders";

export const runtime = "nodejs";

// ── Simple in-memory rate limiter ───────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ── POST handler ────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429 }
    );
  }

  // Parse body
  let body: { email?: string; orderNumber?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { email, orderNumber } = body;

  // Validate inputs
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (!orderNumber || typeof orderNumber !== "string") {
    return NextResponse.json(
      { error: "Please provide your order number." },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedOrderNum = orderNumber.trim().toUpperCase();

  // Order numbers are 8 hex characters (first 8 chars of UUID)
  if (!/^[A-F0-9]{8}$/.test(normalizedOrderNum)) {
    return NextResponse.json(
      { error: "Invalid order number format. It should be 8 characters (e.g. A1B2C3D4)." },
      { status: 400 }
    );
  }

  try {
    const orderPrefix = normalizedOrderNum.toLowerCase();

    // UUID columns don't support ILIKE - use a range query instead.
    // All UUIDs starting with "40d7b909" fall between
    // "40d7b909-0000-0000-0000-000000000000" and
    // "40d7b909-ffff-ffff-ffff-ffffffffffff".
    const uuidLower = `${orderPrefix}-0000-0000-0000-000000000000`;
    const uuidUpper = `${orderPrefix}-ffff-ffff-ffff-ffffffffffff`;

    const { data: order, error } = await getSupabase()
      .from("orders")
      .select("*")
      .ilike("customer_email", normalizedEmail)
      .gte("id", uuidLower)
      .lte("id", uuidUpper)
      .limit(1)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "No order found with that email and order number." },
        { status: 404 }
      );
    }

    // Build shipments array from the JSONB column (or fall back to scalar fields)
    const rawShipments: ShipmentInfo[] = Array.isArray(order.shipments)
      ? order.shipments.map(
          (s: { tracking_number?: string; tracking_url?: string; carrier?: string; created_at?: string }) => ({
            trackingNumber: s.tracking_number || null,
            trackingUrl: s.tracking_url || null,
            carrier: s.carrier || null,
            createdAt: s.created_at || order.created_at,
          })
        )
      : [];

    // If no shipments array but scalar tracking exists, use that as a single shipment
    const shipments: ShipmentInfo[] =
      rawShipments.length > 0
        ? rawShipments
        : order.tracking_number
          ? [
              {
                trackingNumber: order.tracking_number,
                trackingUrl: order.tracking_url,
                carrier: order.carrier,
                createdAt: order.created_at,
              },
            ]
          : [];

    // Build safe response - omit full address, UUIDs, and internal IDs
    const result: OrderLookupResult = {
      orderNumber: order.id.slice(0, 8).toUpperCase(),
      status: order.status as OrderStatus,
      customerName: order.customer_name,
      items: (order.line_items || []).map(
        (item: { handle: string; quantity: number; size: string }) => ({
          handle: item.handle,
          quantity: item.quantity,
          size: item.size,
        })
      ),
      subtotalCents: order.subtotal_cents,
      shippingCents: order.shipping_cents,
      totalCents: order.total_cents,
      currency: order.currency,
      shippingAddress: order.shipping_address
        ? {
            city: order.shipping_address.city,
            state: order.shipping_address.state,
            country: order.shipping_address.country,
          }
        : null,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      carrier: order.carrier,
      shipments,
      createdAt: order.created_at,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[orders/lookup] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
