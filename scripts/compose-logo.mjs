/**
 * Logo compositing helpers (sharp).
 *
 * Brand rules implemented here:
 *  - Logos are NEVER redrawn: every output starts from the original PNGs in public/logo/.
 *  - Inverted variants are produced by filling the original alpha mask with brand cream
 *    (dest-in blend), so the geometry stays byte-identical to the source mark.
 *  - Safe area (guideline B4): clear space of 1/2 the icon height on all four sides.
 */

import sharp from "sharp";
import path from "node:path";

/* Brand colors — kept as RGB here because CSS variables do not exist in Node. */
const CREAM = { r: 250, g: 255, b: 162, alpha: 1 };
const LIME = { r: 210, g: 255, b: 0, alpha: 1 };

/** Fill a black-on-transparent logo PNG with a solid brand color, keeping its alpha mask. */
export async function tintLogo(srcPath, outPath, color) {
  const src = sharp(srcPath);
  const meta = await src.metadata();
  await sharp({
    create: { width: meta.width, height: meta.height, channels: 4, background: color },
  })
    .composite([{ input: srcPath, blend: "dest-in" }])
    .png()
    .toFile(outPath);
  return outPath;
}

/** Backwards-compatible cream tint. */
export async function tintLogoCream(srcPath, outPath) {
  return tintLogo(srcPath, outPath, CREAM);
}

/**
 * Composite a logo onto an image, respecting the safe-area rule.
 * anchor: "top-right" | "top-left" | "bottom-right" | "bottom-left"
 * logoHeightRatio: logo height relative to the target image height.
 */
export async function overlayLogo(imagePath, logoPath, outPath, options = {}) {
  const { anchor = "top-right", logoHeightRatio = 0.16 } = options;

  const image = sharp(imagePath);
  const { width: W, height: H } = await image.metadata();

  const logoH = Math.round(H * logoHeightRatio);
  const logoBuf = await sharp(logoPath).resize({ height: logoH }).png().toBuffer();
  const { width: logoW } = await sharp(logoBuf).metadata();

  /* Safe area: half the icon height of clear space toward every edge. */
  const margin = Math.round(logoH / 2);

  const left = anchor.endsWith("left") ? margin : W - logoW - margin;
  const top = anchor.startsWith("top") ? margin : H - logoH - margin;

  await image
    .composite([{ input: logoBuf, left, top }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);
  return outPath;
}

/** Produce the tinted logo variants (cream inverted + lime accent) next to the originals. */
export async function buildCreamLogoSet(root) {
  const logoDir = path.join(root, "public", "logo");
  const creamJobs = [
    ["yaa-icon.png", "yaa-icon-cream.png"],
    ["yaa-lockup-vertical.png", "yaa-lockup-vertical-cream.png"],
    ["yaa-lockup-horizontal.png", "yaa-lockup-horizontal-cream.png"],
  ];
  for (const [src, out] of creamJobs) {
    await tintLogo(path.join(logoDir, src), path.join(logoDir, out), CREAM);
  }
  /* Lime accent lockup, used on the dark footer per the brand mockup. */
  await tintLogo(
    path.join(logoDir, "yaa-lockup-vertical.png"),
    path.join(logoDir, "yaa-lockup-vertical-lime.png"),
    LIME
  );
}
