import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-[-0.03em] leading-[1]">
            Ready to start <br />
            <span className="text-gradient-pink">your journey?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href="#apply"
            className="mt-10 group inline-flex items-center gap-2 rounded-full bg-[var(--pink)] px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:glow-pink"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-16 text-sm text-white/55">
            Have questions? Reach out at{" "}
            <a href="mailto:info@creatorsclb.com" className="text-white underline underline-offset-4 decoration-[var(--pink)]">
              info@creatorsclb.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
