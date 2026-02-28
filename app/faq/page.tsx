import { Metadata } from "next";
import Accordion from "@/components/faq/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about GAS Merch Lab — shipping, sizing, returns, and more.",
};

export default function FAQPage() {
  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-4">
          FAQ
        </h1>
        <p className="font-body text-text-secondary mb-10">
          Everything you need to know about our products, shipping, and more.
        </p>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </div>
  );
}
