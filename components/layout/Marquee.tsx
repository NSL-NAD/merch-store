"use client";

import { MARQUEE_TEXT } from "@/lib/constants";

export default function Marquee() {
  // Repeat text enough times to fill the screen during animation
  const repeated = Array(4).fill(MARQUEE_TEXT).join("");

  return (
    <div className="bg-marquee-bg overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-marquee-text">
          {repeated}
        </span>
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-marquee-text">
          {repeated}
        </span>
      </div>
    </div>
  );
}
