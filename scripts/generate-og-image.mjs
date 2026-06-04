/**
 * Build public/og-image.png (1200×630) from brand lockup + tagline.
 * Run: node scripts/generate-og-image.mjs
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/og-image.png");
const LOCKUP = path.join(ROOT, "public/brand/lockup/lockup-horizontal-primary.png");

const WIDTH = 1200;
const HEIGHT = 630;
const BONE = "#F5EFE2";
const FOREST = "#1F3A2F";

const tagline =
  "Commercial reasoning for repeatable revenue.";

async function main() {
  const lockup = sharp(await readFile(LOCKUP)).resize(520, null, {
    fit: "inside",
  });
  const lockupMeta = await lockup.metadata();
  const lockupBuffer = await lockup.png().toBuffer();

  const lockupWidth = lockupMeta.width ?? 520;
  const lockupHeight = lockupMeta.height ?? 120;
  const lockupX = Math.round((WIDTH - lockupWidth) / 2);
  const lockupY = Math.round(HEIGHT * 0.36 - lockupHeight / 2);

  const taglineSvg = Buffer.from(`<svg width="${WIDTH}" height="80" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="${FOREST}">
    ${tagline}
  </text>
</svg>`);

  const taglineBuffer = await sharp(taglineSvg).png().toBuffer();
  const taglineMeta = await sharp(taglineBuffer).metadata();
  const taglineY = lockupY + lockupHeight + 36;

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: BONE,
    },
  })
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

  console.log(`Wrote ${OUT}`);
}

await main();
