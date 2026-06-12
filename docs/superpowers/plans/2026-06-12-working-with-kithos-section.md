# "Working with Kithos" Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "How it works" section (`RevenuePathSection`) with the understanding-led, copy-only "Working with Kithos" section — bone surface, ledger-row staging — per `docs/superpowers/specs/2026-06-12-working-with-kithos-section-design.md`.

**Architecture:** One section component (`working-with-kithos-section.tsx` + `.css`) renamed from the existing revenue-path files, keeping the established section skeleton (PageShell → SectionHeadingBand → content) and the GSAP scroll-reveal pattern. The three-card `ReasoningStepItems` component and its loop motif are deleted entirely; the ledger rows are simple local markup. The dark `forest-pressed` surface inversion is replaced with a `--bone` surface.

**Tech Stack:** Next.js App Router, React 19, GSAP (`gsap-setup.ts` helpers), Vitest + Testing Library, plain CSS with brand-kit tokens.

**Conventions to follow (read these files first):** `src/app/revenue-path-section.tsx` (current section — the skeleton survives), `src/app/page-layout.tsx` (heading primitives), `src/app/stack-section.css` / `src/app/capability-section.css` (CSS comment style). Token sources: `kithos-brand-kit/tokens/colors.css` (`--bone`, `--bone-deeper`, `--forest`, `--terracotta-pressed`), spacing tokens `--space-*`.

---

### Task 1: Failing test for the new section

**Files:**
- Create: `src/app/working-with-kithos-section.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/app/working-with-kithos-section.test.tsx` with exactly:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkingWithKithosSection } from "./working-with-kithos-section";

describe("WorkingWithKithosSection", () => {
  it("renders the understanding-led heading and the three ledger rows", () => {
    render(<WorkingWithKithosSection />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /It knows your business end to end\./i,
      }),
    ).toHaveAttribute("id", "working-with-kithos-heading");
    expect(screen.getByText(/^Working with Kithos$/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /living picture of your company, your customers, and your whole commercial lifecycle/i,
      ),
    ).toBeInTheDocument();

    for (const title of [
      "Never starts cold",
      "Acts on your say-so",
      "Never forgets",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
    expect(screen.getByText(/not a blank prompt/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Nothing reaches a buyer without you/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Patterns become playbook/i)).toBeInTheDocument();

    // The old framing must be gone.
    expect(screen.queryByText(/Outcomes feed the next move/i)).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 3, name: /^Research$/i }),
    ).toBeNull();
    expect(
      screen.queryByRole("heading", { level: 2, name: /one loop/i }),
    ).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/working-with-kithos-section.test.tsx`
Expected: FAIL — cannot resolve `./working-with-kithos-section` (module does not exist yet).

- [ ] **Step 3: Commit**

```bash
git add src/app/working-with-kithos-section.test.tsx
git commit -m "test: add failing spec for the Working with Kithos section"
```

---

### Task 2: Rename and rewrite the section component and CSS

**Files:**
- Rename: `src/app/revenue-path-section.tsx` → `src/app/working-with-kithos-section.tsx` (contents rewritten)
- Rename: `src/app/revenue-path-section.css` → `src/app/working-with-kithos-section.css` (contents rewritten)
- Delete: `src/app/revenue-path-section.test.tsx` (superseded by Task 1's test)
- Modify: `src/app/page.tsx:8` (import) and `src/app/page.tsx:25` (usage)

- [ ] **Step 1: Rename the files with git so history follows**

```bash
git mv src/app/revenue-path-section.tsx src/app/working-with-kithos-section.tsx
git mv src/app/revenue-path-section.css src/app/working-with-kithos-section.css
git rm src/app/revenue-path-section.test.tsx
```

- [ ] **Step 2: Rewrite the component**

Replace the full contents of `src/app/working-with-kithos-section.tsx` with:

```tsx
"use client";

import { useRef } from "react";
import {
  PageColumn,
  PageGrid,
  PageGridProse,
  PageShell,
  SectionEyebrow,
  SectionHeadingBand,
  SectionHeadingRow,
  SectionHeadingRowTitle,
  SectionHeadingStack,
  SectionHeadingSupport,
  SectionHeadingTitle,
} from "./page-layout";
import { gsap, ScrollTrigger, useGSAP, bindScrollReveal } from "./gsap-setup";
import "./working-with-kithos-section.css";

const WORKING_SUBHEAD =
  "Kithos holds a living picture of your company, your customers, and your whole commercial lifecycle — researching what's new, learning from what worked, and remembering all of it.";

const LEDGER_ROWS = [
  {
    id: "understanding",
    title: "Never starts cold",
    body: "It already knows the account's history, the buyer's world, and what changed this week — drawn from your tools and fresh research, not a blank prompt.",
  },
  {
    id: "approval",
    title: "Acts on your say-so",
    body: "Every prepared move comes with the reasoning behind it. Approve and it's done — sent, logged, scheduled. Nothing reaches a buyer without you.",
  },
  {
    id: "memory",
    title: "Never forgets",
    body: "Every reply, objection, win, and loss is committed to memory. Patterns become playbook — so each move starts further ahead than the last.",
  },
] as const;

const INTRO_SELECTOR = "[data-working-intro]";
const ROW_SELECTOR = "[data-working-row]";

export function WorkingWithKithosSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const intro = gsap.utils.toArray<HTMLElement>(INTRO_SELECTOR, root);
      const rows = gsap.utils.toArray<HTMLElement>(ROW_SELECTOR, root);

      const mm = gsap.matchMedia();
      const targets = [...intro, ...rows];

      bindScrollReveal(mm, targets, () => {
        gsap.set(intro, { y: 18, autoAlpha: 0 });
        gsap.set(rows, { y: 14, autoAlpha: 0 });

        const introTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(intro, {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              ease: "power3.out",
              stagger: 0.12,
              overwrite: "auto",
            });
          },
        });

        const rowBatch =
          rows.length > 0
            ? ScrollTrigger.batch(rows, {
                start: "top 88%",
                once: true,
                onEnter: (batch) => {
                  gsap.to(batch, {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.1,
                    overwrite: "auto",
                  });
                },
              })
            : [];

        return () => {
          introTrigger.kill();
          rowBatch.forEach((st) => st.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="working-with-kithos"
      aria-labelledby="working-with-kithos-heading"
      className="working-with-kithos relative w-full scroll-mt-[var(--scroll-anchor-offset)]"
    >
      <div className="working-with-kithos__surface">
        <div className="working-with-kithos__inner">
          <PageShell>
            <PageColumn className="page-section-top">
              <PageGrid>
                <PageGridProse>
                  <SectionHeadingBand>
                    <SectionHeadingStack>
                      <SectionEyebrow data-working-intro>
                        Working with Kithos
                      </SectionEyebrow>
                      <SectionHeadingRow>
                        <SectionHeadingRowTitle>
                          <SectionHeadingTitle
                            id="working-with-kithos-heading"
                            data-working-intro
                          >
                            It knows your business <em>end to end.</em>
                          </SectionHeadingTitle>
                        </SectionHeadingRowTitle>
                        <SectionHeadingSupport data-working-intro>
                          {WORKING_SUBHEAD}
                        </SectionHeadingSupport>
                      </SectionHeadingRow>
                    </SectionHeadingStack>
                  </SectionHeadingBand>

                  <div className="working-with-kithos__rows">
                    {LEDGER_ROWS.map((row) => {
                      const headingId = `${row.id}-heading`;
                      return (
                        <article
                          key={row.id}
                          id={row.id}
                          data-working-row
                          aria-labelledby={headingId}
                          className="working-with-kithos__row"
                        >
                          <h3
                            id={headingId}
                            className="working-with-kithos__row-title type-card-title"
                          >
                            {row.title}
                          </h3>
                          <p className="working-with-kithos__row-body body">
                            {row.body}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                </PageGridProse>
              </PageGrid>
            </PageColumn>
          </PageShell>
        </div>
      </div>
    </section>
  );
}
```

Notes on deliberate differences from the old file: the `data-on-accent` attribute is dropped (the surface is no longer dark, so the token inversion in `surface-text.css` must not apply), the loop selector/animation is gone, and the heading copy carries `<em>end to end.</em>` matching the sibling-section emphasis idiom.

- [ ] **Step 3: Rewrite the CSS**

Replace the full contents of `src/app/working-with-kithos-section.css` with:

```css
/* ── The bone act — the working relationship, stated on warm paper ── */

.working-with-kithos__surface {
  background: var(--bone);
  padding-block-end: var(--space-6);

  /* Local tokens — children read the bone surface. */
  --bg: var(--bone);
  --rule: var(--bone-deeper);
}

.working-with-kithos__inner {
  position: relative;
  z-index: 1;
}

/* Serif emphasis — terracotta warmth on the bone ground. */
.working-with-kithos .type-statement em {
  color: var(--terracotta-pressed);
}

/* ── Ledger rows — hairline rules, title left / body right ── */

.working-with-kithos__rows {
  width: 100%;
  border-bottom: 1px solid var(--rule);
}

.working-with-kithos__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-1);
  padding-block: var(--space-2);
  border-top: 1px solid var(--rule);
  scroll-margin-top: var(--scroll-anchor-offset);
}

.working-with-kithos__row-title {
  margin: 0;
  color: var(--forest);
}

.working-with-kithos__row-body {
  margin: 0;
  max-width: 100%;
}

@media (min-width: 48rem) {
  .working-with-kithos__row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: var(--space-3);
  }

  .working-with-kithos__row-body {
    max-width: min(100%, var(--measure-prose));
  }
}
```

- [ ] **Step 4: Update the page composition**

In `src/app/page.tsx`, change the import (line 8):

```tsx
import { WorkingWithKithosSection } from "./working-with-kithos-section";
```

and the usage inside `page-sections` (line 25):

```tsx
<WorkingWithKithosSection />
```

(The old lines reference `RevenuePathSection` / `./revenue-path-section`.)

- [ ] **Step 5: Run the new test to verify it passes**

Run: `npx vitest run src/app/working-with-kithos-section.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 6: Commit**

```bash
git add -A src/app/working-with-kithos-section.tsx src/app/working-with-kithos-section.css src/app/revenue-path-section.tsx src/app/revenue-path-section.css src/app/revenue-path-section.test.tsx src/app/page.tsx
git commit -m "feat: replace How-it-works with the Working with Kithos bone-act section"
```

---

### Task 3: Delete the orphaned reasoning-steps component

**Files:**
- Delete: `src/app/reasoning-steps.tsx`
- Delete: `src/app/reasoning-steps.css`

- [ ] **Step 1: Verify nothing references reasoning-steps any more**

Run: `grep -rn "reasoning-steps\|ReasoningStep" src/`
Expected: no matches. (If anything matches, stop — do not delete; report the consumer.)

- [ ] **Step 2: Delete the files**

```bash
git rm src/app/reasoning-steps.tsx src/app/reasoning-steps.css
```

- [ ] **Step 3: Check for orphaned layout tokens**

Run: `grep -rn "reasoning" src/ kithos-brand-kit/tokens/layout.css`
Expected: matches only in `kithos-brand-kit/tokens/layout.css` (`--reasoning-cards-gap`, `--reasoning-card-pad`). Remove those token declarations from `kithos-brand-kit/tokens/layout.css` only if the grep shows no other consumer in `src/`; otherwise leave them.

- [ ] **Step 4: Run the full suite and build**

Run: `npm test`
Expected: all tests pass, none reference the deleted files.

Run: `npx next build`
Expected: build succeeds (catches any missed import of the deleted CSS/TSX).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove orphaned reasoning-steps component and tokens"
```

---

### Task 4: Visual verification

**Files:** none (verification only)

- [ ] **Step 1: Run the dev server and inspect the section**

Run: `npm run dev` and open `http://localhost:3000/#working-with-kithos`.

Check against the spec:
- Bone surface (`#F5EFE2` ground), no dark panel; ink body text, forest row titles, terracotta `em` in the headline.
- Eyebrow "Working with Kithos" → headline → subhead, then three hairline-ruled rows, title left / body right on desktop.
- No boxes, cards, arrows, or loop motif anywhere in the section.
- At a narrow viewport (~375px), rows stack title-above-body with rules intact and nothing reads as shrunken desktop.
- Scroll-reveal entrance still fires (heading fades up, rows follow).

- [ ] **Step 2: Report**

Screenshot or describe the rendered section against the checklist above; fix any deviation before declaring done.
