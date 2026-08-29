import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXT = "the creators club";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 700);
    }, 2400);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative flex items-center justify-center">
            {/* vapour / blur shimmer background */}
            <motion.div
              className="absolute h-32 w-96 rounded-full bg-[var(--pink)] opacity-20 blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* letter-by-letter vapour reveal */}
            <h1 className="relative flex gap-[2px] text-2xl sm:text-4xl font-extrabold tracking-[0.18em] uppercase select-none">
              {TEXT.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: i * 0.055,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={char === " " ? "w-3" : "text-[var(--pink)]"}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* exit shimmer line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--pink)] to-transparent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
