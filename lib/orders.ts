// ── Order Status Types ──────────────────────────────────────────────

export type OrderStatus =
  | "paid"
  | "sent_to_production"
  | "shipped"
  | "delivered"
  | "paid_printify_failed";

// ── Order Lookup Result (safe shape returned to client) ─────────────

export interface OrderLineItem {
  handle: string;
  quantity: number;
  size: string;
}

export interface ShipmentInfo {
  trackingNumber: string | null;
  trackingUrl: string | null;
  carrier: string | null;
  createdAt: string;
}

export interface OrderLookupResult {
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  items: OrderLineItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  shippingAddress: {
    city?: string;
    state?: string;
    country?: string;
  } | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  carrier: string | null;
  shipments: ShipmentInfo[];
  createdAt: string;
}

// ── Status Display Mapping ──────────────────────────────────────────

export const ORDER_STATUS_MAP: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  paid: {
    label: "Order Received",
    color: "text-gas-orange",
    bgColor: "bg-gas-orange/10",
  },
  sent_to_production: {
    label: "In Production",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  shipped: {
    label: "Shipped",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  delivered: {
    label: "Delivered",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  paid_printify_failed: {
    label: "Processing",
    color: "text-gas-orange",
    bgColor: "bg-gas-orange/10",
  },
};

// ── Timeline Steps ──────────────────────────────────────────────────

export const ORDER_STEPS = [
  "Order Received",
  "In Production",
  "Shipped",
  "Delivered",
] as const;

/** Map a status to which step index is active (0-based). */
export function getActiveStep(status: OrderStatus): number {
  switch (status) {
    case "paid":
    case "paid_printify_failed":
      return 0;
    case "sent_to_production":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 3;
    default:
      return 0;
  }
}
