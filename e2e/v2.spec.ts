import { test, expect } from "@playwright/test";

/* /v2 page smoke tests — verify the page loads, key landmarks are
   present, and the brand-mark section renders five steps. These
   tests run against a real Next dev server (see playwright.config).
   They intentionally don't assert sticky-scroll positions because
   browser CSS-sticky behaviour is what we're trusting, not what
   we're testing — see e2e/sticky-scroll.spec.ts for the scroll math
   verification we DO own. */

test.describe("/v2", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/v2");
  });

  test("hero headline is the first H1 on the page", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/revenue/i);
  });

  test("brand-mark section pentagon heading is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /kithos gives you the tools/i,
        level: 2,
      }),
    ).toBeVisible();
  });

  test("brand-mark section renders five list items as steps", async ({
    page,
  }) => {
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    await expect(section.locator("ol > li")).toHaveCount(5);
  });

  test("integration marquee is embedded in the first step", async ({
    page,
  }) => {
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    const firstStep = section.locator("ol > li").first();
    await expect(firstStep.locator(".integration-marquee")).toHaveCount(1);
  });
});
