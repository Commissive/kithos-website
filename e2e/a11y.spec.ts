import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/* Sitewide axe a11y scan. Runs on every public page; each must pass
   WCAG 2.0 A, 2.0 AA, 2.1 A, 2.1 AA with zero violations. */

const PAGES = ["/", "/faq", "/privacy", "/terms"];

for (const path of PAGES) {
  test(`${path} passes WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `violations on ${path}`).toEqual([]);
  });
}
