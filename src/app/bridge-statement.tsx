"use client";

import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
} from "./page-layout";
import "./bridge-statement.css";
import { SectionRuleTicks } from "./structural-frame";
import {
  useScrollRevealProgress,
  wordLitColor,
  wordRevealAmount,
} from "./use-scroll-reveal-progress";

function wordsFromSentence(sentence: string) {
  return sentence.trim().split(/\s+/);
}

function normalizeBridgeToken(token: string) {
  return token.replace(/\u2011/g, "-").replace(/^[,;:.!?]+|[,;:.!?]+$/g, "");
}

function phraseWordIndices(tokens: string[], phrase: string) {
  const needle = wordsFromSentence(phrase).map(normalizeBridgeToken);
  const haystack = tokens.map(normalizeBridgeToken);
  const indices = new Set<number>();

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((word, j) => haystack[i + j] === word)) {
      for (let j = 0; j < needle.length; j++) indices.add(i + j);
      break;
    }
  }

  return indices;
}

const LIT_INK = "var(--ink)";
const LIT_ACCENT = "var(--accent)";
const BRIDGE_HIGHLIGHT = "teams selling into complex buying environments";

/** Keep hyphenated compounds on one line (U+2011 non-breaking hyphen). */
const BRIDGE_OPENING =
  "For product\u2011focused B2B teams selling into complex buying environments, where the right account is not obvious, the buyer is not always the user, and the problem has to be understood before the product can be sold.";
const BRIDGE_CLOSING =
  "You shouldn't have to jump between six tools and multiple open tabs that record the work, but don't help you decide what to do next.";
const BRIDGE_STATEMENT = `${BRIDGE_OPENING} ${BRIDGE_CLOSING}`;

const PARAGRAPH = wordsFromSentence(BRIDGE_STATEMENT);
const HIGHLIGHT_INDICES = phraseWordIndices(PARAGRAPH, BRIDGE_HIGHLIGHT);
const TOTAL_WORDS = PARAGRAPH.length;
const FIRST_SENTENCE_WORD_COUNT = wordsFromSentence(BRIDGE_OPENING).length;

export function BridgeStatement() {
  const { ref, progress } = useScrollRevealProgress<HTMLQuoteElement>({
    start: 0.92,
    end: 0.22,
  });

  return (
    <section
      aria-label={BRIDGE_STATEMENT}
      className="bridge-statement relative w-full scroll-mt-[var(--scroll-anchor-offset)] border-t border-[var(--rule)]"
    >
      <SectionRuleTicks />
      <PageShell>
        <PageColumn>
          <PageGrid>
            <div className="bridge-statement__ruled">
              <PageGridProse className="bridge-statement__prose">
                <blockquote ref={ref} className="bridge-statement__quote">
                  <p className="bridge-statement__line type-statement text-[var(--ink)]">
                    {PARAGRAPH.map((text, index) => {
                      const reveal = wordRevealAmount(
                        index,
                        TOTAL_WORDS,
                        progress,
                        { groupWordCount: FIRST_SENTENCE_WORD_COUNT },
                      );
                      const highlighted = HIGHLIGHT_INDICES.has(index);

                      return (
                        <span
                          key={`${index}-${text}`}
                          className="bridge-reveal-word"
                          style={{
                            color: highlighted
                              ? wordLitColor(
                                  reveal,
                                  LIT_ACCENT,
                                  "var(--bridge-highlight-ghost)",
                                )
                              : wordLitColor(reveal, LIT_INK),
                          }}
                        >
                          {text}
                          {index < PARAGRAPH.length - 1 ? " " : null}
                        </span>
                      );
                    })}
                  </p>
                </blockquote>
              </PageGridProse>
            </div>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
