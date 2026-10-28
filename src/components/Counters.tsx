"use client";

import { useEffect, useRef, useState } from "react";

type Item = {
  /** Valeurs finales. Ex : [2011] ou [24, 7] (affiché 24/7) */
  to: number[];
  /** Valeurs de départ de l'animation (même taille que "to"). Par défaut : 0 */
  from?: number[];
  suffix?: string;
  label: string;
};

// Compteurs qui défilent quand la section devient visible.
// Le HTML contient déjà les vraies valeurs (utile pour Google et si JavaScript est coupé).
export function Counters({ items, title }: { items: Item[]; title: string }) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1800);
          setProgress(1 - Math.pow(1 - p, 3)); // ralentit vers la fin
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setProgress(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} aria-label={title} className="border-y border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col gap-1.5 px-6 py-10 ${i % 2 === 0 ? "border-r border-white/10" : ""} ${
              i < items.length - 2 ? "border-b border-white/10 lg:border-b-0" : ""
            } ${i < items.length - 1 ? "lg:border-r lg:border-white/10" : "lg:border-r-0"}`}
          >
            <span className="font-display text-5xl font-extrabold leading-none sm:text-6xl">
              {item.to.map((end, k) => {
                const start = item.from?.[k] ?? 0;
                const value = Math.round(start + (end - start) * progress);
                return (
                  <span key={k}>
                    {k > 0 && <span className="text-leaf">/</span>}
                    <span className={k > 0 ? "text-[#7FE09E]" : ""}>{value}</span>
                  </span>
                );
              })}
              {item.suffix && <span className="ml-2 text-3xl text-[#7FE09E]">{item.suffix}</span>}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8C6E6] sm:text-sm">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
