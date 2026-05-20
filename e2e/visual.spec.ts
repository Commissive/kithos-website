import { test, expect } from "@playwright/test";

/* Visual regression for /v2 at the breakpoints we care about. First
   run produces baselines in `e2e/visual.spec.ts-snapshots/` — commit
   those. Subsequent runs flag any pixel diffs over the threshold
   defined in playwright.config (`maxDiffPixelRatio: 0.01`). Update
   baselines intentionally with `--update-snapshots`. */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "laptop-short", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

for (const vp of VIEWPORTS) {
  test(`/v2 above-the-fold @${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/v2");
    // Wait for fonts so we don't diff against a FOUT frame.
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`v2-fold-${vp.name}.png`, {
      fullPage: false,
      // Marquee is animated — mask it so we don't false-positive on
      // its frame-to-frame movement.
      mask: [page.locator(".integration-marquee")],
    });
  });

  test(`/v2 brand-mark section in view @${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/v2");
    await page.evaluate(() => document.fonts.ready);
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    await section.scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot(`v2-brand-mark-${vp.name}.png`, {
      fullPage: false,
      mask: [page.locator(".integration-marquee")],
    });
  });
}
