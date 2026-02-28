import Link from "next/link";

export default function Marquee() {
  return (
    <div className="bg-marquee-bg overflow-hidden py-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-marquee-text">
          Wearable art driven by purpose.
        </p>
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-marquee-text">
          Every dot means something.
        </p>
        <Link
          href="#products"
          className="font-mono text-[10px] uppercase tracking-widest text-gas-orange hover:text-gas-orange-hover transition-colors mt-1"
        >
          Shop All &rarr;
        </Link>
      </div>
    </div>
  );
}
