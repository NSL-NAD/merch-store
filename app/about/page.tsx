import { Metadata } from "next";
import { GAS_STUDIO_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "GAS Merch Lab is a venture by GAS Studio — premium graphic tees and art posters celebrating cultures from 12 countries.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — metadata */}
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
                Country-inspired graphic tees & art posters
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                Philosophy
              </p>
              <p className="font-body text-text-secondary">
                Wearable art that celebrates some of the world&apos;s most
                inspiring places and cultures.
              </p>
            </div>
          </div>

          {/* Right — story */}
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight mb-8">
              About
              <br />
              GAS Merch Lab
            </h1>

            <div className="space-y-5 font-body text-text-secondary leading-relaxed">
              <p>
                GAS Merch Lab started with a question: what if the places that
                inspire us could become part of our everyday? Not as souvenirs
                on a shelf, but as art you wear and display — pieces that
                spark conversations and carry stories.
              </p>
              <p>
                Our launch collection features 12 countries, each brought to
                life through bold, illustrative design. From the neon-lit
                streets of Tokyo to the sun-bleached walls of Santorini, every
                piece captures the essence of a place — its people,
                traditions, landscape, and spirit.
              </p>
              <p>
                Every tee is printed on premium AS Colour Staple Faded Tee blanks.
                Every poster is produced on museum-quality matte paper. We
                partner with best-in-class print-on-demand to deliver quality
                without waste.
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
                The GAS Studio orange dot appears on every tee as our brand
                mark — a small, embroidered emblem that connects every piece
                back to the studio. It&apos;s a signature of quality and
                intentional design.
              </p>
            </div>

            {/* GAS Studio link */}
            <div className="mt-8">
              <p className="font-body text-text-secondary mb-3">
                GAS Merch Lab is a venture by GAS Studio — we build purpose-driven
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
