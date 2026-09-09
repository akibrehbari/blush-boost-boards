import { Reveal, SectionLabel } from "./Reveal";
import { VideoModal } from "./VideoModal";

export function Testimonial() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><SectionLabel>Testimonials</SectionLabel></Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
          <Reveal delay={0.05}>
            <div className="relative">
              <span className="absolute -top-12 -left-2 text-[10rem] leading-none font-serif text-[var(--pink)]/80 select-none">"</span>
              <blockquote className="relative text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-white">
                I was skeptical at first, but this completely changed my life.
                Within 3 months, I went from making nothing to earning over
                <span className="text-[var(--pink)]"> $120,000 a month.</span>
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                  alt="Sarah M."
                  className="h-12 w-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="font-semibold">Sarah M.</div>
                  <div className="text-sm text-white/55">Age 26 · Los Angeles, CA</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-5xl font-extrabold tracking-tight text-[var(--pink)]">
                  $124,000<span className="text-white/40 text-2xl">/mo</span>
                </div>
                <div className="mt-2 text-sm text-white/55">After 6 months on the program</div>
              </div>

              <VideoModal
                thumbnailSrc="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
