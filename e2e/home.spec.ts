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

  test("revenue path section is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /A reasoning layer for the revenue workflow/i,
        level: 2,
      }),
    ).toBeVisible();
    await expect(page.locator("#revenue-path")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: /Prioritise the right accounts/i,
      }),
    ).toBeVisible();
  });
});
