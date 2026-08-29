import { Reveal, SectionLabel } from "./Reveal";
import { CircularGallery } from "./CircularGallery";
import { CardStack } from "./CardStack";

export function Models() {
  return (
    <section id="models" className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 max-w-3xl">
          <Reveal><SectionLabel>Our Models</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1]">
              Real People. <br /><span className="text-white/40">Real</span> Results.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg max-w-xl">
              These are real models who trusted us with their careers. Their growth speaks for itself.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 items-center">
          <Reveal delay={0.1}>
            <CircularGallery />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-extrabold">Your Journey With Us</h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                From first application to full-time creator — here's how we take you there, step by step.
              </p>
              <CardStack />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
