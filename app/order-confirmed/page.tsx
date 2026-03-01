"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { GAS_STUDIO_URL } from "@/lib/constants";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmedPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-24 pb-16 md:pb-24 min-h-screen flex items-center">
      <div className="mx-auto max-w-lg px-4 sm:px-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gas-orange/10 flex items-center justify-center">
            <CheckCircle size={32} className="text-gas-orange" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-tight mb-4">
          Thank You for
          <br />
          Your Order!
        </h1>

        {/* Info */}
        <p className="font-body text-text-secondary leading-relaxed mb-2">
          Your order is being prepared and will ship within 3–7 business days.
        </p>
        <p className="font-body text-sm text-text-muted mb-8">
          You&apos;ll receive a confirmation email with tracking details once your
          order ships.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
          <a href={GAS_STUDIO_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary">Visit GAS Studio</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
