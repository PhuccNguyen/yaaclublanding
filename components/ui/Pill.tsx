import type { ReactNode } from "react";

type PillColor = "lime" | "red" | "purple" | "black" | "cream";

interface PillProps {
  children: ReactNode;
  color?: PillColor;
  className?: string;
}

const COLOR_CLASSES: Record<PillColor, string> = {
  lime: "bg-[var(--yaa-lime)] text-[var(--yaa-black)]",
  red: "bg-[var(--yaa-red)] text-[var(--yaa-off)]",
  purple: "bg-[var(--yaa-purple)] text-[var(--yaa-off)]",
  black: "bg-[var(--yaa-black)] text-[var(--yaa-cream)]",
  cream: "bg-[var(--yaa-cream)] text-[var(--yaa-black)]",
};

export function Pill({ children, color = "lime", className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${COLOR_CLASSES[color]} ${className}`}
    >
      {children}
    </span>
  );
}
