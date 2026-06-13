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

  test("faq section is present", async ({ page }) => {
    const faq = page.locator("#faq");
    await faq.scrollIntoViewIfNeeded();
    await expect(faq).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: /Frequently Asked Questions/i,
      }),
    ).toBeVisible();
    await expect(
      faq.getByRole("button", {
        name: /How is Kithos different from a CRM/i,
      }),
    ).toBeVisible();
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
        name: /Works with your stack/i,
      }),
    ).toBeVisible();
    await expect(
      integrations.locator('img[alt="Salesforce"]'),
    ).toBeVisible();
  });

  test("archetype cards link to the use-case pages", async ({ page }) => {
    const fit = page.locator("#fit");
    await fit.scrollIntoViewIfNeeded();
    await expect(
      fit.getByRole("link", { name: /Kithos for regulated markets/i }),
    ).toHaveAttribute("href", "/for/regulated-markets");
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
