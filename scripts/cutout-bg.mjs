/**
 * YAA CLUB — white-studio background key-out (`npm run cutout`).
 *
 * The hero figures ship on a flat white studio background. A naive
 * brightness threshold would also erase the white sports bra, the water
 * bottle and the white shoe soles. Instead we FLOOD-FILL from the image
 * borders: only near-white pixels connected to an edge become transparent,
 * so interior whites (clothing, props) are preserved.
 *
 * A light blur on the alpha channel feathers the cut edge to avoid halos.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* A pixel counts as background if every channel is very light (white / pale grey). */
const LIGHT = 205;

const JOBS = [
  ["public/images/hero-woman.png", "public/images/hero-woman-cut.png"],
  ["public/images/hero-runner.png", "public/images/hero-runner-cut.png"],
];

function isLight(data, i) {
  return data[i] >= LIGHT && data[i + 1] >= LIGHT && data[i + 2] >= LIGHT;
}

async function keyOut(srcRel, outRel) {
  const src = path.join(ROOT, srcRel);
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: W, height: H, channels } = info;
  const bg = new Uint8Array(W * H); // 1 = background (flood-reached)
  const stack = [];

  const pushIfLight = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (bg[p]) return;
    if (isLight(data, p * channels)) {
      bg[p] = 1;
      stack.push(p);
    }
  };

  /* Seed from every border pixel. */
  for (let x = 0; x < W; x++) {
    pushIfLight(x, 0);
    pushIfLight(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    pushIfLight(0, y);
    pushIfLight(W - 1, y);
  }

  /* 4-connected flood fill. */
  while (stack.length) {
    const p = stack.pop();
    const x = p % W;
    const y = (p - x) / W;
    pushIfLight(x + 1, y);
    pushIfLight(x - 1, y);
    pushIfLight(x, y + 1);
    pushIfLight(x, y - 1);
  }

  /* Base alpha: 0 for flood-reached background, 255 for the subject. */
  const alpha = new Uint8Array(W * H);
  let cleared = 0;
  for (let p = 0; p < W * H; p++) {
    if (bg[p]) cleared++;
    else alpha[p] = 255;
  }

  /* Feather: 3x3 box blur of the alpha mask to soften the cut edge (no halo). */
  const soft = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let sum = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          sum += alpha[ny * W + nx];
          n++;
        }
      }
      soft[y * W + x] = Math.round(sum / n);
    }
  }

  /* Write the softened alpha back into the RGBA buffer and save once. */
  for (let p = 0; p < W * H; p++) {
    data[p * channels + 3] = soft[p];
  }

  await sharp(data, { raw: { width: W, height: H, channels } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, outRel));

  const pct = ((cleared / (W * H)) * 100).toFixed(1);
  console.log(`[cutout] ${outRel} — ${W}x${H}, ${pct}% background removed`);
}

for (const [src, out] of JOBS) {
  await keyOut(src, out);
}
console.log("Done. Cut-outs saved next to the originals.");
