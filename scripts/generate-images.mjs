/**
 * YAA CLUB — image generation pipeline (`npm run gen:images` / `pnpm gen:images`).
 *
 * For every slot in scripts/slots.mjs:
 *   1. Calls the image model with the slot's self-authored prompt.
 *      - Default provider: Gemini image API (set GEMINI_API_KEY).
 *        Model via GEMINI_IMAGE_MODEL, default "gemini-3-pro-image-preview" (nano banana 2).
 *      - Slots flagged `textInImage` (readable UI text) use OpenAI images when
 *        OPENAI_API_KEY is set. Model via OPENAI_IMAGE_MODEL, default "gpt-image-1".
 *   2. Verifies dimensions with sharp; if aspect drifts more than ±2 %, retries with a
 *      corrective rewording (up to 2 retries), then center-crops to the exact size.
 *   3. Composites logos (public/logo/) where the slot demands it, honoring the
 *      1/2-icon-height safe area, saving a `--branded` copy alongside the raw file.
 *   4. Appends to public/images/manifest.json after every successful slot.
 *   5. A slot that fails 3 times is logged and skipped — the build is never blocked.
 *
 * Regenerate a single slot:  node scripts/generate-images.mjs --slot EVT-03
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { SLOTS } from "./slots.mjs";
import { overlayLogo, buildCreamLogoSet } from "./compose-logo.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "public", "images", "manifest.json");

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL ?? "gemini-3-pro-image-preview";
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1";

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {
    return { generatedAt: null, slots: {} };
  }
}

async function writeManifest(manifest) {
  manifest.generatedAt = new Date().toISOString();
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
}

function aspectRatio(w, h) {
  return w / h;
}

async function callGemini(prompt, width, height) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;
  const body = {
    contents: [{ parts: [{ text: `${prompt}\nTarget size: ${width}x${height} pixels.` }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error("Gemini returned no image data");
  return Buffer.from(part.inlineData.data, "base64");
}

async function callOpenAI(prompt, width, height) {
  /* OpenAI accepts fixed sizes; pick the closest, exact size is enforced by sharp after. */
  const size = width === height ? "1024x1024" : width > height ? "1536x1024" : "1024x1536";
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({ model: OPENAI_MODEL, prompt, size, n: 1 }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI returned no image data");
  return Buffer.from(b64, "base64");
}

async function generateSlot(slot, attempt) {
  const rewordings = [
    "",
    " Re-frame the exact same scene to strictly match the target aspect ratio.",
    " Same subject and light, wider framing, composition locked to the target aspect ratio.",
  ];
  const prompt = slot.prompt + rewordings[attempt];
  const useOpenAI = slot.textInImage && OPENAI_KEY;
  const raw = useOpenAI
    ? await callOpenAI(prompt, slot.width, slot.height)
    : await callGemini(prompt, slot.width, slot.height);

  const meta = await sharp(raw).metadata();
  const drift = Math.abs(
    aspectRatio(meta.width, meta.height) / aspectRatio(slot.width, slot.height) - 1
  );
  if (drift > 0.02 && attempt < 2) {
    throw new Error(`aspect drift ${(drift * 100).toFixed(1)}% at ${meta.width}x${meta.height}`);
  }

  const outPath = path.join(ROOT, slot.out);
  const pipeline = sharp(raw).resize(slot.width, slot.height, { fit: "cover", position: "attention" });
  if (slot.out.endsWith(".png")) {
    await pipeline.png().toFile(outPath);
  } else {
    await pipeline.jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
  }
  return outPath;
}

async function main() {
  const only = process.argv.includes("--slot")
    ? process.argv[process.argv.indexOf("--slot") + 1]
    : null;

  if (!GEMINI_KEY && !OPENAI_KEY) {
    console.error(
      "No GEMINI_API_KEY or OPENAI_API_KEY set.\n" +
        "Set a key to generate photography, e.g.  GEMINI_API_KEY=... npm run gen:images\n" +
        "The site currently runs on the curated library images prepared by prepare-images.mjs."
    );
    process.exitCode = 1;
    return;
  }

  await buildCreamLogoSet(ROOT);
  const manifest = await readManifest();
  const failures = [];

  for (const slot of SLOTS) {
    if (only && slot.id !== only) continue;
    let done = false;
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
      try {
        console.log(`[${slot.id}] attempt ${attempt + 1} → ${slot.width}x${slot.height}`);
        const outPath = await generateSlot(slot, attempt);

        let brandedFile = null;
        if (slot.overlayLogo) {
          const branded = outPath.replace(/\.(jpe?g|png)$/i, "--branded.$1");
          await overlayLogo(outPath, path.join(ROOT, slot.overlayLogo.logo), branded, {
            anchor: slot.overlayLogo.anchor,
          });
          brandedFile = path.relative(ROOT, branded).replaceAll("\\", "/");
        }

        manifest.slots[slot.id] = {
          slot: slot.id,
          prompt: slot.prompt,
          size: `${slot.width}x${slot.height}`,
          file: slot.out.replaceAll("\\", "/"),
          branded: brandedFile,
          source: "generated",
        };
        await writeManifest(manifest);
        console.log(`[${slot.id}] saved ${slot.out}`);
        done = true;
      } catch (err) {
        console.warn(`[${slot.id}] attempt ${attempt + 1} failed: ${err.message}`);
        if (attempt === 2) failures.push(slot.id);
      }
    }
  }

  if (failures.length > 0) {
    console.warn(`Slots skipped after 3 attempts: ${failures.join(", ")}`);
  } else {
    console.log("All requested slots generated.");
  }
}

main();
