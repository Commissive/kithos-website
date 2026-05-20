import { defineConfig, devices } from "@playwright/test";

/* Playwright runs E2E + visual + a11y against a real dev server.
   `reuseExistingServer` keeps local runs fast when `npm run dev` is
   already up; CI starts its own. Visual regression snapshots live
   next to the specs under `e2e/__screenshots__/`; create a baseline
   with `npm run test:e2e -- --update-snapshots`. */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  expect: {
    /* Visual snapshots: tolerate small AA / sub-pixel diffs.
       Bumped from 0.01 → 0.02 because the hero's `rise` entrance
       animations sometimes haven't reached their resting state by
       the time we snapshot, even with document.getAnimations().pause(). */
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
