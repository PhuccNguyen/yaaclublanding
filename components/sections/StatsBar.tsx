"use client";

import { useRef, useEffect, useState } from "react";
import { Users, CalendarDays, HeartHandshake, Star, Globe2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { STATS } from "@/lib/events";

const ICONS = {
  users: Users,
  calendar: CalendarDays,
  people: HeartHandshake,
  star: Star,
  globe: Globe2,
} as const;

const CHIP_TONES = [
  "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
  "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-red)] text-[var(--yaa-off)]",
  "bg-[var(--yaa-cream)] text-[var(--yaa-black)]",
  "bg-[var(--yaa-black)] text-[var(--yaa-lime)]",
];

function formatValue(v: number) {
  return v >= 1000 ? v.toLocaleString("en-US") : String(v);
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatValue(target) + suffix;
      return;
    }
    let raf = 0;
    const dur = 1300;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = formatValue(Math.round(target * (1 - (1 - p) * (1 - p)))) + suffix;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = cardRef.current?.querySelectorAll(".stat-item");
    if (!items?.length) return;
    gsap.from(items, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: cardRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="bg-[var(--yaa-white)] px-6 py-10 md:px-10 md:py-12"
    >
      <div className="mx-auto max-w-[1200px]">
        <div
          ref={cardRef}
          className="rounded-2xl border border-[var(--yaa-ink-08)] bg-[var(--yaa-white)] px-6 py-6 shadow-[0_8px_28px_var(--yaa-ink-08)] md:px-10 md:py-8"
        >
          {/* 2 cols → 3 cols → flex row with dividers */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:flex lg:items-center lg:divide-x lg:divide-[var(--yaa-ink-08)]">
            {STATS.map((stat, i) => {
              const Icon = ICONS[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="stat-item flex items-center gap-3 lg:flex-1 lg:px-6 first:lg:pl-0 last:lg:pr-0"
                >
                  {/* Compact icon chip */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${CHIP_TONES[i % CHIP_TONES.length]}`}
                  >
                    <Icon size={14} aria-hidden="true" />
                  </span>

                  {/* Number + label stacked */}
                  <div className="min-w-0">
                    <p className="font-display text-xl leading-none md:text-2xl">
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
  );
}
