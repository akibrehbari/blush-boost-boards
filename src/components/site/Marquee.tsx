const ITEMS = [
  "Fashion", "Glamour", "Lifestyle", "Fitness", "Beauty", "Travel",
  "Content Creation", "Brand Deals", "Social Media", "Personal Branding",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section className="relative border-y border-white/5 py-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      <div className="flex w-max animate-marquee whitespace-nowrap gap-12">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-12 text-2xl md:text-3xl font-semibold tracking-tight">
            <span className="text-white/80">{item}</span>
            <span className="h-2 w-2 rounded-full bg-[var(--pink)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
