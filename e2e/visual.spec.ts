import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "laptop-short", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

async function quiesce(page: import("@playwright/test").Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      const timeline = animation.timeline;
      const isDocumentTimeline =
        timeline === document.timeline ||
        timeline instanceof DocumentTimeline;
      try {
        if (isDocumentTimeline) {
          animation.pause();
          animation.currentTime = 0;
        } else {
          animation.cancel();
        }
      } catch {
        animation.cancel();
      }
    }
  });
}

for (const vp of VIEWPORTS) {
  test(`home above-the-fold @${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    await quiesce(page);
    await expect(page).toHaveScreenshot(`home-fold-${vp.name}.png`, {
      fullPage: false,
    });
  });

  test(`home brand-mark section in view @${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    const section = page.getByRole("region", {
      name: /build a revenue motion that gets sharper with every outcome/i,
    });
    await section.scrollIntoViewIfNeeded();
    await quiesce(page);
    await expect(page).toHaveScreenshot(`home-brand-mark-${vp.name}.png`, {
      fullPage: false,
    });
  });
}
