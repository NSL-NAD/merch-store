"use client";

import { motion } from "framer-motion";

export default function DotPhilosophy() {
  return (
    <section className="bg-bg-primary py-16 md:py-24 border-b border-border-default">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted text-center mb-12 md:mb-16"
        >
          Our Design Philosophy
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Single Dot — Completion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            {/* Dot visual — same height as triple dots row */}
            <div className="mb-8 flex items-center h-10">
              <div className="h-10 w-10 rounded-full bg-gas-orange" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight mb-4">
              Completion
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-gas-orange mb-4">
              The Single Dot
            </p>
            <p className="font-body text-text-secondary leading-relaxed max-w-sm">
              Start what you finish. Execute with intention. The single dot is a
              commitment to getting things done — a mindset of follow-through and
              purposeful action.
            </p>
          </motion.div>

          {/* Triple Dot — More Work to Do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center text-center"
          >
            {/* Dots visual */}
            <div className="mb-8 flex items-center gap-3 h-10">
              <div className="h-10 w-10 rounded-full bg-gas-orange" />
              <div className="h-10 w-10 rounded-full bg-gas-orange" />
              <div className="h-10 w-10 rounded-full bg-gas-orange" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight mb-4">
              More Work to Do
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-gas-orange mb-4">
              The Triple Dot
            </p>
            <p className="font-body text-text-secondary leading-relaxed max-w-sm">
              There is always more good to be done. The triple dot represents a
              recognition that the work is never finished — doing good at scale
              means never settling and always pushing forward.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
