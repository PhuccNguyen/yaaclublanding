# Yaa Club — Marketing Landing Page

Production Next.js 16 (App Router, Turbopack) landing page for Yaa Club:
"Wellbeing that works. Play. Connect. Grow."

## Quick start

```bash
npm install        # or pnpm install
npm run dev        # http://localhost:3000
npm run build      # production build (passes with zero warnings)
```

## Design framework

The build follows the taste-skill / anti-slop v2 rules restated in the project
brief, with these dial values:

| Dial | Value | Where it shows |
| --- | --- | --- |
| DESIGN_VARIANCE | 7 | Offset hero grid (45/30/25), rotated event card and role chips, staggered event grid |
| MOTION_INTENSITY | 8 | Lenis smooth scroll, SplitText masked headline, parallax scrubs, magnetic buttons, scribble draw-in |
| VISUAL_DENSITY | 6 | Spacious hero, denser stats band and 5-up events grid |

Hard bans honored: no em-dashes in body copy, no centered SaaS hero, no
gradient blobs, no Lorem Ipsum, no placeholder `src`. Grep the repo for `#`
outside `app/globals.css`: zero hits in app code.

## Brand system

Extracted from `YAA_CLUB_BRANDGUIDELINES` (see `Downloads/Yaclub`):

- Palette lives exclusively in `app/globals.css` as CSS variables
  (`--yaa-cream #FAFFA2`, `--yaa-black #0A0A0A`, `--yaa-lime #D2FF00`,
  `--yaa-red #FF5722`, `--yaa-purple #635BCE`, `--yaa-off #F6F5EE`).
  Note: the purple is `#635BCE` per guideline page 8 (the brief's `#6353CD`
  was a transcription drift; the guideline wins).
- Typography: Inter Tight 700/800/900 for display (tracking -0.03em,
  leading 0.95), Inter 400/500 for body, via `next/font`.
- Logos are the original PNG artwork copied verbatim into `public/logo/`.
  They are never redrawn or re-typeset. Inverted (cream) variants are produced
  programmatically by `scripts/compose-logo.mjs` (alpha-mask fill, geometry
  untouched). `<Logo variant="standard" | "inverted" | "icon" />` in
  `components/layout/Logo.tsx` is the only sanctioned way to render the mark;
  its `safe` prop enforces the half-icon-height clear space from the guideline.

## Image pipeline

Slot registry: `scripts/slots.mjs` — every slot has a self-authored prompt
(camera, lens, lighting, wardrobe, negative prompt), an exact @2x pixel size,
and an output filename. `public/images/manifest.json` logs
`{slot, prompt, size, file, source}` for every image on disk.

Two entry points:

- `npm run prep:images` — offline. Crops the curated photo library
  (`public/images/_library/`) into every slot at exact size with sharp,
  rebuilds the cream logo set, composites the CTA banner logo (safe area
  respected), rewrites the manifest with `source: "library"`. Already run;
  the site is complete without any API key.
- `npm run gen:images` — generation. Calls the image API with each slot's
  prompt (Gemini by default via `GEMINI_API_KEY`; slots flagged as containing
  readable UI text use OpenAI via `OPENAI_API_KEY`), verifies aspect within
  ±2% with sharp, retries twice with reworded prompts, never blocks the build.
  Regenerate one slot: `node scripts/generate-images.mjs --slot EVT-03`.
  After regenerating, revisit the event titles in `lib/events.ts` so copy
  keeps matching the photography.

The HERO-02 phone screen is intentionally built in code
(`components/ui/PhoneMockup.tsx`) instead of a generated screenshot so the UI
glyphs stay crisp at every density.

## Motion spec (locked)

- Entrances: opacity 0 to 1, y 24 to 0, 0.9s `power4.out` (`components/ui/Reveal.tsx`)
- Headline: SplitText by word, 120% y mask, stagger 0.06 (`Hero.tsx`)
- Stats count-up: 1.2s ease-out rAF (`StatsBar.tsx`)
- Card hover: -6px lift + soft shadow, 0.35s (`.lift-card` in globals.css)
- Magnetic buttons: 120 to 140px radius, snap-back `elastic.out(1, 0.4)`
- Scroll scrubs: `scrub: 1`, `ease: "none"` (hero parallax)
- `prefers-reduced-motion`: every tween is wrapped in `gsap.matchMedia`;
  CSS animations are disabled globally in globals.css.

## Structure

```
app/            layout.tsx (fonts, metadata) · page.tsx · globals.css
components/
  layout/       Logo · Nav · Footer · MagneticButton
  sections/     Hero · StatsBar · Features · Roles · FeaturedEvents · BigCTA
  ui/           Reveal · Pill · Marquee · Cursor · GrainOverlay · PhoneMockup · StoreBadges
lib/            gsap.ts · lenis.tsx · events.ts · image-manifest.ts
scripts/        slots.mjs · prepare-images.mjs · generate-images.mjs · compose-logo.mjs
public/logo/    original marks + programmatic cream variants
public/images/  slot outputs + manifest.json + _library/ sources
```
