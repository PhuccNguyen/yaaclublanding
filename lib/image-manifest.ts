/**
 * Typed view over the image slot pipeline (scripts/slots.mjs + manifest.json).
 * Components import paths from here so a regenerated slot never touches JSX.
 */

export const IMAGES = {
  heroAthlete: "/images/hero-01-athlete-left.jpg",
  heroRunner: "/images/hero-03-runner.jpg",
  heroEventCard: "/images/hero-04-eveninghoops-card.jpg",
  evtPadel: "/images/weekend-padel-social.jpg",
  evtRun: "/images/sunrise-long-run.jpg",
  evtYoga: "/images/sunset-yoga-flow.jpg",
  evtHoops: "/images/evening-hoops.jpg",
  evtFootball: "/images/friday-night-football.jpg",
  ctaBanner: "/images/cta-01-hoop--branded.jpg",
  comingSoonBg: "/images/coming-soon-bg.jpg",
} as const;

export const LOGOS = {
  lockupVertical: "/logo/yaa-lockup-vertical.png",
  lockupHorizontal: "/logo/yaa-lockup-horizontal.png",
  icon: "/logo/yaa-icon.png",
  lockupVerticalCream: "/logo/yaa-lockup-vertical-cream.png",
  lockupHorizontalCream: "/logo/yaa-lockup-horizontal-cream.png",
  iconCream: "/logo/yaa-icon-cream.png",
} as const;

/* Intrinsic aspect ratios of the original marks (width / height). */
export const LOGO_RATIO = {
  vertical: 2904 / 3335,
  horizontal: 7117 / 3335,
  icon: 3299 / 3335,
} as const;

export interface ManifestEntry {
  slot: string;
  prompt: string;
  size: string;
  file: string;
  branded: string | null;
  source: "library" | "generated";
}

export interface ImageManifest {
  generatedAt: string | null;
  slots: Record<string, ManifestEntry>;
}
