interface StoreBadgesProps {
  /** Visual scheme matching the section background. */
  scheme?: "dark" | "light";
  className?: string;
}

/**
 * App Store and Google Play badges as pure inline SVG (no PNGs).
 * "dark" renders black badges for cream sections, "light" renders
 * cream-stroked badges for the black CTA banner.
 */
export function StoreBadges({ scheme = "dark", className = "" }: StoreBadgesProps) {
  const bg = scheme === "dark" ? "var(--yaa-black)" : "transparent";
  const fg = scheme === "dark" ? "var(--yaa-cream)" : "var(--yaa-cream)";
  const stroke = scheme === "dark" ? "none" : "var(--yaa-cream)";

  /* shrink-0 + nowrap: the two-line label must never break ("Get it on" → "Get / it on"). */
  const badgeClass =
    "inline-flex h-10 lg:h-12 shrink-0 items-center gap-2 lg:gap-2.5 whitespace-nowrap rounded-xl px-3 lg:px-4 transition-transform duration-300 hover:-translate-y-0.5";

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a
        href="#download"
        aria-label="Download on the App Store"
        className={badgeClass}
        style={{ background: bg, border: stroke === "none" ? undefined : `1px solid ${stroke}` }}
      >
        <svg width="22" height="26" viewBox="0 0 22 26" fill={fg} aria-hidden="true">
          <path d="M18.1 13.7c0-3 2.5-4.5 2.6-4.6-1.4-2-3.6-2.3-4.3-2.3-1.8-.2-3.6 1.1-4.5 1.1-.9 0-2.4-1.1-3.9-1-2 0-3.9 1.2-4.9 3-2.1 3.6-.5 9 1.5 11.9 1 1.4 2.2 3 3.7 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9.9c1.6 0 2.6-1.5 3.6-2.9 1.1-1.7 1.6-3.3 1.6-3.4-.1-.1-3.2-1.3-3.2-4.7zM15.2 4.9c.8-1 1.4-2.4 1.2-3.9-1.2.1-2.7.9-3.5 1.9-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z" />
        </svg>
        <span className="flex flex-col whitespace-nowrap leading-tight" style={{ color: fg }}>
          <span className="text-[10px] font-medium">Download on the</span>
          <span className="text-base font-semibold tracking-tight">App Store</span>
        </span>
      </a>

      <a
        href="#download"
        aria-label="Get it on Google Play"
        className={badgeClass}
        style={{ background: bg, border: stroke === "none" ? undefined : `1px solid ${stroke}` }}
      >
        <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true">
          <path d="M1.5 1.2C1.2 1.6 1 2.1 1 2.8v18.4c0 .7.2 1.2.5 1.6l.1.1 10.3-10.3v-.2L1.6 1.1l-.1.1z" fill={fg} opacity="0.9" />
          <path d="M15.3 15.1l-3.4-3.5v-.2l3.4-3.4.1.1 4.1 2.3c1.2.7 1.2 1.7 0 2.4l-4.1 2.3h-.1z" fill={fg} opacity="0.65" />
          <path d="M15.4 15L11.9 11.5 1.5 21.9c.4.4 1 .4 1.8 0L15.4 15z" fill={fg} opacity="0.8" />
          <path d="M15.4 8L3.3 1.2C2.5.8 1.9.9 1.5 1.3l10.4 10.3L15.4 8z" fill={fg} />
        </svg>
        <span className="flex flex-col whitespace-nowrap leading-tight" style={{ color: fg }}>
          <span className="text-[10px] font-medium uppercase">Get it on</span>
          <span className="text-base font-semibold tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
}
