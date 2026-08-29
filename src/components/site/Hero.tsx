import { lazy, Suspense } from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedNumber } from "./AnimatedNumber";

const HeroScene = lazy(() => import("./HeroScene"));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* 3D background with parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_85%)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-between px-6 pt-32 pb-12 text-center"
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--pink)] animate-pink-pulse" />
            </span>
            Now Accepting Applications
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-[-0.04em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl"
          >
            Launch Your <br className="hidden sm:block" />
            <span className="text-gradient-pink">Modeling Career.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl text-base sm:text-lg text-white/65 leading-relaxed"
          >
            Professional guidance, top opportunities, and full support — so you can focus on what you do best.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-2 flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href="#apply"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--pink)] px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:glow-pink"
            >
              Apply Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-white/10"
            >
              <Play className="h-4 w-4 fill-white" /> Watch How It Works
            </a>
          </motion.div>
        </div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-10 mt-12"
        >
          {[
            { v: 500, suffix: "+", label: "Active Models" },
            { v: 2, prefix: "$", suffix: "M+", label: "Model Earnings" },
            { v: 100, suffix: "%", label: "Safe & Verified" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--pink)]">
                <AnimatedNumber value={s.v} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
              </div>
              <div className="mt-2 text-xs sm:text-sm text-white/55 font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
