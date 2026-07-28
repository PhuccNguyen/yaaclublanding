"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max extra rotation from the cursor, in degrees. */
  max?: number;
  /** Resting tilt so the element reads 3D even before hover. */
  baseRx?: number;
  baseRy?: number;
}

/**
 * Pointer-driven 3D tilt around a resting pose. Uses gsap.quickTo for smooth,
 * GC-friendly updates (per the GSAP React skill) and writes --rx / --ry, which
 * .tilt-hover consumes in globals.css. No-ops on touch and reduced motion.
 */
export function Tilt({
  children,
  className = "",
  max = 8,
  baseRx = 0,
  baseRy = 0,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setRx = useRef<((v: number) => void) | null>(null);
  const setRy = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { "--rx": `${baseRx}deg`, "--ry": `${baseRy}deg` });
    setRx.current = gsap.quickTo(el, "--rx", { duration: 0.5, ease: "power3.out" });
    setRy.current = gsap.quickTo(el, "--ry", { duration: 0.5, ease: "power3.out" });
  }, [baseRx, baseRy]);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || !setRx.current || !setRy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setRy.current(baseRy + px * max);
    setRx.current(baseRx - py * max);
  }

  function handleLeave() {
    setRx.current?.(baseRx);
    setRy.current?.(baseRy);
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
