"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  /** Seconds added before the default entrance. */
  delay?: number;
  className?: string;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number;
}

/**
 * Default entrance: opacity 0 to 1, y 24 to 0, 0.9s power4.out,
 * fired when the element enters the viewport. Instant under reduced motion.
 */
export function Reveal({ children, delay = 0, className = "", stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : el;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "power4.out",
            stagger: stagger ?? 0,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0 });
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
