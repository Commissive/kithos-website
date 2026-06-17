import { test, expect } from "@playwright/test";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero headline is the first H1 on the page", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/revenue/i);
  });

  test("capabilities section is present", async ({ page }) => {
    const capabilities = page.locator("#capabilities");
    await capabilities.scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /Win deals your team would otherwise lose\./i,
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("heading", {
          level: 3,
          name: /Find the right accounts/i,
        })
        .first(),
    ).toBeVisible();
  });

  test("integrations section is present", async ({ page }) => {
    const integrations = page.locator("#integrations");
    await integrations.scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /works from the context your team already creates/i,
      }),
    ).toBeVisible();
    await expect(integrations.locator('img[alt="Salesforce"]')).toBeVisible();
  });

  test("footer links to the use-case pages", async ({ page }) => {
    const footer = page.locator(".site-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(
      footer.locator('a[href="/for/regulated-markets"]'),
    ).toBeVisible();
  });
});

test.describe("use-case pages", () => {
  for (const slug of [
    "regulated-markets",
    "technical-products",
    "industrial-operations",
  ]) {
    test(`/for/${slug} renders the four-pillar motion`, async ({ page }) => {
      await page.goto(`/for/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      for (const phase of [
        "Find the right accounts",
        "Shape the opportunity",
        "Move the deal forward",
        "Learn what to repeat",
      ]) {
        await expect(
          page.getByRole("heading", { level: 3, name: phase }),
        ).toBeVisible();
      }
    });
  }
});
