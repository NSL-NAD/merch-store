"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[40vh] md:min-h-[50vh] max-h-[50vh] md:max-h-[55vh] items-center justify-center overflow-hidden bg-bg-primary pt-16">
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Headline */}
          <h1 className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(32px,11vw,207px)]">
            <span className="whitespace-nowrap">4 Designs</span>
            <br />
            <span className="whitespace-nowrap">1 Philosophy</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
