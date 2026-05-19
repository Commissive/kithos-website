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

/* Registration tick — a small crosshair where grid rules intersect
   (ElevenLabs / draftsman convention; echoes the hex vertex marks).
   Anchor point is its centre; position via className. */
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

/* Ticks where a section's top rule crosses the two column rails.
   Drop in as the first child of a ruled section. */
function SectionRuleTicks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
    >
      <div className="relative mx-auto h-0 max-w-[78rem]">
        <GridTick className="left-0 top-0" />
        <GridTick className="left-full top-0" />
      </div>
    </div>
  );
}

/* HERO (v2) — full-viewport, vertically-centred single-column
   statement over a brand-native atmosphere: a warm low-chroma wash +
   a rail-bounded ruled grid + fine grain, the whole stack dissolving
   into --bg before the fold (getmodern.ai's "atmosphere behind the
   headline" mechanic, rendered in Kithos's own grid language instead
   of an illustration). Static/decorative. /v2-only. */
function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[var(--bg)] py-24 md:py-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Brand-aligned hero composition — the two-tone mark
            (forest pentagons + terracotta squares) blown up on the
            right as the decorative element. Per the brand kit, the
            two-tone variant is sanctioned as decorative only. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mark/mark-two-tone.svg"
          alt=""
          aria-hidden
          className="absolute right-[-12%] top-1/2 w-[78svh] max-w-[120%] -translate-y-1/2 md:right-[-6%] md:w-[88svh] lg:right-[-4%] lg:w-[96svh]"
        />
        {/* Final dissolve — the right-side mark fades into the page
            surface before the next section, no hard seam. */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />
      </div>
      {/* Lift the centred block up into the image's calm upper-left
          field (away from the rising lower-right texture). Visual
          shift only — keeps the section centring/layout intact. */}
      <div className="relative mx-auto w-full max-w-[78rem] -translate-y-[8vh] px-6 md:-translate-y-[10vh] md:px-10">
        <div className="max-w-[46rem] py-4 md:py-6">
          {/* Primary display register (.v2-display); explicit
              two-line break for a deliberate set. */}
          <h1 className="rise rise-2 v2-display">
            <span className="block">Revenue,</span>
            <span className="block">without the guesswork.</span>
          </h1>
          <p className="rise rise-3 lead mt-6 max-w-[46ch] text-[var(--ink-soft)]">
            Kithos is the commercial agent that helps B2B teams turn
            scattered go-to-market context into a clear path to revenue.
          </p>
          <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <AccessButton
              size="lg"
              className="v2-lift !border-transparent !bg-[var(--accent)] !text-[var(--accent-ink)] hover:!bg-[var(--accent-hover)]"
            />
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

/* Below-the-fold — the revenue-motion statement, revealed
   word-by-word on scroll (progressive brighten). Eyebrow retained;
   the integration grid moved to TabbedSections step 01. */
function KithosBand() {
  return (
    <ScrollStatement
      eyebrow="Find your revenue motion"
      text={"You built for someone.\nYou shouldn't need six tools to find them."}
      accent=""
    />
  );
}


/* Synthesis statement — a single confident line that ties the
   sections together before the closing CTA. */
function MotionStatement() {
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--surface)] py-[var(--section-pad-y-spacious)]">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <h2 className="v2-statement max-w-[18ch]">
          Go from scattered work to a self-improving revenue motion.
        </h2>
      </div>
    </section>
  );
}

/* Outline C — yellow finale dominated by an oversized wordmark
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
      <div className="mx-auto flex w-full max-w-[78rem] flex-1 flex-col justify-center px-6 py-[var(--section-pad-y)] md:px-10">
        <span className="label" style={{ color: "var(--on-accent-soft)" }}>
          Get early access
        </span>
        <h2 className="v2-display mt-6 max-w-[20ch] text-[var(--on-accent)]">
          Make the next decision sharper than the last.
        </h2>
        <div className="mt-12">
          <AccessButton size="lg" tone="filled" />
        </div>
      </div>

      {/* Oversized wordmark lockup — the finale focal point. Tone-on-
          tone so it reads as architecture, not a second CTA. */}
      <div className="md:relative">
        <div
          className="mx-auto flex w-full max-w-[78rem] items-end gap-5 px-6 sm:gap-6 md:gap-8 md:px-10"
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

        <div className="mx-auto mt-12 w-full max-w-[78rem] px-6 pb-6 sm:mt-14 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-10 md:pb-8">
          <MetaStrip />
        </div>
      </div>
    </section>
  );
}

export default function V2Page() {
  return (
    <>
      {/* Scoped /v2 styles: smooth in-page scroll + restrained delight
          (CSS-only, reduced-motion safe). / is unaffected. */}
      <style>{`
        html{scroll-behavior:smooth}
        /* /v2 light-display scale — the deliberate Figtree-400 +
           -0.005em register, defined once, on a 1.35 modular ratio.
           Three semantic roles anchored on the section heading so the
           ladder is consistent instead of per-section magic numbers. */
        .v2-statement,.v2-display,.v2-heading{font-family:var(--font-display);font-weight:400;letter-spacing:-0.005em;text-wrap:balance}
        .v2-statement{font-size:clamp(2.7rem,4.3vw,3.85rem);line-height:1.02}
        .v2-display{font-size:clamp(2rem,3.2vw,2.85rem);line-height:1.05}
        .v2-heading{font-size:clamp(1.5rem,2.4vw,2.125rem);line-height:1.12}
        .v2-lift{transition:transform .18s cubic-bezier(.25,1,.5,1),background-color .2s ease}
        .v2-lift:hover{transform:translateY(-2px)}
        .v2-lift:active{transform:translateY(0)}
        .v2-ulink{position:relative;text-decoration:none}
        .v2-ulink::after{content:"";position:absolute;left:0;right:0;bottom:-5px;height:1px;background:currentColor;opacity:.5;transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.25,1,.5,1)}
        .v2-ulink:hover::after{transform:scaleX(1)}
        @media (prefers-reduced-motion:reduce){
          html{scroll-behavior:auto}
          .v2-lift{transition:none}
          .v2-lift:hover,.v2-lift:active{transform:none}
          .v2-ulink::after{transition:none}
        }
      `}</style>
      <Nav />
      {/* Pull the page up under the sticky (transparent) nav so the
          hero atmosphere bleeds to the very top of the viewport,
          behind the nav. Nav stays z-50 + sticky, so it still floats
          over the hero and goes opaque on scroll. 88px clears the
          nav's measured height (~85px) at every breakpoint, so the
          hero reaches y=0. /v2-only; the shared Nav is untouched. */}
      <main id="main" className="relative -mt-[88px]">
        <Hero />
        <KithosBand />
        <TabbedSections />
        <MotionStatement />
        {/* Site-wide grid — thin continuous vertical rails at the
            content-column edges + page top/bottom rules, drawn over
            the section backgrounds (Stripe pattern). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 px-6 md:px-10"
        >
          <div className="relative mx-auto h-full max-w-[78rem] border-x border-[var(--rule)]">
            <GridTick className="left-0 top-0" />
            <GridTick className="left-full top-0" />
            <GridTick className="left-0 top-full" />
            <GridTick className="left-full top-full" />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[var(--rule)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[var(--rule)]"
        />
      </main>
      <ClosingBand />
    </>
  );
}
