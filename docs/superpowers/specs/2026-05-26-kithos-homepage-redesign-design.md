# Kithos Homepage Redesign Design Spec

Date: 2026-05-26  
Owner: Kithos Marketing Site  
Status: Approved for planning

## 1) Objective

Redesign the Kithos homepage to increase early-access conversions from Revenue/GTM leads at early-stage startups, while preserving a warm, collaborative, advisory tone.

Primary conversion action: `Get early access`.

## 2) Audience and Positioning

### Primary audience
- Revenue/GTM leads at early-stage startups

### Core positioning
- Kithos is a commercial reasoning partner that helps teams make sharper revenue decisions with less guesswork.

### Voice and tone
- Warm and collaborative
- Human and advisory
- Clear and outcome-focused (no hype-heavy AI language)

## 3) Success Criteria

### Business outcomes
- Higher click-through on primary CTA (`Get early access`)
- More qualified early-access requests
- Lower bounce after the hero section

### UX outcomes
- Visitors understand Kithos value in under 10 seconds
- Visitors can explain "how Kithos helps" after one pass through the page
- Visitors encounter clear trust/proof signals before mid-page

## 4) Information Architecture

Homepage section sequence:

1. Hero (decision-confidence promise)
2. Outcome Proof Band (immediate trust)
3. Advisory Loop Section (how Kithos works)
4. Before/After Section (operational contrast)
5. FAQ (objection handling)
6. Final CTA (warm urgency and conversion close)

## 5) Messaging Hierarchy

### Hero
- Promise confidence in commercial decisions
- Name the GTM pain: fragmented context, inconsistent decisions
- Use advisory language (helping teams, not replacing them)
- Primary CTA: `Get early access`
- Secondary action: `See how it works`

### Outcome Proof Band
- Show 3 concrete outcomes near the top:
  - Faster qualification decisions
  - More consistent deal strategy
  - Less context loss across meetings
- Write as capability -> practical result

### Advisory Loop
- Three-step model:
  - Understand context
  - Reason with evidence
  - Guide the next best move
- Keep step copy short and operational

### Before/After
- "Without Kithos" and "With Kithos" contrast
- Focus on daily GTM execution, not abstract brand claims

### FAQ
- Prioritize setup effort, data handling, fit, and time-to-value
- Reassuring but concise tone

### Final CTA
- Re-state value as a partnership invitation
- Keep pressure low and intent high

## 6) Visual Design Direction (2026-forward)

Design direction: editorial clarity with product confidence.

### System traits
- Warm depth over loud futurism
- Premium whitespace and clean scanning rhythm
- Calm motion and subtle texture

### Palette and surfaces
- Retain forest/bone foundation
- Add warm gradient depth for section transitions
- Use soft cards with restrained borders/elevation

### Typography
- Keep current scale foundation
- Improve hierarchy via weight/line-length tuning
- Preserve readability-first body copy measure

### Motion
- Purposeful micro-motion only (fade/rise, subtle depth cues)
- Full reduced-motion parity

## 7) Component Plan (Codebase Mapping)

### Keep
- Layout primitives: `PageShell`, `PageColumn`, `PageGrid`, `PageGridProse`
- Existing token and accessibility foundations in `globals.css`
- Access conversion flow (`AccessButton`, modal behavior)

### Restructure
- Recompose homepage order in `src/app/page.tsx` to match Section 4 IA
- Replace statement-only sections that do not add proof or clarity
- Refactor commercial-reasoning block into a clearer advisory-loop presentation

### Add or evolve components
- `OutcomeProofBand` (new)
- `AdvisoryLoopSection` (new, may absorb existing reasoning component logic)
- `BeforeAfterSection` (new)
- Updated `Hero` copy and CTA support
- FAQ refinement on homepage and/or tighter handoff to `/faq`

## 8) Content and Interaction Rules

- Every section must contribute to one of:
  - Value clarity
  - Trust proof
  - Conversion momentum
- Avoid technical jargon unless immediately translated to GTM impact
- Keep CTA labels consistent: `Get early access`
- Ensure heading levels are semantically correct and sequential
- Keep all interactive elements keyboard-accessible

## 9) Responsive and Accessibility Requirements

- Preserve strong narrative scan path on mobile first
- Keep critical proof above fold where feasible across common breakpoints
- Maintain focus visibility and contrast requirements
- Ensure no motion dependency for understanding core content

## 10) Validation Plan

### Functional checks
- CTA opens access flow in all sections where present
- Anchor links scroll to the right sections with existing offset behavior

### UX checks
- Copy pass for warmth + advisory tone consistency
- Reading pass for 10-second value comprehension

### Quality checks
- Existing tests in homepage component suite updated or extended
- Lint and test pass before implementation completion

## 11) Out of Scope

- Full rebrand or logo/mark redesign
- Multi-page IA overhaul beyond homepage and tightly-coupled FAQ handoff
- New backend workflows for lead processing

## 12) Recommended Implementation Phase Order

1. Recompose section order and placeholders in `page.tsx`
2. Implement `OutcomeProofBand` and `AdvisoryLoopSection`
3. Implement `BeforeAfterSection`
4. Rewrite hero/proof/CTA copy
5. Refine FAQ content and link behavior
6. Tune tokens/spacing/motion for final visual polish
7. Run accessibility/responsive/test verification
