"use client";

import { useRef, useEffect, useState } from "react";
import { Users, CalendarDays, HeartHandshake, Star, Globe2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STATS } from "@/lib/events";

/* ─── Icon map ─── */
const ICONS = {
  users: Users,
  calendar: CalendarDays,
  people: HeartHandshake,
  star: Star,
  globe: Globe2,
} as const;

/* ─── One colour per stat chip (lime → purple → red → cream → black) ─── */
const CHIP_TONES = [
  "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
  "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-red)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-cream)] text-[var(--yaa-black)]",
  "bg-[var(--yaa-black)] text-[var(--yaa-lime)]",
];

function formatValue(value: number) {
  return value >= 1000 ? value.toLocaleString("en-US") : String(value);
}

/** Viewport-aware count-up with rAF + power2.out easing (1.4 s). */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setStarted(true); observer.disconnect(); }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatValue(target) + suffix;
      return;
    }
    const duration = 1400;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) * (1 - p); // power2.out
      el.textContent = formatValue(Math.round(target * eased)) + suffix;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);

  /* GSAP stagger — each stat slides up on scroll enter */
  useGSAP(() => {
    const items = cardRef.current?.querySelectorAll(".stat-item");
    if (!items?.length) return;

    gsap.from(items, {
      y: 36,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
      stagger: 0.09,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="bg-[var(--yaa-white)] px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          ref={cardRef}
          className={[
            "rounded-[28px] border border-[var(--yaa-ink-08)]",
            "bg-[var(--yaa-white)]",
            "px-8 py-10 md:px-10 md:py-12",
            "shadow-[0_20px_56px_var(--yaa-ink-08)]",
          ].join(" ")}
        >
          {/*
           * Layout:
           *  mobile  → 2-column grid with row gaps
           *  md      → 3-column grid
           *  lg+     → single flex row with divide-x dividers
           */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:flex lg:items-stretch lg:divide-x lg:divide-[var(--yaa-ink-08)]">
            {STATS.map((stat, i) => {
              const Icon = ICONS[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="stat-item flex flex-col justify-center gap-3 lg:flex-1 lg:px-8 first:lg:pl-0 last:lg:pr-0"
                >
                  {/* Coloured icon chip */}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${CHIP_TONES[i % CHIP_TONES.length]}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>

                  {/* Number + label */}
                  <div>
                    <p className="font-display text-3xl leading-none md:text-4xl">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--yaa-ink-60)]">
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
  );
}
