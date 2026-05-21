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

  test("revenue motion section heading is present", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /tools, context, and confidence for every deal/i,
        level: 2,
      }),
    ).toBeVisible();
  });

  test("how-it-works section renders four steps", async ({
    page,
  }) => {
    const section = page.getByRole("region", {
      name: /tools, context, and confidence for every deal/i,
    });
    await expect(section.locator("ol > li")).toHaveCount(4);
  });

});
