/**
 * Losslessly recompress hero PNGs used on the site.
 * Run: node scripts/optimize-hero-images.mjs
 */
import { rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const HERO_DIR = path.join(ROOT, "public/hero");

const FILES = [
  "hero-bg.png",
  "bg-footer2.png",
  "market.png",
  "account.png",
  "buying-path.png",
];

async function optimize(file) {
  const input = path.join(HERO_DIR, file);
  const tmp = `${input}.tmp`;

  const before = (await stat(input)).size;

  await sharp(input)
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmp);

  await unlink(input);
  await rename(tmp, input);

  const after = (await stat(input)).size;
  const saved = before - after;
  const pct = before > 0 ? ((saved / before) * 100).toFixed(1) : "0.0";
  console.log(`${file}: ${formatBytes(before)} → ${formatBytes(after)} (−${pct}%)`);
}

function formatBytes(bytes) {
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

for (const file of FILES) {
  await optimize(file);
}

console.log("Done.");
