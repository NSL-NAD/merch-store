import type { Metadata } from "next";
import { Albert_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shop.goodatscale.studio"),
  title: {
    default: "GAS Merch Lab | 12 Designs. 1 Philosophy.",
    template: "%s | GAS Merch Lab",
  },
  description:
    "Premium graphic tees and art posters celebrating cultures from some of the world's most inspiring places. Powered by GAS Studio.",
  openGraph: {
    type: "website",
    siteName: "GAS Merch Lab",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
