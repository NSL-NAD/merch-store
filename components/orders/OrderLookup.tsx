"use client";

import { useState } from "react";
import { Package, Truck, MapPin, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ORDER_STATUS_MAP,
  ORDER_STEPS,
  getActiveStep,
} from "@/lib/orders";
import type { OrderLookupResult } from "@/lib/orders";

// ── Helpers ─────────────────────────────────────────────────────────

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatProductName(handle: string): string {
  return handle
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Component ───────────────────────────────────────────────────────

export default function OrderLookup() {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<OrderLookupResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOrder(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orderNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setOrder(data);
    } catch {
      setError("Unable to look up your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setOrder(null);
    setError(null);
  }

  // ── Result view ─────────────────────────────────────────────────

  if (order) {
    const statusInfo = ORDER_STATUS_MAP[order.status];
    const activeStep = getActiveStep(order.status);

    return (
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Look Up Another Order
        </button>

        {/* Order header + status */}
        <div className="p-6 border border-border-default bg-bg-secondary">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-1">
                Order
              </p>
              <p className="font-mono text-2xl font-bold tracking-tight">
                #{order.orderNumber}
              </p>
            </div>
            <div className={cn("px-3 py-1.5", statusInfo.bgColor)}>
              <span
                className={cn(
                  "font-mono text-xs uppercase tracking-wider",
                  statusInfo.color
                )}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>
          <p className="font-body text-sm text-text-muted">
            Placed{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Status timeline */}
        <div className="p-6 border border-border-default bg-bg-secondary">
          <div className="flex items-center justify-between">
            {ORDER_STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                {/* Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full transition-colors relative",
                      i <= activeStep ? "bg-gas-orange" : "bg-border-default"
                    )}
                  >
                    {i === activeStep && (
                      <span className="absolute inset-0 rounded-full bg-gas-orange/40 animate-ping" />
                    )}
                  </div>
                  <p
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-wider mt-2 text-center whitespace-nowrap",
                      i <= activeStep ? "text-text-primary" : "text-text-muted"
                    )}
                  >
                    {step}
                  </p>
                </div>
                {/* Connecting line */}
                {i < ORDER_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-2 mb-5",
                      i < activeStep ? "bg-gas-orange" : "bg-border-default"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="p-6 border border-border-default bg-bg-secondary">
          <div className="flex items-center gap-2 mb-4">
            <Package size={16} className="text-gas-orange" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange">
              Items
            </p>
          </div>
          <div className="divide-y divide-border-default">
            {order.items.map((item, i) => (
              <div
                key={`${item.handle}-${item.size}-${i}`}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-body text-sm text-text-primary">
                    {formatProductName(item.handle)}
                  </p>
                  {item.size && (
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mt-0.5">
                      Size: {item.size}
                    </p>
                  )}
                </div>
                <p className="font-mono text-xs text-text-secondary">
                  Qty: {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="p-6 border border-border-default bg-bg-secondary">
          <div className="space-y-2">
            <div className="flex justify-between font-body text-sm text-text-secondary">
              <span>Subtotal</span>
              <span>{formatCents(order.subtotalCents)}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-text-secondary">
              <span>Shipping</span>
              <span>
                {order.shippingCents === 0
                  ? "Free"
                  : formatCents(order.shippingCents)}
              </span>
            </div>
            <div className="flex justify-between font-mono text-base font-semibold pt-3 border-t border-border-default">
              <span>Total</span>
              <span>{formatCents(order.totalCents)}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        {order.shippingAddress && (
          <div className="p-6 border border-border-default bg-bg-secondary">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-gas-orange" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange">
                Ships To
              </p>
            </div>
            <p className="font-body text-sm text-text-secondary">
              {[
                order.shippingAddress.city,
                order.shippingAddress.state,
                order.shippingAddress.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        )}

        {/* Tracking */}
        {order.trackingNumber && (
          <div className="p-6 border border-border-default bg-bg-secondary">
            <div className="flex items-center gap-2 mb-3">
              <Truck size={16} className="text-gas-orange" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange">
                Tracking{order.carrier ? ` \u2014 ${order.carrier}` : ""}
              </p>
            </div>
            {order.trackingUrl ? (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-gas-orange hover:text-gas-orange-hover transition-colors"
              >
                {order.trackingNumber} &rarr;
              </a>
            ) : (
              <p className="font-mono text-sm text-text-secondary">
                {order.trackingNumber}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── Form view ───────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2 block">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full bg-bg-secondary border border-border-default px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gas-orange transition-colors"
        />
      </div>

      {/* Order number */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2 block">
          Order Number
        </label>
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
          placeholder="e.g. A1B2C3D4"
          maxLength={8}
          required
          className="w-full bg-bg-secondary border border-border-default px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gas-orange transition-colors uppercase"
        />
        <p className="font-mono text-[10px] text-text-muted mt-1.5">
          Found in your order confirmation email.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 border border-red-500/30 bg-red-500/10 font-body text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer",
          "bg-gas-orange text-black hover:bg-gas-orange-hover",
          loading && "opacity-60 cursor-not-allowed"
        )}
      >
        <Package size={18} />
        {loading ? "Looking up\u2026" : "Track Order"}
      </button>
    </form>
  );
}
