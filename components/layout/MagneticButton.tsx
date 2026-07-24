"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "filled" | "ghost" | "lime";
  magnetRadius?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  variant = "filled",
  magnetRadius = 120,
  className = "",
  href,
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < magnetRadius) {
      const pull = 1 - dist / magnetRadius;
      gsap.to(btn, {
        x: dx * pull * 0.4,
        y: dy * pull * 0.4,
        duration: 0.3,
        ease: "power4.out",
      });
      if (textRef.current) {
        gsap.to(textRef.current, {
          x: dx * pull * 0.2,
          y: dy * pull * 0.2,
          duration: 0.3,
          ease: "power4.out",
        });
      }
    }
  }

  function handleMouseLeave() {
    const btn = btnRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
    }
  }

  const baseStyles = "magnetic-btn rounded-full px-8 py-4 font-display text-sm tracking-wide uppercase transition-colors";
  
  const variantStyles = {
    filled: "bg-[var(--yaa-black)] text-[var(--yaa-cream)]",
    ghost: "bg-transparent border-2 border-[var(--yaa-black)] text-[var(--yaa-black)] hover:bg-[var(--yaa-black)] hover:text-[var(--yaa-cream)]",
    lime: "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
  };

  const Tag = href ? "a" : "button";
  const linkProps = href ? { href } : {};

  return (
    <Tag
      ref={btnRef as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-hover
      {...linkProps}
    >
      <span ref={textRef} className="relative z-10 pointer-events-none">
        {children}
      </span>
    </Tag>
  );
}
