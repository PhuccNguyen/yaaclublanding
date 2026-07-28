/**
 * YAA CLUB — image slot registry.
 * Single source of truth shared by generate-images.mjs and prepare-images.mjs.
 *
 * Every prompt is self-authored per the art direction:
 * cream backdrop, editorial sports photography (Nike x Kinfolk), real diverse
 * athletes (majority Southeast Asian), lime or red accent piece, film warmth.
 * All sizes are @2x retina, rounded to the nearest 8 px.
 */

const NEGATIVE =
  "Negative: no visible brand logos, no on-image text or lettering, no watermarks, " +
  "no extra fingers or malformed hands, no oversaturated HDR look, no plastic AI skin.";

export const SLOTS = [
  {
    id: "HERO-01",
    out: "public/images/hero-01-athlete-left.jpg",
    width: 1440,
    height: 1800,
    library: { src: "public/images/_library/community_grid_2.png", position: "east" },
    prompt:
      "Editorial sports portrait, 85mm lens at f/2.0, soft window light from camera left. " +
      "A Southeast Asian woman in her late twenties laughing mid-breath after a pickleball " +
      "session, holding a clear water bottle near her shoulder. Matte cream seamless studio " +
      "backdrop, warm tone. Wardrobe: sand-toned athletic tank, one neon lime wristband as " +
      "the only accent. Light sweat sheen, genuine joy, 35mm film warmth, fine grain. " +
      NEGATIVE,
  },
  {
    id: "HERO-02",
    out: "public/images/hero-02-phone-discover.png",
    width: 1200,
    height: 1600,
    optional: true,
    textInImage: true,
    library: null,
    prompt:
      "Product render of an iPhone 15 Pro in titanium black, straight-on, floating over a " +
      "cream studio background, soft top softbox with gentle floor shadow. The screen shows " +
      "a sports community app Discover page: white cards, a search bar, category chips " +
      "reading Pickleball, Padel, Yoga, Basketball, and a Recommended Clubs list with photo " +
      "thumbnails. Clean flat UI, lime accent buttons, black text on white. " +
      "Negative: no watermarks, no distorted glyphs outside the listed labels.",
  },
  {
    id: "HERO-03",
    out: "public/images/hero-03-runner.jpg",
    width: 1440,
    height: 1800,
    library: { src: "public/images/_library/runclub.png", position: "attention" },
    prompt:
      "Editorial athletics photograph, 135mm at f/2.8, golden hour rim light with a warm " +
      "cream sky backdrop. A Southeast Asian male sprinter mid-stride, full extension, " +
      "sharp focus on the face, slight motion blur on trailing foot. Wardrobe: charcoal " +
      "running shorts, neon lime racing singlet as the single accent color. Track surface " +
      "in warm neutral tone, long shadow, film grain, Nike x Kinfolk mood. " +
      NEGATIVE,
  },
  {
    id: "HERO-04",
    out: "public/images/hero-04-eveninghoops-card.jpg",
    width: 960,
    height: 600,
    library: { src: "public/images/_library/community_grid_1.png", position: "attention" },
    prompt:
      "Indoor basketball action photograph for a small event card, 35mm at f/1.8, dramatic " +
      "warm side-light from gym windows at dusk. Two players mid-layup, dark background " +
      "with pools of light, one wears a neon lime sleeve. Composition leaves the lower " +
      "third calmer for UI text overlay. Editorial, grainy, kinetic. " +
      NEGATIVE,
  },
  {
    id: "EVT-01",
    out: "public/images/weekend-padel-social.jpg",
    width: 960,
    height: 640,
    library: { src: "public/images/_library/pickleball.png", position: "attention" },
    prompt:
      "Four friends laughing between points on a padel court at dusk, 50mm at f/2.0, " +
      "warm floodlights mixing with blue hour sky. Mixed ages, majority Southeast Asian. " +
      "Wardrobe neutrals with one red cap and one lime towel as accents. Genuine laughter, " +
      "sweat, film warmth, editorial framing with the net leading diagonally. " +
      NEGATIVE,
  },
  {
    id: "EVT-02",
    out: "public/images/sunrise-long-run.jpg",
    width: 960,
    height: 640,
    library: { src: "public/images/_library/runclub.png", position: "centre" },
    prompt:
      "Group of runners silhouetted against sunrise mist on an empty boulevard, 35mm at " +
      "f/4, backlit golden fog, long soft shadows toward camera. Six silhouettes of mixed " +
      "builds mid-stride, breath vapor visible. Warm amber palette that harmonizes with a " +
      "cream page background, heavy atmosphere, fine grain. " +
      NEGATIVE,
  },
  {
    id: "EVT-03",
    out: "public/images/sunset-yoga-flow.jpg",
    width: 960,
    height: 640,
    library: { src: "public/images/_library/yoga.png", position: "centre" },
    prompt:
      "Rooftop yoga class in warrior two pose, a row of five practitioners in profile, " +
      "50mm at f/2.8, golden hour sun flaring softly behind the furthest person. Southeast " +
      "Asian city skyline out of focus. Wardrobe: warm neutrals, one lime mat as accent. " +
      "Calm, editorial, warm film tone. " +
      NEGATIVE,
  },
  {
    id: "EVT-04",
    out: "public/images/evening-hoops.jpg",
    width: 960,
    height: 640,
    library: { src: "public/images/_library/strength.png", position: "attention" },
    prompt:
      "Indoor basketball pickup game, 85mm at f/2.0, dramatic single side-light cutting " +
      "across a dark court, dust visible in the beam. A Southeast Asian player rising for " +
      "a jump shot, defender stretching. Deep shadows, warm highlight tone, one red " +
      "headband accent. Grainy, cinematic, mid-action. " +
      NEGATIVE,
  },
  {
    id: "EVT-05",
    out: "public/images/friday-night-football.jpg",
    width: 960,
    height: 640,
    library: { src: "public/images/_library/community.png", position: "centre" },
    prompt:
      "Five-a-side football under floodlights on a Friday night, 35mm at f/2.8, 1/60s " +
      "shutter for slight motion blur on the ball carrier. Wet pitch reflecting the " +
      "floodlights, mixed Southeast Asian players, one lime bib over neutral kit. " +
      "Electric, warm-on-dark palette, film grain. " +
      NEGATIVE,
  },
  {
    id: "CTA-01",
    out: "public/images/cta-01-hoop.jpg",
    width: 2400,
    height: 1040,
    library: { src: "public/images/_library/strength.png", position: "attention", darken: true },
    overlayLogo: {
      logo: "public/logo/yaa-icon-cream.png",
      anchor: "top-right",
    },
    prompt:
      "Low-angle photograph of an outdoor basketball hoop against a near-black night sky, " +
      "24mm at f/5.6, a single warm floodlight from below left. The backboard edge is " +
      "splashed with neon lime paint, graffiti energy, paint drips frozen mid-air. Mostly " +
      "dark negative space on the left two thirds for headline text. High contrast, " +
      "gritty, editorial. " +
      NEGATIVE,
  },
  {
    /* Cut-out hero figure (center). Transparent PNG so it floats on the cream hero. */
    id: "HERO-WOMAN-CUT",
    out: "public/images/hero-woman.png",
    width: 1200,
    height: 1600,
    transparent: true,
    prompt:
      "Full-body studio cut-out of a Southeast Asian woman athlete in her late twenties, " +
      "laughing with her head tilted back mid-joy, one hand holding a frosted white water " +
      "bottle near her hip. Wardrobe: clean white sports bra crop top and warm " +
      "terracotta/rust high-waist leggings, minimal jewelry. Dynamic candid posture, " +
      "slight lean, natural gym lighting, soft shadow, 85mm f/2.0, editorial sports look, " +
      "subtle film grain. Isolated on a fully TRANSPARENT background (PNG alpha); if " +
      "transparency is unavailable use a pure flat #FFFFFF background with clean edges. " +
      NEGATIVE,
  },
  {
    /* Cut-out hero figure (right). Transparent PNG, dynamic sprint. */
    id: "HERO-RUNNER-CUT",
    out: "public/images/hero-runner.png",
    width: 1200,
    height: 1600,
    transparent: true,
    prompt:
      "Full-body studio cut-out of a Southeast Asian man mid-sprint, full stride extension, " +
      "leaning into the run, focused expression. Wardrobe: fitted black athletic tee, black " +
      "running shorts, white-and-black running shoes. Frozen motion, crisp edges, natural " +
      "daylight, soft contact shadow, 135mm f/2.8, editorial athletics look, subtle film " +
      "grain. Isolated on a fully TRANSPARENT background (PNG alpha); if transparency is " +
      "unavailable use a pure flat #FFFFFF background with clean edges. " +
      NEGATIVE,
  },
  {
    id: "SOON-BG",
    out: "public/images/coming-soon-bg.jpg",
    width: 2560,
    height: 1440,
    library: { src: "public/images/_library/runclub.png", position: "attention", darken: true },
    prompt:
      "Wide cinematic sports photograph for a full-bleed hero background, 24mm at f/4, " +
      "blue-hour city run with warm street lights, motion blur on a group of runners. " +
      "Deep shadows and rich negative space so light overlay text stays legible. " +
      "Moody, editorial, warm-on-dark palette, fine grain. " +
      NEGATIVE,
  },
];
