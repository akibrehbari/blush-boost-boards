import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

export function VideoModal({
  thumbnailSrc,
  videoId = "1222279392",
  portrait = true,
}: {
  thumbnailSrc?: string;
  videoId?: string;
  portrait?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className={`group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 flex items-center justify-center ${
          portrait ? "aspect-[16/10] sm:aspect-[21/9]" : "aspect-video"
        }`}
      >
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt="Video preview"
            className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:opacity-70 group-hover:scale-105"
          />
        )}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--pink)] shadow-[0_0_40px_var(--pink)] transition-transform duration-300 group-hover:scale-110">
            <Play className="h-8 w-8 fill-white text-white ml-1" />
          </span>
          <span className="text-sm font-semibold text-white/70 group-hover:text-white transition">Watch the video</span>
        </div>
      </button>

      {/* Modal — rendered in a portal so smooth-scroll / animated ancestors
          can't break the fixed positioning */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className={`relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black ${
                    portrait
                      ? "max-w-[calc(85vh*9/16)] aspect-[9/16] max-h-[85vh]"
                      : "max-w-4xl aspect-video"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${videoId}?badge=0&autoplay=1&muted=0&autopause=0&player_id=0&app_id=58479`}
                    className="h-full w-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title="clb Video"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
