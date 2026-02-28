import { Metadata } from "next";
import OrderLookup from "@/components/orders/OrderLookup";

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Look up your GAS Merch Lab order status, tracking, and details.",
};

export default function OrdersPage() {
  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-4">
          Track Your Order
        </h1>
        <p className="font-body text-text-secondary leading-relaxed mb-10">
          Enter the email address you used at checkout and your 8-character
          order number from your confirmation email.
        </p>
        <OrderLookup />
      </div>
    </div>
  );
}
