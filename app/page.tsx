import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Marquee from "@/components/layout/Marquee";
import CollectionSection from "@/components/home/CollectionSection";
import DotPhilosophy from "@/components/home/DotPhilosophy";
import { getAllProducts } from "@/lib/shopify";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();

  const shopProducts = products.filter((p) => !p.comingSoon);
  const comingSoonProducts = products.filter((p) => p.comingSoon);

  return (
    <>
      <Hero />
      <StatsBar />
      <Marquee />
      <DotPhilosophy />
      <CollectionSection
        shopProducts={shopProducts}
        comingSoonProducts={comingSoonProducts}
      />
    </>
  );
}
