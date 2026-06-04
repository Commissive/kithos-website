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

  test("revenue path section is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /Win deals today\. Get better tomorrow\./i,
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
