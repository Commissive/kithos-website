import { test, expect } from "@playwright/test";

/* Sticky-scroll behavioural tests. The brand-mark section relies on
   careful sticky math (5 × 100svh slots, lockstep pentagon + card 05
   exit, breathing-room band between nav and pinned content). These
   tests assert the *observable* outcomes of that math by scrolling
   the page and checking which step is on top + where the pentagon
   sits — so a future regression in the sticky offsets or container
   height shows up here. */

const VIEWPORT = { width: 1440, height: 900 };

test.describe("brand-mark sticky stack", () => {
  test.use({ viewport: VIEWPORT });

  test("card 01 is the visible step before scrolling into the section", async ({
    page,
  }) => {
    await page.goto("/v2");
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    await section.scrollIntoViewIfNeeded();
    // After scrolling the section into view, step 01's headline is
    // the visible one.
    await expect(
      section.getByRole("heading", {
        level: 3,
        name: /unify context into a commercial system of action/i,
      }),
    ).toBeVisible();
  });

  test("scrolling deep into the section reveals step 03 above the others", async ({
    page,
  }) => {
    await page.goto("/v2");
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    // Scroll the page so we're roughly mid-section. The section is
    // 5 × 100svh tall; scrolling ~250svh past section_top lands on
    // step 03's pin range.
    const sectionBox = await section.boundingBox();
    if (!sectionBox) throw new Error("section not laid out");
    await page.evaluate(
      ({ top }) => window.scrollTo({ top, behavior: "instant" }),
      { top: sectionBox.y + VIEWPORT.height * 2.5 },
    );
    // The third <h3> (step 03) corresponds to "Move the right deals
    // forward." Even though all 5 are in the DOM, only step 03's
    // card is on top at this scroll (covered by z-index pile).
    const step03 = section.getByRole("heading", {
      level: 3,
      name: /move the right deals forward/i,
    });
    await expect(step03).toBeInViewport();
  });

  test("pentagon heading stays visible throughout the card cycle", async ({
    page,
  }) => {
    await page.goto("/v2");
    const section = page.getByRole("region", {
      name: /kithos gives you the tools/i,
    });
    const sectionBox = await section.boundingBox();
    if (!sectionBox) throw new Error("section not laid out");
    const pentagonHeading = section.getByRole("heading", {
      level: 2,
      name: /kithos gives you the tools/i,
    });

    // Sample three scroll positions within the section and verify
    // the pentagon heading remains in viewport at each — that's the
    // sticky-lockstep contract.
    for (const fraction of [0.5, 1.5, 3.5]) {
      await page.evaluate(
        ({ top }) => window.scrollTo({ top, behavior: "instant" }),
        { top: sectionBox.y + VIEWPORT.height * fraction },
      );
      await expect(pentagonHeading).toBeInViewport();
    }
  });
});
