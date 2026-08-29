import { Reveal, SectionLabel } from "./Reveal";
import { VideoModal } from "./VideoModal";

const STEPS = [
  { n: "01", title: "Submit Application", desc: "Fill out a quick application with your details and photos. Less than 5 minutes — we read every single one." },
  { n: "02", title: "Profile Review", desc: "Our team carefully reviews your application within 24–48 hours and sends personal feedback either way." },
  { n: "03", title: "Onboarding & Training", desc: "Comprehensive onboarding covering platform, content strategy, branding — everything needed to succeed from day one." },
  { n: "04", title: "Start Earning", desc: "Launch your career with full support. Most models see meaningful results within the first month." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start gap-6 max-w-3xl">
          <Reveal><SectionLabel>How It Works</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1]">
              From Application <br />
              <span className="text-white/40">To</span> Earning.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg max-w-xl">
              A simple, transparent process designed to get you started quickly and set you up for long-term success.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all hover:bg-white/[0.04] hover:-translate-y-1">
                <div className="text-7xl md:text-8xl font-extrabold tracking-tighter text-[var(--pink)]/90 leading-none">
                  {s.n}
                </div>
                <div className="mt-8 text-xl font-semibold">{s.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16">
            <VideoModal />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
