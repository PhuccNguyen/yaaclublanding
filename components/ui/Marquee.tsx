import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

/** Infinite left-scrolling band. Content is duplicated once for the loop seam. */
export function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div className="marquee-left inline-flex items-center gap-10 will-change-transform">
        <div className="inline-flex items-center gap-10">{children}</div>
        <div className="inline-flex items-center gap-10">{children}</div>
      </div>
    </div>
  );
}
