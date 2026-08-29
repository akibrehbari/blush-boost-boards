import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CARDS = [
  {
    title: "Get Scouted",
    body: "Submit your application and our team personally reviews your profile within 48 hours.",
    color: "from-[var(--pink)] to-rose-700",
    num: "01",
  },
  {
    title: "Build Your Brand",
    body: "We craft your portfolio, optimize your social presence, and connect you with top agencies.",
    color: "from-purple-600 to-[var(--pink)]",
    num: "02",
  },
  {
    title: "Start Earning",
    body: "Land paid campaigns, collaborations, and brand deals — we handle negotiations so you earn more.",
    color: "from-rose-800 to-purple-700",
    num: "03",
  },
  {
    title: "Scale Up",
    body: "With a dedicated manager by your side, grow your audience and unlock premium opportunities.",
    color: "from-[var(--pink)] to-pink-900",
    num: "04",
  },
];

export function CardStack() {
  const [cards, setCards] = useState(CARDS);

  const rotate = () => {
    setCards((c) => {
      const [first, ...rest] = c;
      return [...rest, first];
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: 300, height: 380 }}>
        <AnimatePresence mode="popLayout">
          {cards.map((card, i) => {
            const isTop = i === 0;
            return (
              <motion.div
                key={card.num}
                layout
                initial={{ scale: 0.85, y: 40, opacity: 0 }}
                animate={{
                  scale: 1 - i * 0.05,
                  y: i * 14,
                  opacity: i > 2 ? 0 : 1,
                  zIndex: cards.length - i,
                  rotateZ: isTop ? 0 : i % 2 === 0 ? 1.5 : -1.5,
                }}
                exit={{ scale: 0.7, y: -60, opacity: 0, rotateZ: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.color} p-7 flex flex-col justify-between shadow-2xl`}
                style={{ originY: 1 }}
              >
                <div>
                  <span className="text-5xl font-black text-white/20">{card.num}</span>
                  <h3 className="mt-4 text-2xl font-extrabold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">{card.body}</p>
                </div>
                {isTop && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="self-end"
                  >
                    <button
                      onClick={rotate}
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-xs font-semibold text-white hover:bg-white/25 transition"
                    >
                      Next <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <p className="text-xs text-white/40">Tap next to explore</p>
    </div>
  );
}
