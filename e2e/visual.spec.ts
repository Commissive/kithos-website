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

/* Quiesce the page so screenshots are deterministic:
   - wait for web fonts to load (no FOUT frame)
   - pause every running CSS / Web animation (marquee in particular
     was the cause of flaky 1–2% sub-pixel diffs even when masked) */
async function quiesce(page: import("@playwright/test").Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      animation.pause();
      animation.currentTime = 0;
    }
  });
}

for (const vp of VIEWPORTS) {
  test(`/v2 above-the-fold @${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/v2");
    await quiesce(page);
    await expect(page).toHaveScreenshot(`v2-fold-${vp.name}.png`, {
      fullPage: false,
    });
  });

  test(`/v2 brand-mark section in view @${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/v2");
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    await section.scrollIntoViewIfNeeded();
    await quiesce(page);
    await expect(page).toHaveScreenshot(`v2-brand-mark-${vp.name}.png`, {
      fullPage: false,
    });
  });
}
