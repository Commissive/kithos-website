# "Working with Kithos" Grid Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the section's ledger rows with the user-sketched bounded grid — left column stacks "Never starts cold" over "Never forgets", "Acts on your say-so" spans full height on the right as the hero cell with an anchored closing line — per the revised spec (`docs/superpowers/specs/2026-06-12-working-with-kithos-section-design.md`, "Staging: bounded grid").

**Architecture:** Markup-and-CSS change inside the existing `working-with-kithos-section.{tsx,css}` only. The section shell, bone surface, heading band, and GSAP scroll-reveal stay untouched; the `LEDGER_ROWS` map becomes three explicit `<article>` cells in a single-bordered CSS grid with hairline internal rules (no radius, no gaps, no fills).

**Tech Stack:** React 19, plain CSS with brand tokens, Vitest + Testing Library.

---

### Task 1: Update the test (red)

**Files:**
- Modify: `src/app/working-with-kithos-section.test.tsx`

- [ ] **Step 1: Update assertions for the grid structure**

In `src/app/working-with-kithos-section.test.tsx`, replace this block:

```tsx
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
```

with:

```tsx
    for (const title of ["Never starts cold", "Never forgets"]) {
      expect(
        screen.getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("heading", { level: 3, name: "Acts on your say-so." }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a blank prompt/i)).toBeInTheDocument();
    expect(screen.getByText(/Patterns become playbook/i)).toBeInTheDocument();

    // The hero cell's closing line is its own anchored paragraph.
    const anchor = screen.getByText("Nothing reaches a buyer without you.");
    expect(anchor.tagName).toBe("P");
    expect(anchor).toHaveClass("working-with-kithos__hero-anchor");
```

Leave every other assertion in the file unchanged.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/working-with-kithos-section.test.tsx`
Expected: FAIL — no heading with accessible name "Acts on your say-so." (current markup renders "Acts on your say-so" without the period and without the `<em>`), and no element with class `working-with-kithos__hero-anchor`.

- [ ] **Step 3: Commit**

```bash
git add src/app/working-with-kithos-section.test.tsx
git commit -m "test: assert sketch-grid structure for the Working with Kithos section"
```

---

### Task 2: Replace the ledger rows with the bounded grid

**Files:**
- Modify: `src/app/working-with-kithos-section.tsx`
- Modify: `src/app/working-with-kithos-section.css`

- [ ] **Step 1: Update the component markup**

In `src/app/working-with-kithos-section.tsx`:

(a) Delete the entire `LEDGER_ROWS` constant (the `const LEDGER_ROWS = [ ... ] as const;` block).

(b) Replace the rows container JSX — everything from `<div className="working-with-kithos__rows">` through its closing `</div>` (the block containing `LEDGER_ROWS.map`) — with:

```tsx
                  <div className="working-with-kithos__grid">
                    <article
                      id="understanding"
                      data-working-row
                      aria-labelledby="understanding-heading"
                      className="working-with-kithos__cell"
                    >
                      <h3
                        id="understanding-heading"
                        className="working-with-kithos__cell-title type-card-title"
                      >
                        Never starts cold
                      </h3>
                      <p className="working-with-kithos__cell-body body">
                        It already knows the account&apos;s history, the
                        buyer&apos;s world, and what changed this week — drawn
                        from your tools and fresh research, not a blank prompt.
                      </p>
                    </article>

                    <article
                      id="approval"
                      data-working-row
                      aria-labelledby="approval-heading"
                      className="working-with-kithos__cell working-with-kithos__cell--hero"
                    >
                      <h3
                        id="approval-heading"
                        className="working-with-kithos__cell-title working-with-kithos__hero-title type-feature"
                      >
                        Acts on your <em>say-so.</em>
                      </h3>
                      <p className="working-with-kithos__cell-body body">
                        Every prepared move comes with the reasoning behind it.
                        Approve and it&apos;s done — sent, logged, scheduled.
                      </p>
                      <p className="working-with-kithos__hero-anchor body">
                        Nothing reaches a buyer without you.
                      </p>
                    </article>

                    <article
                      id="memory"
                      data-working-row
                      aria-labelledby="memory-heading"
                      className="working-with-kithos__cell"
                    >
                      <h3
                        id="memory-heading"
                        className="working-with-kithos__cell-title type-card-title"
                      >
                        Never forgets
                      </h3>
                      <p className="working-with-kithos__cell-body body">
                        Every reply, objection, win, and loss is committed to
                        memory. Patterns become playbook — so each move starts
                        further ahead than the last.
                      </p>
                    </article>
                  </div>
```

Note: DOM order is cold → say-so → forgets (the mobile reading order); desktop placement is done in CSS. Keep `WORKING_SUBHEAD`, the GSAP block, and everything else in the file unchanged — `data-working-row` still drives the reveal.

- [ ] **Step 2: Update the CSS**

In `src/app/working-with-kithos-section.css`, replace the ledger-rows block — everything from the comment `/* ── Ledger rows — hairline rules, title left / body right ── */` to the end of the file — with:

```css
/* ── The grid — one bounded field, hairline rules, cells flush ── */

.working-with-kithos__grid {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  border: 1px solid var(--rule);
}

.working-with-kithos__cell {
  padding: var(--space-2);
  border-top: 1px solid var(--rule);
  scroll-margin-top: var(--scroll-anchor-offset);
}

.working-with-kithos__cell:first-child {
  border-top: none;
}

.working-with-kithos__cell-title {
  margin: 0 0 var(--space-0-5);
  color: var(--forest);
}

.working-with-kithos__cell-body {
  margin: 0;
  max-width: min(100%, var(--measure-prose));
}

/* Hero cell — the say-so claim; closing line anchored to the foot. */
.working-with-kithos__cell--hero {
  display: flex;
  flex-direction: column;
}

.working-with-kithos__hero-title em {
  font-style: italic;
  color: var(--terracotta-pressed);
}

.working-with-kithos__hero-anchor {
  margin: var(--space-2) 0 0;
  font-weight: 600;
  color: var(--headline);
}

@media (min-width: 48rem) {
  .working-with-kithos__grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    grid-template-rows: auto auto;
  }

  .working-with-kithos__cell--hero {
    grid-column: 2;
    grid-row: 1 / 3;
    border-top: none;
    border-left: 1px solid var(--rule);
  }

  .working-with-kithos__hero-anchor {
    margin-top: auto;
    padding-top: var(--space-2);
  }
}
```

Border logic to preserve exactly: mobile stack = cold (no top border, first child) / hero (top border) / forgets (top border); desktop = hero loses its top border and gains a left border, cold sits row 1 / col 1 (auto-placed), forgets row 2 / col 1 keeps its top border as the internal horizontal rule. The outer `border` on `__grid` is the single bounding frame.

Keep the surface block, `__inner`, and the `.working-with-kithos .type-statement em` rule at the top of the file unchanged.

- [ ] **Step 3: Run the section test**

Run: `npx vitest run src/app/working-with-kithos-section.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 4: Run the full suite**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/working-with-kithos-section.tsx src/app/working-with-kithos-section.css
git commit -m "feat: restage Working with Kithos as a bounded grid per sketch"
```

---

### Task 3: Visual verification

**Files:** none (verification only)

- [ ] **Step 1: Inspect at desktop and mobile widths**

Against the running dev server, check `http://localhost:3000/#working-with-kithos`:
- One single-bordered grid; hairline internal rules; no radius, gaps, or fills — all cells on bone.
- Desktop: cold over forgets on the left, say-so spanning full height on the right; "Nothing reaches a buyer without you." anchored at the hero cell's foot; hero title at display scale with terracotta italic "say-so."
- Mobile (~375px): cells stack cold → say-so → forgets, rules intact, anchor line directly after the hero body (no large void).
- Scroll-reveal entrance still fires.

- [ ] **Step 2: Report**

Screenshot desktop and mobile; fix any deviation before declaring done.
