import { Nav } from "../nav";
import { AccessButton } from "../access-modal";
import { Wordmark } from "../wordmark";
import { BrandMark } from "../brand-mark";
import { MetaStrip } from "../meta-strip";
import { TabbedSections } from "./tabbed-sections";
import { ScrollStatement } from "./scroll-statement";

/* Alternate site — testbed at /v2. ElevenLabs section outlines
   rendered in Kithos's identity. Self-contained (no shared section
   components) so iterating here never affects /. */

/* The page-level structural frame — vertical rails at the
   content-column edges, top/bottom hairlines bracketing main, and
   crosshair ticks where they intersect. These are PAGE decoration,
   not component borders; the no-borders rule applies only at the
   component level. Decorative, aria-hidden. */
function GridTick({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--rule-strong)]" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--rule-strong)]" />
    </span>
  );
}

/* Ticks where a section's top edge crosses the page rails. Drop in
   as the first child of any section that should be anchored to the
   grid. */
function SectionRuleTicks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
    >
      <div className="relative mx-auto h-0 max-w-[86rem]">
        <GridTick className="left-0 top-0" />
        <GridTick className="left-full top-0" />
      </div>
    </div>
  );
}

/* HERO (v2) — flat editorial section on the page bone surface.
   Vertically centred via min-h: var(--hero-min-h); content lives on
   the same 86rem rail as the rest of the page so the site-wide
   vertical grid runs continuously through it. */
function Hero() {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative w-full overflow-hidden bg-[var(--forest-tint)]"
    >
      {/* Padding sits INSIDE the 86rem container — matches MotionStatement
          and ClosingBand so the hero copy starts on the same x as every
          other section's copy (40px in from the site rails). flex-center
          + min-h give the fold-filling presence. */}
      <div className="relative mx-auto flex min-h-[var(--hero-min-h)] w-full max-w-[86rem] flex-col justify-center px-6 md:px-10">
        {/* Decorative pentagon outline — same chamfered TL silhouette
            used in TabbedSections, stroked in --forest-soft as a
            quiet brand echo to balance the left-aligned content
            block. lg+ only; mobile keeps the hero clean. */}
        <svg
          aria-hidden
          viewBox="17.32 17.32 39.68 39.68"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 md:right-10"
          style={{
            width: "min(90svh, 55vw, 900px)",
            height: "min(90svh, 55vw, 900px)",
          }}
        >
          <path
            d="M 54.840 17.320 A 2.160 2.160 0 0 1 57.000 19.480 L 57.000 53.000 A 4.000 4.000 0 0 1 53.000 57.000 L 19.480 57.000 A 2.160 2.160 0 0 1 17.320 54.840 L 17.320 54.840 A 2.160 2.160 0 0 1 18.847 51.153 L 51.153 18.847 A 2.160 2.160 0 0 1 54.840 17.320 Z"
            stroke="var(--forest)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="max-w-[54rem]">
          <h1
            id="hero-headline"
            className="rise rise-2 v2-display text-[var(--ink)]"
          >
            {/* No whitespace-nowrap: at the clamp's mobile floor the
                second line is wider than the viewport's content column.
                Block spans keep the intended two-line break on md+; the
                second line is allowed to wrap on the narrowest widths. */}
            <span className="block">Revenue,</span>
            <span className="block">without the guesswork.</span>
          </h1>
          <p className="rise rise-3 lead mt-6 max-w-[46ch] text-[var(--ink-soft)]">
            Kithos is the commercial agent that helps B2B teams turn
            scattered go-to-market context into a clear path to revenue.
          </p>
          <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <AccessButton size="lg" tone="forest" className="v2-lift" />
            <a
              href="#right-now"
              className="v2-ulink inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-[var(--ink)] transition-colors hover:text-[var(--ink-soft)]"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Below-the-fold — single focal statement establishing the page's
   tension before TabbedSections explains the answer. Static (the
   prior scroll-pinned word-by-word reveal was dropped — too much
   scroll budget for the payoff). */
function KithosBand() {
  return (
    <ScrollStatement
      headline="Sell with confidence."
      body={[
        "You built for someone. You shouldn't need six tools to find them, or GTM based on vibes.",
        "Kithos helps your team win deals it would otherwise lose. Know what opportunities deserve attention, and get the full gist of what's happening and what should happen next.",
      ]}
    />
  );
}


/* Synthesis statement — a single confident line that ties the
   sections together before the closing CTA. */
function MotionStatement() {
  return (
    <section className="relative w-full bg-[var(--surface)] py-[var(--section-pad-y-spacious)]">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <h2 className="v2-statement max-w-[18ch]">
          Go from scattered work to a self-improving revenue motion.
        </h2>
      </div>
    </section>
  );
}

/* Outline C — terracotta finale dominated by an oversized wordmark
   (ElevenLabs footer treatment), rendered in Kithos's accent system.
   CTA up top, giant brand lockup below, meta strip on the base. */
function ClosingBand() {
  return (
    <section
      id="access"
      data-on-accent
      className="flex min-h-[100svh] flex-col bg-[var(--accent)] text-[var(--on-accent)]"
      style={
        {
          "--mark-tile": "var(--on-accent)",
          "--mark-cutout": "var(--bg)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-1 flex-col justify-center px-6 py-[var(--section-pad-y)] md:px-10">
        <span className="label" style={{ color: "var(--on-accent-soft)" }}>
          Get early access
        </span>
        <h2 className="v2-display mt-6 max-w-[20ch] text-[var(--on-accent)]">
          Make the next decision sharper than the last.
        </h2>
        <div className="mt-12">
          <AccessButton size="lg" tone="on-accent" />
        </div>
      </div>

      {/* Oversized wordmark lockup — the finale focal point. Tone-on-
          tone so it reads as architecture, not a second CTA. */}
      <div className="md:relative">
        <div
          className="mx-auto flex w-full max-w-[86rem] items-end gap-5 px-6 sm:gap-6 md:gap-8 md:px-10"
          style={
            {
              "--mark-tile":
                "color-mix(in oklch, var(--accent) 88%, var(--accent-ink) 12%)",
              "--mark-cutout": "var(--accent)",
              color:
                "color-mix(in oklch, var(--accent) 88%, var(--accent-ink) 12%)",
            } as React.CSSProperties
          }
        >
          <BrandMark className="h-16 w-16 shrink-0 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-44 lg:w-44" />
          <Wordmark className="h-16 w-auto shrink-0 sm:h-24 md:h-32 lg:h-44" />
        </div>

        <div className="mx-auto mt-12 w-full max-w-[86rem] px-6 pb-6 sm:mt-14 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-10 md:pb-8">
          <MetaStrip />
        </div>
      </div>
    </section>
  );
}

export default function V2Page() {
  return (
    <>
      <Nav />
      {/* The structural frame spans EVERYTHING below the nav —
          main + ClosingBand — so the rails read as a site-wide grid
          rather than stopping at the editorial body. Wrapper is
          position-relative so the frame's absolute overlay covers
          both children. */}
      <div className="relative">
        <main id="main">
          <Hero />
          <KithosBand />
          <TabbedSections />
          <MotionStatement />
        </main>
        <ClosingBand />
        {/* Vertical rails at the 86rem column edges + corner
            crosshair ticks. z-10 sits above section bgs and below
            the nav. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 px-6 md:px-10"
        >
          <div className="relative mx-auto h-full max-w-[86rem] border-x border-[var(--rule)]">
            <GridTick className="left-0 top-0" />
            <GridTick className="left-full top-0" />
            <GridTick className="left-0 top-full" />
            <GridTick className="left-full top-full" />
          </div>
        </div>
        {/* Top/bottom hairlines bracketing the framed area. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[var(--rule)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[var(--rule)]"
        />
      </div>
    </>
  );
}
