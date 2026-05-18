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
          {/* Headline overrides the shared .display-1 weight (500) with
              Figtree 400 + near-zero tracking for a light register.
              Explicit two-line break for a deliberate set. */}
          <h1 className="rise rise-2 display-1 font-normal tracking-[-0.005em] text-[clamp(2rem,3.4vw,3rem)]">
            <span className="block">Revenue,</span>
            <span className="block">without the guesswork.</span>
          </h1>
          <p className="rise rise-3 lead mt-6 max-w-[42ch] text-[var(--ink-soft)]">
            Kithos helps product-focused teams turn scattered commercial
            context into a clear path to revenue.
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

/* Integration grid — sales-stack logos in a matrix with the Kithos
   mark highlighted at the centre (fin.ai-style treatment, rendered in
   Kithos's identity). Static, decorative. */
const STACK_LOGOS = [
  "/logos/salesforce.svg",
  "/logos/hubspot.svg",
  "/logos/linkedin.svg",
  "/logos/gmail.svg",
  "/logos/slack.svg",
  "/logos/zoominfo.svg",
  "/logos/gong.svg",
  "/logos/apollo.svg",
];

function IntegrationGrid() {
  return (
    <div
      aria-hidden
      className="grid grid-cols-3 gap-2"
      style={{
        WebkitMaskImage:
          "radial-gradient(125% 125% at 50% 50%, black 56%, transparent 100%)",
        maskImage:
          "radial-gradient(125% 125% at 50% 50%, black 56%, transparent 100%)",
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => {
        if (i === 4) {
          // Highlighted centre — the actual Kithos brand icon on file.
          return (
            <div
              key="kithos"
              className="relative flex aspect-square items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon-y.svg"
                alt=""
                aria-hidden
                className="h-[78%] w-[78%]"
              />
            </div>
          );
        }
        const logo = STACK_LOGOS[i < 4 ? i : i - 1];
        return (
          <div
            key={i}
            className="relative flex aspect-square items-center justify-center border border-[var(--rule)] bg-[var(--bg)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt=""
              aria-hidden
              className="h-7 w-7 object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}

/* Below-the-fold — a dark integrations beat: the value statement left,
   the stack-with-Kithos-at-the-centre grid right. Full viewport. */
function KithosBand() {
  return (
    <section
      id="right-now"
      className="relative flex min-h-[100svh] w-full scroll-mt-20 flex-col justify-center border-t border-[var(--rule)] bg-[var(--surface)] py-20"
    >
      <SectionRuleTicks />
      <div className="mx-auto grid w-full max-w-[78rem] grid-cols-12 items-center gap-x-8 gap-y-14 px-6 md:px-10">
        <div className="col-span-12 lg:col-span-5">
          <span className="label">Find your revenue motion</span>
          <h2 className="display-3 mt-6 max-w-[16ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em]">
            Kithos helps your team win deals it would otherwise not.
          </h2>
          <p className="lead mt-6 max-w-[44ch] text-[var(--ink-soft)]">
            See where revenue is most likely to come from, which
            opportunities deserve attention, and what should happen next.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="mx-auto w-full max-w-[26rem]">
            <IntegrationGrid />
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
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--surface)] py-24 md:py-32 lg:py-40">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <h2 className="display-2 max-w-[18ch] text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[-0.005em]">
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
      <div className="mx-auto flex w-full max-w-[78rem] flex-1 flex-col justify-center px-6 py-20 md:px-10 md:py-28">
        <span className="label" style={{ color: "var(--on-accent-soft)" }}>
          Get early access
        </span>
        <h2 className="display-2 mt-6 max-w-[20ch] text-[clamp(2rem,3.4vw,3rem)] font-normal tracking-[-0.005em] text-[var(--on-accent)]">
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
