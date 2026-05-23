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

  test("commercial reasoning section is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /commercial reasoning system for repeatable revenue/i,
        level: 2,
      }),
    ).toBeVisible();
    await expect(page.locator("#commercial-reasoning")).toBeVisible();
  });

  test("how-it-works section renders four steps", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /the observability layer for sales/i,
        level: 2,
      }),
    ).toBeVisible();
    const section = page.locator("#how-it-works");
    await expect(section.locator("ol > li")).toHaveCount(4);
  });
});
