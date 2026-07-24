"use client";

import { useEffect, useRef, useState } from "react";
import { Users, CalendarDays, HeartHandshake, Star, Globe2 } from "lucide-react";
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

function formatValue(value: number) {
  return value >= 1000 ? value.toLocaleString("en-US") : String(value);
}

/** rAF count-up: 1.2s, power2.out equivalent easing. */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
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

    const duration = 1200;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) * (1 - p);
      el.textContent = formatValue(Math.round(target * eased)) + suffix;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="relative z-20 bg-[var(--yaa-white)] px-4 md:px-8">
      <div className="mx-auto -mt-12 max-w-[1200px] rounded-[28px] border border-[var(--yaa-ink-08)] bg-[var(--yaa-white)] shadow-[0_24px_60px_var(--yaa-ink-08)] lg:-mt-14">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-6 py-9 md:grid-cols-3 md:px-10 lg:grid-cols-5">
          {STATS.map((stat, i) => {
            const Icon = ICONS[stat.icon];
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${CHIP_TONES[i % CHIP_TONES.length]}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-2xl leading-none md:text-3xl">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-[var(--yaa-ink-60)]">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
