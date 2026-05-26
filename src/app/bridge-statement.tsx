"use client";

import type { CSSProperties } from "react";
import { PageColumn, PageShell } from "./page-layout";
import { SectionRuleTicks } from "./structural-frame";
import {
  useScrollRevealProgress,
  wordLitColor,
  wordRevealAmount,
} from "./use-scroll-reveal-progress";

function wordsFromSentence(sentence: string) {
  return sentence.trim().split(/\s+/);
}

const LIT = "var(--ink)";

const PARAGRAPH = [
  ...wordsFromSentence(
    "You shouldn't need to jump through six tools and multiple open tabs to find your ideal customer.",
  ),
];

const TOTAL_WORDS = PARAGRAPH.length;

export function BridgeStatement() {
  const { ref, progress } = useScrollRevealProgress<HTMLQuoteElement>({
    start: 0.92,
    end: 0.22,
  });

  return (
    <section
      aria-label="From product to revenue"
      className="relative z-0 flex min-h-[var(--hero-viewport-h)] w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)] bg-[var(--surface)] py-[var(--section-pad-y)]"
      style={
        {
          "--bridge-word-ghost":
            "color-mix(in oklch, var(--ink) 48%, var(--surface))",
        } as CSSProperties
      }
    >
      <SectionRuleTicks />
      <PageShell className="relative z-[1] flex-1">
        <PageColumn className="flex flex-1 items-center justify-center">
          <blockquote
            ref={ref}
            className="mx-auto w-full max-w-[52rem] px-[var(--page-gutter)] text-center"
          >
            <p className="text-[clamp(2rem,3vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em]">
              {PARAGRAPH.map((text, index) => {
                const reveal = wordRevealAmount(index, TOTAL_WORDS, progress);

                return (
                  <span
                    key={`${index}-${text}`}
                    className="bridge-reveal-word inline-block"
                    style={{ color: wordLitColor(reveal, LIT) }}
                  >
                    {text}
                    {index < PARAGRAPH.length - 1 ? "\u00a0" : null}
                  </span>
                );
              })}
            </p>
          </blockquote>
        </PageColumn>
      </PageShell>
    </section>
  );
}
