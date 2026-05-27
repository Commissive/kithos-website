/**
 * Tight crops for product-statement cards.
 *
 * Bounds = stroke geometry on the 1200×1200 master SVGs plus 24px padding
 * (matches brand illustration margin). The key is rotated −90° so the bow
 * sits at the top like the anchor and sprout. Cropped exports in
 * `public/brand/illustrations/product-statement/`. Each image is
 * `object-fit: contain` inside the card illustration slot (content width
 * × `--product-statement-illo-h`), with `max-width` / `max-height` capped
 * at `min(100%, --product-statement-illo-h)` so no mark exceeds the
 * shorter slot dimension.
 */
export const PRODUCT_STATEMENT_ILLUSTRATION_CROPS = {
  key: { x: 0, y: 0, width: 248, height: 728 },
  anchor: { x: 396, y: 206, width: 408, height: 678 },
  sprout: { x: 276, y: 376, width: 648, height: 528 },
} as const;

export const PRODUCT_STATEMENT_ILLUSTRATIONS = {
  key: {
    src: "/brand/illustrations/product-statement/21_key.svg",
    ...PRODUCT_STATEMENT_ILLUSTRATION_CROPS.key,
  },
  anchor: {
    src: "/brand/illustrations/product-statement/18_anchor.svg",
    ...PRODUCT_STATEMENT_ILLUSTRATION_CROPS.anchor,
  },
  sprout: {
    src: "/brand/illustrations/product-statement/07_sprout.svg",
    ...PRODUCT_STATEMENT_ILLUSTRATION_CROPS.sprout,
  },
} as const;
