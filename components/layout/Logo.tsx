import Image from "next/image";
import { LOGOS, LOGO_RATIO } from "@/lib/image-manifest";

type LogoVariant = "standard" | "inverted" | "icon";
type LogoOrientation = "horizontal" | "vertical";

interface LogoProps {
  variant?: LogoVariant;
  orientation?: LogoOrientation;
  /** Rendered height in CSS pixels. */
  height?: number;
  /** Enforce the brand clear-space rule: 1/2 icon cap height on all sides. */
  safe?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * The only sanctioned way to render the Yaa Club mark.
 * Always uses the original PNG artwork (public/logo/), never re-typeset.
 */
export function Logo({
  variant = "standard",
  orientation = "horizontal",
  height = 32,
  safe = false,
  className = "",
  priority = false,
}: LogoProps) {
  const isIcon = variant === "icon";
  const inverted = variant === "inverted";

  const src = isIcon
    ? inverted
      ? LOGOS.iconCream
      : LOGOS.icon
    : orientation === "horizontal"
      ? inverted
        ? LOGOS.lockupHorizontalCream
        : LOGOS.lockupHorizontal
      : inverted
        ? LOGOS.lockupVerticalCream
        : LOGOS.lockupVertical;

  const ratio = isIcon
    ? LOGO_RATIO.icon
    : orientation === "horizontal"
      ? LOGO_RATIO.horizontal
      : LOGO_RATIO.vertical;

  const width = Math.round(height * ratio);

  /* Clear space: half the icon cap height. In the vertical lockup the icon is
     roughly 60% of total height; elsewhere the icon spans the full height. */
  const iconHeight =
    !isIcon && orientation === "vertical" ? height * 0.6 : height;
  const pad = safe ? Math.round(iconHeight / 2) : 0;

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={pad ? { padding: pad } : undefined}
    >
      <Image
        src={src}
        alt="Yaa Club"
        width={width}
        height={height}
        priority={priority}
        style={{ width, height, objectFit: "contain" }}
      />
    </span>
  );
}
