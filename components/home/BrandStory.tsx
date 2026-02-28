"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GAS_STUDIO_URL } from "@/lib/constants";
import type { CollectionTab } from "./CollectionSection";

const dotCollectionPillars = [
  {
    label: "Philosophy",
    text: "The dot is the most fundamental mark in design — a point of origin, a statement of completion, a signal that there\u2019s more to come.",
  },
  {
    label: "The Single Dot",
    text: "A period. A full stop. Start what you finish. Execute with intention.",
  },
  {
    label: "The Triple Dot",
    text: "An ellipsis. A continuation. There is always more good to be done. Never settle.",
  },
];

const comingSoonPillars = [
  {
    label: "Purpose",
    text: "Celebrate some of the world\u2019s most inspiring places and cultures through wearable art.",
  },
  {
    label: "Approach",
    text: "One illustrator. One style guide. 12 countries, each with a unique culture and story.",
  },
  {
    label: "Quality",
    text: "Premium acid wash blanks, museum-quality prints, and meticulous detail.",
  },
];

interface BrandStoryProps {
  tab: CollectionTab;
}

export default function BrandStory({ tab }: BrandStoryProps) {
  const isDotCollection = tab === "shop";
  const pillars = isDotCollection ? dotCollectionPillars : comingSoonPillars;

  return (
    <section className="bg-bg-primary py-16 md:py-24 border-t border-border-default">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-12 md:gap-16"
          >
            {/* Left — pillars */}
            <div className="space-y-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gas-orange mb-2">
                    {pillar.label}
                  </p>
                  <p className="font-body text-text-secondary leading-relaxed">
                    {pillar.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right — narrative */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight mb-6">
                {isDotCollection ? "Every Dot Means Something" : "Wear the World"}
              </h2>
              <div className="space-y-4 font-body text-text-secondary leading-relaxed">
                {isDotCollection ? (
                  <>
                    <p>
                      The Dot Collection is the foundation of GAS Merch Lab.
                      Each piece carries one of two marks — the single dot or
                      the triple dot — representing the two sides of execution:
                      finishing what you start, and knowing there&apos;s always
                      more to do.
                    </p>
                    <p>
                      Premium blanks. Minimal design. Maximum intent. This isn&apos;t
                      branding for branding&apos;s sake — it&apos;s a quiet signal
                      that you believe in doing good work, at scale.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      GAS Merch Lab was born from a simple idea: the places and
                      cultures that shape us deserve to be worn, displayed, and
                      shared. Each design in our launch collection captures the
                      essence of a country — its people, traditions, landscape,
                      and spirit — through bold, illustrative art.
                    </p>
                    <p>
                      Every tee is printed on premium AS Colour Staple Faded Tee
                      blanks, and every poster is produced on museum-quality
                      matte paper. We don&apos;t do fast fashion or disposable
                      art. We do pieces that mean something.
                    </p>
                  </>
                )}
              </div>
              <div className="mt-8">
                <a
                  href={GAS_STUDIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gas-orange hover:text-gas-orange-hover transition-colors"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-gas-orange" />
                  Powered by GAS Studio
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
