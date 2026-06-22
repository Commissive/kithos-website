/**
 * Build public/og-image.png (1200×630) from footer bg + brand lockup.
 * Run: node scripts/generate-og-image.mjs
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/og-image.png");
const FOOTER_BG = path.join(ROOT, "public/hero/bg-footer2.png");
const LOCKUP = path.join(
  ROOT,
  "public/brand/lockup/lockup-horizontal-inverse.png",
);

const WIDTH = 1200;
const HEIGHT = 630;
const BONE = "#F5EFE2";
const TAGLINE = "The commercial decision layer for B2B teams.";

async function main() {
  const bgBuffer = await sharp(await readFile(FOOTER_BG))
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();

  const lockup = sharp(await readFile(LOCKUP)).resize(480, null, {
    fit: "inside",
  });
  const lockupMeta = await lockup.metadata();
  const lockupBuffer = await lockup.png().toBuffer();

  const lockupWidth = lockupMeta.width ?? 480;
  const lockupHeight = lockupMeta.height ?? 110;
  const lockupX = Math.round((WIDTH - lockupWidth) / 2);
  const lockupY = Math.round(HEIGHT * 0.38 - lockupHeight / 2);

  const taglineSvg = Buffer.from(`<svg width="${WIDTH}" height="72" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${BONE}"
    style="paint-order: stroke fill">
    ${TAGLINE}
  </text>
</svg>`);

  const taglineBuffer = await sharp(taglineSvg).png().toBuffer();
  const taglineMeta = await sharp(taglineBuffer).metadata();
  const taglineY = lockupY + lockupHeight + 28;

  await sharp(bgBuffer)
    .composite([
      { input: lockupBuffer, left: lockupX, top: lockupY },
      {
        input: taglineBuffer,
        left: Math.round((WIDTH - (taglineMeta.width ?? WIDTH)) / 2),
        top: taglineY,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  const { size } = await sharp(OUT).metadata();
  console.log(`Wrote ${OUT} (${size ?? "?"} bytes)`);
}

await main();
