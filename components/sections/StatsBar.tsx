"use client";

import { useRef, useEffect } from "react";
import { Users, CalendarDays, HeartHandshake, Star, Globe2 } from "lucide-react";
import { STATS } from "@/lib/events";

/* ─── Static data ─────────────────────────────────────── */

const ICONS = {
  users:    Users,
  calendar: CalendarDays,
  people:   HeartHandshake,
  star:     Star,
  globe:    Globe2,
} as const;

const CHIP_TONES = [
  "bg-[var(--yaa-lime)]   text-[var(--yaa-black)]",
  "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-red)]    text-[var(--yaa-off)]",
  "bg-[var(--yaa-cream)]  text-[var(--yaa-black)]",
  "bg-[var(--yaa-black)]  text-[var(--yaa-lime)]",
];

/* ─── Helpers ─────────────────────────────────────────── */

function fmt(v: number) {
  return v >= 1000 ? v.toLocaleString("en-US") : String(v);
}

/**
 * Pure rAF count-up — zero useState → zero parent re-renders.
 * Starts only once when the span enters the viewport.
 */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = fmt(target) + suffix;
        return;
      }
      const dur = 1300;
      const t0  = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = fmt(Math.round(target * (1 - (1 - p) * (1 - p)))) + suffix;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { run(); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [target, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

/* ─── StatsBar ────────────────────────────────────────── */

export function StatsBar() {
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * CSS-only entrance: add the `stats-visible` class when the card
   * enters the viewport. The keyframe animation runs per-item via
   * nth-child delay — no GSAP, no opacity:0 risk.
   */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { card.classList.add("stats-visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Scoped keyframe — no extra CSS file needed */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .stats-card .stat-item {
            opacity: 0;
            transform: translateY(18px);
          }
          .stats-card.stats-visible .stat-item {
            animation: stat-in 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
          }
          .stats-card.stats-visible .stat-item:nth-child(1) { animation-delay: 0ms; }
          .stats-card.stats-visible .stat-item:nth-child(2) { animation-delay: 80ms; }
          .stats-card.stats-visible .stat-item:nth-child(3) { animation-delay: 160ms; }
          .stats-card.stats-visible .stat-item:nth-child(4) { animation-delay: 240ms; }
          .stats-card.stats-visible .stat-item:nth-child(5) { animation-delay: 320ms; }
          @keyframes stat-in {
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <section
        id="stats"
        className="bg-[var(--yaa-white)] px-6 py-10 md:px-10 md:py-12"
      >
        <div className="mx-auto max-w-[1200px]">
          <div
            ref={cardRef}
            className="stats-card rounded-2xl border border-[var(--yaa-ink-08)] bg-[var(--yaa-white)] px-6 py-6 shadow-[0_8px_28px_var(--yaa-ink-08)] md:px-10 md:py-8"
          >
            {/* 2 cols → 3 cols (md) → flex row with dividers (lg) */}
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:flex lg:items-center lg:divide-x lg:divide-[var(--yaa-ink-08)]">
              {STATS.map((stat, i) => {
                const Icon = ICONS[stat.icon];
                return (
                  <div
                    key={stat.label}
                    className="stat-item flex items-center gap-3 lg:flex-1 lg:px-6 first:lg:pl-0 last:lg:pr-0"
                  >
                    {/* Compact colour chip */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${CHIP_TONES[i % CHIP_TONES.length]}`}
                    >
                      <Icon size={14} aria-hidden="true" />
                    </span>

                    {/* Number + label — explicit text-color, no inheritance risk */}
                    <div className="min-w-0">
                      <p className="font-display text-xl leading-none text-[var(--yaa-black)] md:text-2xl">
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-widest text-[var(--yaa-ink-60)]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
