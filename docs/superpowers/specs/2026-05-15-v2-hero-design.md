# /v2 — Alternate hero testbed

**Date:** 2026-05-15
**Status:** Approved design, pending spec review

## Purpose

Stand up an alternate version of the site at `/v2` to test new copy,
structure, and layout against the current home page. First pass is
hero-only: `Nav` + an alternate `Hero`, nothing else. The current site
at `/` is untouched.

## Scope

In scope:

- New route `src/app/v2/page.tsx`.
- Renders `<Nav />` then `<main id="main">` containing one alternate
  hero section. No other sections, no placeholders, no `Closing`.
- Alternate hero copy (header + subhead) and a retuned layout.

Out of scope:

- Any change to `/` or its components.
- Any refactor/extraction of the existing private section components
  (`RightNow`, `Kithos`, `HowItWorks`) — not needed, nothing below the
  hero on `/v2`.
- The existing throwaway `/preview` route — unrelated, left as-is.

## Route

`src/app/v2/page.tsx` — a server component mirroring the shell of
`src/app/page.tsx`:

```
<Nav />
<main id="main">
  <Hero />   {/* the alternate hero, local to this file */}
</main>
```

`Nav` and `AccessButton` are imported from the existing
`../nav` / `../access-modal`. The alternate `Hero` (and its
`HeroBackdrop`) is defined locally in `v2/page.tsx` — copied from the
current hero, not shared — so iterating on `/v2` never risks `/`.

## Hero — copy

- **Header:** `Revenue, without the guesswork.`
- **Subhead (final, verbatim):** "Kithos pulls together the scattered
  context behind your market, accounts, conversations, and outcomes,
  into sharper account decisions, stronger outreach, better meetings,
  and a sales motion that improves with every outcome."
- **CTA:** `<AccessButton size="lg" />` — unchanged from current hero.

## Hero — layout ("same bones, retuned")

Same structural elements as the current hero: hex-grid `HeroBackdrop`
anchored top-right (brand language, unchanged), left-aligned headline,
subhead, access button, same section padding and `max-w-[78rem]`
container.

Retuning, to suit a 4-word header:

- **Headline measure:** drop the `max-w-[16ch]` constraint so the short
  header sets on one/two lines at a larger effective size rather than
  wrapping like the current 5-word line. Keep the `display-1` class and
  `rise` entrance animation.
- **Subhead:** the supplied subhead is long (~38 words), so keep a
  readable measure comparable to the current hero (`max-w-[48ch]`,
  `text-[var(--ink-soft)]`, `lead`). Tighten the headline→subhead gap
  modestly (e.g. `mt-8` rather than `mt-10`) so header and subhead read
  as one unit under the larger headline.
- Everything else (backdrop, CTA spacing, `rise` stagger) matches the
  current hero.

## Verification

- `/v2` renders Nav + hero only; nothing below the hero.
- `/` and all its sections are byte-identical to before (no shared code
  touched).
- New header and exact subhead copy present.
- Hero is visually coherent in both light and dark (system) themes —
  the alternate hero reuses the same theme tokens, so this follows from
  reusing existing classes.

## Future iterations (not this pass)

Subsequent rounds will shape and add alternate versions of the
remaining sections to `/v2` as the user reacts to the hero. Each is its
own round; out of scope here.
