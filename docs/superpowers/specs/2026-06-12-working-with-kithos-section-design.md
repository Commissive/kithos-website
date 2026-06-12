# "Working with Kithos" section — design

**Date:** 2026-06-12
**Replaces:** the "How it works" content of `RevenuePathSection` (`src/app/revenue-path-section.tsx`), same page slot (last section inside `SiteGridPanel`, after `StackSection`).

## Problem

The current section ("How it works" / "The four jobs run on one loop") restates Research → Act → Remember as abstract prose. Everything it claims is already demonstrated concretely by the capability section's artifacts (account brief, draft outreach, next best action, playbook update), so the section reads as empty repetition and never answers the questions the rest of the page leaves open.

## The section's job

Answer, in benefit terms, the visitor's post-capability questions:

1. **Does it actually understand my business?** Kithos holds a living picture of the company, customers, and commercial lifecycle — researches new information, learns from patterns, commits everything to memory. This is the loudest claim of the section (headline-level).
2. **What is my relationship to it?** It prepares work; you approve; it executes and writes back. Nothing reaches a buyer without you.
3. **Does it compound?** Outcomes become memory; memory makes the next move better.

Competitive grounding: Monaco, Reevo, and Airspeed all skip explainer-style "how it works" sections; Airspeed's pattern (benefit headline, restrained concreteness) is the model. Per the site-wide rule, the section is benefit-led — no mechanism walkthrough.

## Content (final copy, variant A — understanding-led)

- **Eyebrow:** `Working with Kithos` (plain text)
- **Headline:** `It knows your business end to end.` — `end to end.` wrapped in `<em>`, matching the sibling-section idiom
- **Subhead:** `Kithos holds a living picture of your company, your customers, and your whole commercial lifecycle — researching what's new, learning from what worked, and remembering all of it.`
- **Three copy-only cards** (title + body, no vignettes, no imagery/SVG):
  1. **Never starts cold** — `It already knows the account's history, the buyer's world, and what changed this week — drawn from your tools and fresh research, not a blank prompt.`
  2. **Acts on your say-so** — `Every prepared move comes with the reasoning behind it. Approve and it's done — sent, logged, scheduled. Nothing reaches a buyer without you.`
  3. **Never forgets** — `Every reply, objection, win, and loss is committed to memory. Patterns become playbook — so each move starts further ahead than the last.`

### Removed

- "How it works" eyebrow and "The four jobs run on one loop" headline/subhead.
- The Research / Act / Remember card copy.
- The loop motif (rule + up arrow + "Outcomes feed the next move") in `reasoning-steps.tsx`, including its CSS — the learning loop is covered by "Learn what to repeat" in the capability section and by card 3 here.

## Visual & structural decisions

- **Copy-only.** No vignettes, screenshots, or SVG. The capability section is the page's one image-heavy product moment; this section closes the page calm. Keeps page weight flat.
- **Surface: bone field.** The dark forest surface goes. The section sits on a bone ground (warm paper) with ink body text, forest titles, and terracotta `<em>` accents — the page's only bone surface, completing the four-colour brand palette at surface level. Late-page rhythm becomes: tinted capability stages → bone act → light FAQ → ink footer card (which remains the page's dark close).
- **Staging: ledger rows.** Three full-width rows separated by hairline rules — display-size title on the left, body on the right. No boxes, cards, or arrow separators; typography and rules carry the design.
- **Mobile:** rows collapse to stacked title-above-body groups with the hairline rules retained, per the native-mobile idiom (no shrunken desktop).
- **Cohesion:** eyebrow → headline → body structure as required everywhere; existing scroll-reveal entrance treatment is kept.

## Implementation shape

- Rename `revenue-path-section.{tsx,css}` → `working-with-kithos-section.{tsx,css}`; section `id` and CSS class prefixes follow (`working-with-kithos`). Nothing links to the `#revenue-path` anchor (verified: no nav/footer references), so the rename is safe.
- The ledger rows are new markup local to the section. `ReasoningStepItems` (`reasoning-steps.{tsx,css}`) loses its only consumer — verify and delete it, including the loop block and the `data-revenue-path-loop` animation hooks.
- Section CSS swaps the dark-surface token inversion (`--bg: var(--forest-pressed)` etc.) for a bone-surface token set; row rules use the local `--rule` token.
- Update `page.tsx` import and `revenue-path-section.test.tsx` (rename + assert new eyebrow/headline/row copy, assert loop motif is gone).

## Out of scope (noted, not included)

- Revising the capability section's "Act" copy ("recommends the next move"), which reads alert-posture next to card 2's act-posture. Separate, later decision.

## Testing

- Component test asserts: eyebrow "Working with Kithos", headline text, three card titles/bodies, absence of "Outcomes feed the next move".
- Existing page test (`page.test.tsx`) updated if it references the old section.
- `npm test` green; manual check of desktop row and mobile stacking.
