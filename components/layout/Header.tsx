"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { cartCount, setCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-default">
      <div className="relative mx-auto max-w-[1600px] px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/gas-studio-wordmark.svg"
            alt="GAS Studio"
            className="h-5"
          />
          <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Merch Lab
          </span>
        </Link>

        {/* Desktop nav — absolutely centered in the header */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href="/#products"
            className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/orders"
            className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
          >
            Orders
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-text-secondary hover:text-white transition-colors cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gas-orange text-black text-[10px] font-mono font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-secondary hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-b border-border-default bg-bg-primary"
          >
            <nav className="px-6 py-4 flex flex-col gap-4">
              <Link
                href="/#products"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
              >
                Orders
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
