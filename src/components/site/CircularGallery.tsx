import { useEffect, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { BadgeCheck, Instagram } from "lucide-react";

const MODELS = [
  { name: "Sophia Lane", ig: "sophialane", followers: "1.2M", earn: "$112K/mo", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80" },
  { name: "Amelia Cruz", ig: "ameliacruz", followers: "1.8M", earn: "$185K/mo", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80" },
  { name: "Jordan Reyes", ig: "jordanreyes", followers: "940K", earn: "$124K/mo", img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=600&q=80" },
  { name: "Mia Chen", ig: "miachen", followers: "1.5M", earn: "$147K/mo", img: "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?auto=format&fit=crop&w=600&q=80" },
  { name: "Camille Park", ig: "camillepark", followers: "2.3M", earn: "$221K/mo", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80" },
  { name: "Eva Romano", ig: "evaromano", followers: "1.1M", earn: "$103K/mo", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" },
];

const RADIUS = 280;
const CARD_W = 160;
const CARD_H = 210;

export function CircularGallery() {
  const angleRef = useRef(0);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  const count = MODELS.length;

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      velocity.current *= 0.95;
      angleRef.current += (delta / 1000) * 0.3 + velocity.current * 0.01;
    }
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const theta = angleRef.current + (i / count) * Math.PI * 2;
      const x = Math.sin(theta) * RADIUS;
      const z = Math.cos(theta) * RADIUS;
      const scale = (z + RADIUS) / (RADIUS * 2) * 0.4 + 0.7;
      const opacity = (z + RADIUS) / (RADIUS * 2) * 0.6 + 0.4;
      el.style.transform = `translateX(${x}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(Math.round(scale * 10));
    });
  });

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    velocity.current = dx;
    angleRef.current += dx * 0.004;
    lastX.current = e.clientX;
  };

  const onPointerUp = () => { isDragging.current = false; };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      style={{ height: CARD_H + 120, perspective: 900 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {MODELS.map((m, i) => (
        <div
          key={m.ig}
          ref={(el) => { itemsRef.current[i] = el; }}
          className="absolute rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden transition-shadow hover:border-[var(--pink)]/50"
          style={{ width: CARD_W, height: CARD_H, willChange: "transform, opacity" }}
        >
          <img src={m.img} alt={m.name} className="h-[65%] w-full object-cover" draggable={false} />
          <div className="p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold truncate">{m.name}</span>
              <BadgeCheck className="h-3.5 w-3.5 text-[var(--pink)] shrink-0" />
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-white/50">
              <Instagram className="h-2.5 w-2.5" /> @{m.ig}
            </div>
            <div className="mt-2 flex justify-between text-[10px]">
              <span className="text-white/50">{m.followers}</span>
              <span className="text-[var(--pink)] font-semibold">{m.earn}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
