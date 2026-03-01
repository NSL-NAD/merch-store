const stats = [
  {
    label: "Collection:",
    lines: ["The Dot Collection", "4 Essentials"],
  },
  {
    label: "Design:",
    lines: ["Single Dot & Triple Dot", "GAS Philosophy"],
  },
  {
    label: "Edition:",
    lines: ["Launch Release", "Limited Run"],
  },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border-default bg-bg-primary">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="py-6 pr-6 flex flex-col justify-between"
            >
              <p className="font-mono text-sm uppercase tracking-widest text-text-muted mb-auto">
                {stat.label}
              </p>
              <div>
                {stat.lines.map((line) => (
                  <p
                    key={line}
                    className="font-mono text-xs uppercase tracking-wider text-text-secondary leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* 4th column — description + CTA */}
          <div className="py-6 flex flex-col justify-between">
            <div className="mb-auto">
              <p className="font-mono text-xs uppercase tracking-wider text-text-secondary leading-relaxed">
                Wearable art driven by purpose.
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-text-secondary leading-relaxed">
                Every dot means something.
              </p>
            </div>
            <div>
              <a
                href="#products"
                className="inline-block font-mono text-xs uppercase tracking-wider text-gas-orange hover:text-gas-orange-hover border-b border-gas-orange hover:border-gas-orange-hover pb-0.5 transition-colors"
              >
                Shop All &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
