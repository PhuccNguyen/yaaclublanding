/**
 * YAA CLUB — offline image preparation (`npm run prep:images`).
 *
 * Fills every slot from the curated photo library in public/images/_library/
 * so the site is complete without an image-API key:
 *   - crops each library photo to the slot's exact @2x size (sharp, attention crop)
 *   - builds the cream (inverted) logo set from the original marks
 *   - composites logos where the slot demands it (safe area respected)
 *   - records every slot in public/images/manifest.json with source: "library"
 *
 * Running `npm run gen:images` later with an API key overwrites the same files
 * with generated photography and flips the manifest source to "generated".
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { SLOTS } from "./slots.mjs";
import { overlayLogo, buildCreamLogoSet } from "./compose-logo.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "public", "images", "_library");
const MANIFEST = path.join(ROOT, "public", "images", "manifest.json");

const LIBRARY_FILES = [
  "pickleball.png",
  "runclub.png",
  "yoga.png",
  "strength.png",
  "community.png",
  "community_grid_1.png",
  "community_grid_2.png",
];

async function moveLibrary() {
  await fs.mkdir(LIB, { recursive: true });
  for (const f of LIBRARY_FILES) {
    const src = path.join(ROOT, "public", "images", f);
    const dst = path.join(LIB, f);
    try {
      await fs.access(src);
      await fs.rename(src, dst);
    } catch {
      /* already moved or absent */
    }
  }
}

async function main() {
  await moveLibrary();
  await buildCreamLogoSet(ROOT);

  const manifest = { generatedAt: new Date().toISOString(), slots: {} };

  for (const slot of SLOTS) {
    if (!slot.library) {
      console.log(`[${slot.id}] no library mapping (rendered in code) — skipped`);
      continue;
    }
    const srcPath = path.join(ROOT, slot.library.src);
    const outPath = path.join(ROOT, slot.out);

    let pipeline = sharp(srcPath).resize(slot.width, slot.height, {
      fit: "cover",
      position: slot.library.position ?? "attention",
      kernel: "lanczos3",
    });
    if (slot.library.darken) {
      pipeline = pipeline.modulate({ brightness: 0.55, saturation: 0.85 });
    }
    if (slot.out.endsWith(".png")) {
      await pipeline.png().toFile(outPath);
    } else {
      await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
    }

    let brandedFile = null;
    if (slot.overlayLogo) {
      const branded = outPath.replace(/\.(jpe?g|png)$/i, "--branded.$1");
      await overlayLogo(outPath, path.join(ROOT, slot.overlayLogo.logo), branded, {
        anchor: slot.overlayLogo.anchor,
      });
      brandedFile = path.relative(ROOT, branded).replaceAll("\\", "/");
    }

    const meta = await sharp(outPath).metadata();
    manifest.slots[slot.id] = {
      slot: slot.id,
      prompt: slot.prompt,
      size: `${meta.width}x${meta.height}`,
      file: slot.out.replaceAll("\\", "/"),
      branded: brandedFile,
      source: "library",
    };
    console.log(`[${slot.id}] ${meta.width}x${meta.height} ← ${slot.library.src}`);
  }

  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log("manifest.json written.");
}

main();
