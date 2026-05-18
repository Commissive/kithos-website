import { Nav } from "../nav";
import { AccessButton } from "../access-modal";
import { Wordmark } from "../wordmark";
import { MetaStrip } from "../meta-strip";
import { TabbedSections } from "./tabbed-sections";

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

/* HERO (v2) — top-anchored single-column statement, then a full-width
   thesis visualization below (Ramp/Cursor pattern) so the lower hero
   carries weight. /v2-only; the design system and / are untouched. */
function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[var(--bg)] pt-12 pb-24 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32">
      {/* v1 hero grid — bounded to the content column so its edges and
          lines align to the site's vertical rails. A vertical mask keeps
          the upper (text) zone plain; the grid fades in beneath it and
          softens at the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 px-6 md:px-10"
      >
        <div
          className="mx-auto h-full max-w-[78rem]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--rule) 1px, transparent 1px),
              linear-gradient(to bottom, var(--rule) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 38%, black 60%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 38%, black 60%, black 94%, transparent 100%)",
            opacity: 0.7,
          }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <div className="max-w-[46rem] py-4 md:py-6">
          {/* Primary display register (.v2-display); explicit
              two-line break for a deliberate set. */}
          <h1 className="rise rise-2 v2-display">
            <span className="block">Revenue,</span>
            <span className="block">without the guesswork.</span>
          </h1>
          <p className="rise rise-3 lead mt-6 max-w-[42ch] text-[var(--ink-soft)]">
            Kithos is the commercial agent that helps early B2B teams
            find a clear path to revenue.
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
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Integration grid — the Fin treatment. The Kithos mark occupies a
   large central 3×3 tile, framed by 12 unique logo tiles, and the
   ruled lattice keeps drawing outward in every direction as empty
   cells that dissolve under a radial mask — so the grid bleeds into
   the section background rather than ending at a hard edge.
   Static, decorative.

   The lattice is N×N (odd, so the 3×3 centre is dead-centre). Only
   the centre and the 12 frame cells carry content; every other cell
   is an empty ruled square continuing the pattern. The 12 unique
   marks (no repeats) hug the centre: 3 across the top, 3 across the
   bottom, 3 down each side, aligned to the Kithos tile's 3-cell
   extent. Every cell is placed explicitly so the Kithos span never
   shifts the lattice (grid auto-flow would). */
const N = 9;
const C0 = 3; // centre 3×3 spans rows/cols 3..5 (0-indexed)
const C1 = 5;

/* src by `${row},${col}` for the 12 frame cells (the ring just
   outside the Kithos tile, aligned to its 3-cell extent). */
const FRAME_LOGOS: Record<string, string> = {
  // top
  "2,3": "/logos/chatgpt.svg",
  "2,4": "/logos/salesforce.svg",
  "2,5": "/logos/gmail.svg",
  // right
  "3,6": "/logos/gong.svg",
  "4,6": "/logos/hubspot.svg",
  "5,6": "/logos/apollo-icon.svg",
  // bottom
  "6,3": "/logos/claude-icon.svg",
  "6,4": "/logos/slack-mark.svg",
  "6,5": "/logos/notion.svg",
  // left
  "3,2": "/logos/linkedin.svg",
  "4,2": "/logos/zoominfo.svg",
  "5,2": "/logos/Google_Google_Sheets_6.svg",
};

/* One uniform optical box for every mark, as a % of the cell, anchored
   to the Slack icon (a full-bleed square mark used as the size
   reference). object-contain keeps each mark inside this box, so every
   logo reads at the same size as Slack regardless of source viewBox. */
const LOGO_FILL = "50%";

/* Fixed cell size in px. The grid is intrinsic (9 × CELL), not fluid,
   so every square is exactly CELL×CELL and the Kithos 3×3 is 3·CELL. */
const CELL = 80;

function IntegrationGrid() {
  const cellBorder = "border-r border-b border-[var(--rule)]";
  const cells = [];

  // Kithos — the large highlighted centre, a 3×3 span.
  cells.push(
    <div
      key="kithos"
      className="flex items-center justify-center border-r border-b border-[var(--rule)]"
      style={{ gridColumn: `${C0 + 1} / ${C1 + 2}`, gridRow: `${C0 + 1} / ${C1 + 2}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon-y.svg" alt="" aria-hidden className="h-[42%] w-[42%]" />
    </div>
  );

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      // Skip the cells the Kithos 3×3 occupies.
      if (row >= C0 && row <= C1 && col >= C0 && col <= C1) continue;
      const place = { gridColumn: col + 1, gridRow: row + 1 };
      const src = FRAME_LOGOS[`${row},${col}`];
      if (src) {
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`flex items-center justify-center ${cellBorder}`}
            style={place}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden
              style={{
                width: LOGO_FILL,
                height: LOGO_FILL,
                objectFit: "contain",
              }}
            />
          </div>
        );
        continue;
      }
      // Empty ruled square — continues the lattice outward; the mask
      // fades it the further it is from the centre.
      cells.push(
        <div key={`${row}-${col}`} className={cellBorder} style={place} />
      );
    }
  }

  return (
    <div
      aria-hidden
      className="inline-grid border-t border-l border-[var(--rule)]"
      style={{
        gridTemplateColumns: `repeat(${N}, ${CELL}px)`,
        gridAutoRows: `${CELL}px`,
        WebkitMaskImage:
          "radial-gradient(closest-side, black 56%, transparent 94%)",
        maskImage:
          "radial-gradient(closest-side, black 56%, transparent 94%)",
      }}
    >
      {cells}
    </div>
  );
}

/* Below-the-fold — a dark integrations beat: the value statement left,
   the stack-with-Kithos-at-the-centre grid right. Full viewport. */
function KithosBand() {
  return (
    <section
      id="right-now"
      className="relative flex min-h-[100svh] w-full scroll-mt-20 flex-col overflow-x-clip border-t border-[var(--rule)] bg-[var(--surface)] pt-[clamp(2rem,6svh,4rem)] lg:h-[100svh] lg:min-h-[40rem] lg:overflow-hidden"
    >
      <SectionRuleTicks />
      <div className="flex flex-1 flex-col px-6 md:px-10 lg:min-h-0">
        {/* Rail-aligned frame: its edges sit exactly on the page's
            vertical rails (same geometry as the site-wide grid), so
            every rule drawn on it connects to the page outline. */}
        <div className="relative mx-auto flex w-full max-w-[78rem] flex-1 flex-col">
          {/* Top slice — eyebrow (left) and header (right), split on
              the same 50% line as the divide below so the columns line
              up. The bottom rule spans the full frame, meeting the two
              vertical rails; GridTicks mark the junctions (same
              crosshair the page outline uses). Pinned (shrink-0). */}
          <div className="relative shrink-0 border-b border-[var(--rule)]">
            <div className="grid grid-cols-1 gap-y-3 pb-[clamp(1.25rem,4svh,2.75rem)] lg:grid-cols-2 lg:items-center lg:gap-y-0">
              <div className="px-6 md:px-10 lg:pr-10">
                <span className="label">Find your revenue motion</span>
              </div>
              <div className="px-6 md:px-10 lg:pl-10">
                <h2 className="v2-heading max-w-[24ch]">
                  Kithos helps your team win deals it would otherwise not.
                </h2>
              </div>
            </div>
            <GridTick className="left-0 top-full" />
            <GridTick className="left-full top-full" />
          </div>
          {/* Bottom — body | illustration. The vertical divide is a
              full-height rail meeting the header rule and the section
              base; GridTicks mark both junctions. On narrow screens
              the columns stack and the divide is a horizontal rule. */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:min-h-0 lg:flex-1 lg:overflow-hidden">
            <div className="border-b border-[var(--rule)] px-6 pt-[clamp(1.25rem,4svh,2.75rem)] pb-[clamp(1.25rem,4svh,2.75rem)] md:px-10 lg:border-r lg:border-b-0 lg:pb-0 lg:pr-10">
              <p className="lead max-w-[44ch] text-[var(--ink-soft)]">
                See where revenue is most likely to come from, which
                opportunities deserve attention, and what should happen
                next.
              </p>
            </div>
            <div className="flex items-center justify-center pt-[clamp(1.25rem,4svh,2.75rem)] lg:min-h-0 lg:overflow-hidden lg:pl-10 lg:pt-0">
              {/* Fixed-size lattice (80px cells). Vertically centred
                  in the space below the header and clipped there, so
                  the header is never pushed off-screen; the radial
                  mask dissolves the outer cells. */}
              <IntegrationGrid />
            </div>
            <GridTick className="left-1/2 top-0 hidden lg:block" />
            <GridTick className="left-1/2 top-full hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reversed brand mark — ink tile, light hex. Colours driven by
   --mark-tile / --mark-cutout so it adapts per surface. Minimal copy
   of the page.tsx mark, kept local to /v2. */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" aria-hidden className={className}>
      <rect width="240" height="240" rx="12" fill="var(--mark-tile)" />
      <g transform="scale(2)">
        <path
          d="M 18 18 L 68 18 L 102 52 L 102 102 L 52 102 L 18 68 Z"
          fill="var(--mark-cutout)"
        />
      </g>
    </svg>
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
      <main id="main" className="relative">
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
