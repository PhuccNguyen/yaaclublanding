"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/**
 * Pointer-driven 3D tilt. Writes --rx / --ry consumed by .tilt-hover in
 * globals.css. No-ops on touch and under reduced motion.
 */
export function Tilt({ children, className = "", max = 9 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      "--ry": `${px * max}deg`,
      "--rx": `${-py * max}deg`,
      duration: 0.4,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { "--ry": "0deg", "--rx": "0deg", duration: 0.6, ease: "power3.out" });
  }

  return (
    <div
      ref={ref}
      className={`tilt-hover ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
