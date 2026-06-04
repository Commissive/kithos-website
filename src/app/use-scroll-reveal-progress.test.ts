import { describe, expect, it } from "vitest";
import {
  easeOutCubic,
  wordLitColor,
  wordRevealAmount,
} from "./use-scroll-reveal-progress";

describe("wordRevealAmount", () => {
  const total = 10;
  const groupCount = 6;

  it("reveals grouped words before the closing line", () => {
    expect(
      wordRevealAmount(0, total, 0.3, { groupWordCount: groupCount }),
    ).toBeGreaterThan(0);
    expect(
      wordRevealAmount(9, total, 0.3, { groupWordCount: groupCount }),
    ).toBe(0);
  });

  it("completes all words at full scroll progress", () => {
    for (let index = 0; index < total; index += 1) {
      expect(
        wordRevealAmount(index, total, 1, { groupWordCount: groupCount }),
      ).toBe(1);
    }
  });
});

describe("easeOutCubic", () => {
  it("eases from 0 to 1", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});

describe("wordLitColor", () => {
  it("returns ghost at zero reveal and lit at full reveal", () => {
    expect(wordLitColor(0, "var(--ink)")).toBe(
      "color-mix(in oklch, var(--ink) 0%, var(--bridge-word-ghost))",
    );
    expect(wordLitColor(1, "var(--ink)")).toBe(
      "color-mix(in oklch, var(--ink) 100%, var(--bridge-word-ghost))",
    );
  });
});
