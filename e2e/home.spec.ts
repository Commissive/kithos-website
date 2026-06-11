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
        name: /From account research to the next conversation\./i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: /Walk into first conversations prepared/i,
      }),
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

    const stackBand = page.locator("[data-capability-stack]");
    await expect(stackBand.locator('img[alt="Salesforce"]')).toBeVisible();
  });

  test("revenue path section is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /Kithos learns and gets better with every deal\./i,
        level: 2,
      }),
    ).toBeVisible();
    await expect(page.locator("#revenue-path")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: /^Research$/i,
      }),
    ).toBeVisible();
  });
});
