import Link from "next/link";
import { GAS_STUDIO_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img
              src="/gas-studio-wordmark.svg"
              alt="GAS Studio"
              className="h-5"
            />
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              Merch Lab
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            <Link
              href="/#products"
              className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/orders"
              className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
            >
              Orders
            </Link>
            <a
              href={GAS_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white transition-colors"
            >
              goodatscale.studio
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border-default flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-xs text-text-muted">
            &copy; {new Date().getFullYear()} GAS Studio. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-muted">
            Powered by{" "}
            <a
              href={GAS_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gas-orange hover:text-gas-orange-hover transition-colors"
            >
              GAS Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
