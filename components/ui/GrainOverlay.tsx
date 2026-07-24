/** Fixed film-grain wash, 0.04 opacity (set in globals.css). */
export function GrainOverlay() {
  return (
    <svg className="grain-overlay" width="100%" height="100%" aria-hidden="true">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves={4}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
