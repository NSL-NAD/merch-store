import { Metadata } from "next";
import { GAS_STUDIO_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "GAS Merch Lab is a venture by GAS Studio. Premium apparel and art posters celebrating purpose-driven design and cultures from 12 countries.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left - metadata */}
          <div className="space-y-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                Venture
              </p>
              <p className="font-body text-text-secondary">
                E-Commerce / Merch
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                Parent Brand
              </p>
              <p className="font-body text-text-secondary">GAS Studio</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                Focus
              </p>
              <p className="font-body text-text-secondary">
                Purpose-driven apparel & country-inspired art
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                Collections
              </p>
              <p className="font-body text-text-secondary">
                The Dot Collection, Tees, Sweatshirts, Jackets, Beanies, Mugs, Journals, Totes & More
              </p>
              <p className="font-body text-text-secondary mt-1">
                The Country Collection, 12 Countries, Tees & Posters (Coming Soon)
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                Philosophy
              </p>
              <p className="font-body text-text-secondary">
                Wearable art driven by purpose. Every dot means something.
              </p>
            </div>
          </div>

          {/* Right - story */}
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-8">
              About
              <br />
              GAS Merch Lab
            </h1>

            <div className="space-y-5 font-body text-text-secondary leading-relaxed">
              <p>
                GAS Merch Lab started with a question: what if the things that
                drive us could become part of our everyday? Not just words on a
                wall, but art you wear and display , pieces that spark
                conversations and carry meaning.
              </p>

              <p className="font-display text-lg uppercase tracking-wider text-text-primary">
                The Dot Collection
              </p>
              <p>
                Our flagship collection is built around the GAS dot , a
                symbol of purpose and completion. The single dot represents
                finishing what you start. The triple dot is a reminder that
                there&apos;s always more good to be done. Each piece in the
                collection carries one of these marks: premium faded wash tees,
                heavyweight embroidered sweatshirts, cuffed knit beanies, and
                mid-length crew socks.
              </p>

              <p className="font-display text-lg uppercase tracking-wider text-text-primary">
                The Country Collection
              </p>
              <p>
                Coming soon , 12 countries, each brought to life through
                bold, illustrative design. From the neon-lit streets of Tokyo to
                the sun-bleached walls of Santorini, every piece captures the
                essence of a place , its people, traditions, landscape,
                and spirit. Available as graphic tees and museum-quality art
                posters.
              </p>

              <p>
                Every tee is printed on premium blanks. Every
                sweatshirt is a heavyweight 350 GSM cotton blend with
                embroidered details. We partner with best-in-class
                print-on-demand to deliver quality without waste.
              </p>
            </div>

            {/* Orange dot section */}
            <div className="mt-10 p-6 border border-border-default rounded-sm bg-bg-secondary">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block h-4 w-4 rounded-full bg-gas-orange" />
                <h3 className="font-display text-lg uppercase tracking-wider">
                  The Orange Dot
                </h3>
              </div>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                The GAS Studio orange dot appears on every product as our brand
                mark , printed on tees and socks, embroidered on
                sweatshirts and beanies. It&apos;s a signature of quality and
                intentional design that connects every piece back to the studio.
              </p>
            </div>

            {/* GAS Studio link */}
            <div className="mt-8">
              <p className="font-body text-text-secondary mb-3">
                GAS Merch Lab is a venture by GAS Studio , we build purpose-driven
                businesses powered by systems, automation, and AI.
              </p>
              <a
                href={GAS_STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gas-orange hover:text-gas-orange-hover transition-colors"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-gas-orange" />
                Visit GAS Studio &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
