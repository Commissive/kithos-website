# Kithos Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into a warm, advisory, outcome-led conversion flow that increases early-access intent for Revenue/GTM leads.

**Architecture:** Keep the existing page shell/grid primitives and access flow, then replace statement-only content blocks with focused, reusable homepage sections (`OutcomeProofBand`, `AdvisoryLoopSection`, `BeforeAfterSection`, and `HomeFAQSection`). Drive all changes through tests first, then implement minimal component code and styling tokens to satisfy behavior and copy requirements.

**Tech Stack:** Next.js App Router (Next 16), React 19, TypeScript, Tailwind CSS v4, Vitest + Testing Library

---

## File Structure

### Files to Create
- `src/app/home-outcome-proof-band.tsx` - top-of-page outcome proof section with 3 cards and measurable language.
- `src/app/home-advisory-loop-section.tsx` - three-step "Understand / Reason / Guide" section.
- `src/app/home-before-after-section.tsx` - operational contrast section with two side-by-side columns.
- `src/app/home-faq-section.tsx` - compact homepage FAQ slice and `/faq` handoff link.

### Files to Modify
- `src/app/page.tsx` - recompose section order, update hero copy hierarchy, wire new sections.
- `src/app/page.test.tsx` - replace outdated section assertions and add conversion/messaging coverage.
- `src/app/globals.css` - add/adjust lightweight tokens and component-level classes for new cards and section rhythm.

### Existing Files Intentionally Reused
- `src/app/page-layout.tsx` - shell/grid primitives.
- `src/app/access-modal.tsx` - early-access CTA behavior.
- `src/app/section-statement-headline.tsx` - optional support for existing headline style where still useful.

---

### Task 1: Lock the new homepage contract with failing tests

**Files:**
- Modify: `src/app/page.test.tsx`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Write the failing test for new section sequence and hero messaging**

```tsx
it("renders the redesigned conversion flow in the expected order", () => {
  setupBrowserAPIMocks();
  render(<Home />);

  const hero = screen.getByRole("heading", {
    level: 1,
    name: /decisions.*confidence|confidence.*decisions/i,
  });
  const proof = screen.getByRole("heading", {
    level: 2,
    name: /outcomes|results/i,
  });
  const advisory = screen.getByRole("heading", {
    level: 2,
    name: /how kithos helps|advisory loop/i,
  });
  const contrast = screen.getByRole("heading", {
    level: 2,
    name: /without kithos|with kithos|what changes/i,
  });
  const faq = screen.getByRole("heading", {
    level: 2,
    name: /frequently asked|questions/i,
  });
  const finalCta = screen.getAllByRole("button", { name: /get early access/i }).at(-1);

  expect(hero).toBeInTheDocument();
  expect(proof.compareDocumentPosition(advisory)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(advisory.compareDocumentPosition(contrast)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(contrast.compareDocumentPosition(faq)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(finalCta).toBeDefined();
});
```

- [ ] **Step 2: Extract reusable browser API mocks into a helper inside the same test file**

```tsx
function setupBrowserAPIMocks() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: () => ({
      matches: false,
      media: "",
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
  });
}
```

- [ ] **Step 3: Run tests to verify failure**

Run: `npm test -- src/app/page.test.tsx`  
Expected: FAIL with missing headings/sections from redesigned flow.

- [ ] **Step 4: Commit the failing-test checkpoint**

```bash
git add src/app/page.test.tsx
git commit -m "test(home): define redesigned homepage structure expectations"
```

---

### Task 2: Implement outcome and advisory sections

**Files:**
- Create: `src/app/home-outcome-proof-band.tsx`
- Create: `src/app/home-advisory-loop-section.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Write a failing test for proof card count and advisory step labels**

```tsx
it("shows three proof outcomes and a three-step advisory loop", () => {
  setupBrowserAPIMocks();
  render(<Home />);

  expect(screen.getByText(/faster qualification decisions/i)).toBeInTheDocument();
  expect(screen.getByText(/more consistent deal strategy/i)).toBeInTheDocument();
  expect(screen.getByText(/less context loss across meetings/i)).toBeInTheDocument();

  expect(screen.getByText(/understand context/i)).toBeInTheDocument();
  expect(screen.getByText(/reason with evidence/i)).toBeInTheDocument();
  expect(screen.getByText(/guide the next best move/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Add `home-outcome-proof-band.tsx` with semantic cards**

```tsx
import { PageColumn, PageGrid, PageGridProse, PageShell } from "./page-layout";
import { SectionRuleTicks } from "./structural-frame";

const OUTCOMES = [
  "Faster qualification decisions",
  "More consistent deal strategy",
  "Less context loss across meetings",
] as const;

export function HomeOutcomeProofBand() {
  return (
    <section aria-labelledby="home-outcomes-heading" className="home-proof-band relative w-full border-t border-[var(--rule)] bg-[var(--bone)]">
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-8">
              <h2 id="home-outcomes-heading" className="type-statement section-heading-title">
                Outcomes teams feel in day-to-day revenue execution.
              </h2>
              <ul className="home-proof-grid" role="list">
                {OUTCOMES.map((item) => (
                  <li key={item} className="home-proof-card body">{item}</li>
                ))}
              </ul>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
```

- [ ] **Step 3: Add `home-advisory-loop-section.tsx` with 3-step model**

```tsx
import { PageColumn, PageGrid, PageGridProse, PageShell } from "./page-layout";
import { SectionRuleTicks } from "./structural-frame";

const STEPS = [
  { title: "Understand context", body: "Kithos gathers account signals, meeting notes, and deal state into one decision-ready view." },
  { title: "Reason with evidence", body: "Kithos weighs what matters now so your team can prioritize with confidence." },
  { title: "Guide the next best move", body: "Each rep gets practical recommendations aligned with pipeline momentum." },
] as const;

export function HomeAdvisoryLoopSection() {
  return (
    <section aria-labelledby="home-advisory-loop-heading" id="how-it-works" className="relative w-full border-t border-[var(--rule)] bg-[var(--bone)]">
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-8">
              <h2 id="home-advisory-loop-heading" className="type-statement section-heading-title">
                How Kithos helps your team make sharper calls.
              </h2>
              <ol className="home-advisory-grid">
                {STEPS.map((step) => (
                  <li key={step.title} className="home-advisory-card">
                    <h3 className="type-card">{step.title}</h3>
                    <p className="body mt-3 text-[var(--ink-body)]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
```

- [ ] **Step 4: Wire both components into `page.tsx` directly after `Hero`**

```tsx
import { HomeOutcomeProofBand } from "./home-outcome-proof-band";
import { HomeAdvisoryLoopSection } from "./home-advisory-loop-section";

// inside <main id="main">
<Hero />
<HomeOutcomeProofBand />
<HomeAdvisoryLoopSection />
```

- [ ] **Step 5: Run tests to verify pass**

Run: `npm test -- src/app/page.test.tsx`  
Expected: PASS for section presence and step/outcome assertions.

- [ ] **Step 6: Commit**

```bash
git add src/app/home-outcome-proof-band.tsx src/app/home-advisory-loop-section.tsx src/app/page.tsx src/app/page.test.tsx
git commit -m "feat(home): add outcome proof band and advisory loop sections"
```

---

### Task 3: Implement before/after contrast and homepage FAQ

**Files:**
- Create: `src/app/home-before-after-section.tsx`
- Create: `src/app/home-faq-section.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Write failing tests for contrast labels and FAQ questions**

```tsx
it("shows operational contrast and objection-handling FAQs", () => {
  setupBrowserAPIMocks();
  render(<Home />);

  expect(screen.getByRole("heading", { level: 3, name: /without kithos/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 3, name: /with kithos/i })).toBeInTheDocument();

  expect(screen.getByText(/how quickly can we get started/i)).toBeInTheDocument();
  expect(screen.getByText(/how does kithos handle our data/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /see full faq/i })).toHaveAttribute("href", "/faq");
});
```

- [ ] **Step 2: Add `home-before-after-section.tsx`**

```tsx
import { PageColumn, PageGrid, PageGridProse, PageShell } from "./page-layout";
import { SectionRuleTicks } from "./structural-frame";

export function HomeBeforeAfterSection() {
  return (
    <section aria-labelledby="home-before-after-heading" className="relative w-full border-t border-[var(--rule)] bg-[var(--bone)]">
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-8">
              <h2 id="home-before-after-heading" className="type-statement section-heading-title">
                What changes in your weekly revenue rhythm.
              </h2>
              <div className="home-contrast-grid">
                <section className="home-contrast-card">
                  <h3 className="type-card">Without Kithos</h3>
                  <p className="body mt-3 text-[var(--ink-body)]">Deal context is fragmented, qualification is uneven, and follow-through depends on individual memory.</p>
                </section>
                <section className="home-contrast-card">
                  <h3 className="type-card">With Kithos</h3>
                  <p className="body mt-3 text-[var(--ink-body)]">Context stays connected, decisions become repeatable, and teams move on accounts with shared confidence.</p>
                </section>
              </div>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
```

- [ ] **Step 3: Add `home-faq-section.tsx`**

```tsx
import Link from "next/link";
import { PageColumn, PageGrid, PageGridProse, PageShell } from "./page-layout";
import { SectionRuleTicks } from "./structural-frame";

const FAQ_ITEMS = [
  "How quickly can we get started?",
  "How does Kithos handle our data?",
  "Is this right for a small GTM team?",
  "How soon should we expect value?",
] as const;

export function HomeFAQSection() {
  return (
    <section aria-labelledby="home-faq-heading" className="relative w-full border-t border-[var(--rule)] bg-[var(--bone)]">
      <SectionRuleTicks />
      <PageShell>
        <PageColumn className="page-section-top">
          <PageGrid>
            <PageGridProse className="flex flex-col gap-6">
              <h2 id="home-faq-heading" className="type-statement section-heading-title">
                Questions teams ask before joining early access.
              </h2>
              <ul className="home-faq-list">
                {FAQ_ITEMS.map((question) => (
                  <li key={question} className="body text-[var(--ink-body)]">{question}</li>
                ))}
              </ul>
              <Link href="/faq" className="interactive-text-link ui w-fit text-[var(--ink)]">
                See full FAQ
              </Link>
            </PageGridProse>
          </PageGrid>
        </PageColumn>
      </PageShell>
    </section>
  );
}
```

- [ ] **Step 4: Wire components into `page.tsx` before final CTA section**

```tsx
import { HomeBeforeAfterSection } from "./home-before-after-section";
import { HomeFAQSection } from "./home-faq-section";

<HomeAdvisoryLoopSection />
<HomeBeforeAfterSection />
<HomeFAQSection />
```

- [ ] **Step 5: Run tests**

Run: `npm test -- src/app/page.test.tsx`  
Expected: PASS with contrast and FAQ assertions.

- [ ] **Step 6: Commit**

```bash
git add src/app/home-before-after-section.tsx src/app/home-faq-section.tsx src/app/page.tsx src/app/page.test.tsx
git commit -m "feat(home): add before-after contrast and homepage faq sections"
```

---

### Task 4: Refresh hero copy and final CTA framing

**Files:**
- Modify: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: Write failing tests for revised hero and advisory tone copy**

```tsx
it("uses warm advisory hero and keeps primary conversion CTA language", () => {
  setupBrowserAPIMocks();
  render(<Home />);

  expect(
    screen.getByRole("heading", { level: 1, name: /make revenue decisions with confidence/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/your team gets clear guidance.*without guesswork/i),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("button", { name: /get early access/i }).length).toBeGreaterThanOrEqual(2);
});
```

- [ ] **Step 2: Update hero headline, supporting copy, and keep `Get early access` CTA label**

```tsx
<h1 id="hero-headline" className="rise rise-2 type-hero">
  <span className="block">Make revenue decisions</span>
  <span className="block">with confidence.</span>
</h1>
<p className="rise rise-3 lead mt-6 max-w-[52ch] text-[var(--on-forest-lead)]">
  Kithos brings scattered commercial context into one advisory flow, so your team gets clear guidance on the next move without guesswork.
</p>
```

- [ ] **Step 3: Update final CTA section support line to partnership invitation**

```tsx
<span className="label" style={{ color: "var(--on-accent-soft)" }}>
  Get early access
</span>
<h2 className="type-statement mt-6 max-w-[22ch] text-[var(--on-accent)]">
  Join early teams shaping a calmer, sharper way to run revenue decisions.
</h2>
```

- [ ] **Step 4: Run tests**

Run: `npm test -- src/app/page.test.tsx`  
Expected: PASS with revised copy assertions.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat(home): rewrite hero and closing cta for advisory tone"
```

---

### Task 5: Add styling tokens and layout classes for new sections

**Files:**
- Modify: `src/app/globals.css`
- Test: `src/app/page.test.tsx` (class presence assertions where needed)

- [ ] **Step 1: Add failing test for new section class hooks**

```tsx
it("attaches redesigned class hooks used for section rhythm and cards", () => {
  setupBrowserAPIMocks();
  const { container } = render(<Home />);

  expect(container.querySelector(".home-proof-grid")).toBeInTheDocument();
  expect(container.querySelector(".home-advisory-grid")).toBeInTheDocument();
  expect(container.querySelector(".home-contrast-grid")).toBeInTheDocument();
  expect(container.querySelector(".home-faq-list")).toBeInTheDocument();
});
```

- [ ] **Step 2: Add minimal token/class definitions in `globals.css`**

```css
:root {
  --home-card-radius: 1rem;
  --home-card-border: color-mix(in oklch, var(--ink) 16%, transparent);
  --home-card-bg: color-mix(in oklch, var(--bone) 92%, var(--forest) 8%);
}

.home-proof-grid,
.home-advisory-grid,
.home-contrast-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .home-proof-grid,
  .home-advisory-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .home-contrast-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.home-proof-card,
.home-advisory-card,
.home-contrast-card {
  border: 1px solid var(--home-card-border);
  border-radius: var(--home-card-radius);
  background: var(--home-card-bg);
  padding: 1.25rem;
}

.home-faq-list {
  display: grid;
  gap: 0.875rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
```

- [ ] **Step 3: Run tests**

Run: `npm test -- src/app/page.test.tsx`  
Expected: PASS and class-hook assertions succeed.

- [ ] **Step 4: Run lint and full unit tests**

Run: `npm run lint && npm test`  
Expected: Lint passes with no errors; all Vitest tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/page.test.tsx
git commit -m "style(home): add section rhythm and card styling for redesigned flow"
```

---

### Task 6: Final verification and cleanup pass

**Files:**
- Modify (if needed): `src/app/page.tsx`, `src/app/globals.css`, `src/app/page.test.tsx`

- [ ] **Step 1: Run focused accessibility sanity checks in unit scope**

Run: `npm test -- src/app/page.test.tsx`  
Expected: PASS and heading structure remains queryable by role/level.

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: Next.js build completes successfully with no blocking errors.

- [ ] **Step 3: Verify final homepage flow manually in dev server**

Run: `npm run dev`  
Expected: Hero -> outcomes -> advisory loop -> before/after -> FAQ -> final CTA renders in sequence and `Get early access` opens modal at top and bottom.

- [ ] **Step 4: Commit any final polishing edits**

```bash
git add src/app/page.tsx src/app/globals.css src/app/page.test.tsx src/app/home-*.tsx
git commit -m "feat(home): finalize warm advisory homepage redesign"
```

---

## Self-Review Checklist (Completed)

- Spec coverage: All approved spec sections are represented by explicit tasks and file-level ownership.
- Placeholder scan: No TODO/TBD placeholders remain in tasks, commands, or code examples.
- Type consistency: New component names and class hooks are consistent across creation, integration, and test tasks.
