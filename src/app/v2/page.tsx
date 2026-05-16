import { Nav } from "../nav";
import { AccessButton } from "../access-modal";
import { Wordmark } from "../wordmark";
import { MetaStrip } from "../meta-strip";
import { HeroInstance } from "./hero-instance";

/* Alternate site — testbed at /v2. ElevenLabs section outlines
   rendered in Kithos's identity. Self-contained (no shared section
   components) so iterating here never affects /. */

/* Hero instance — the thesis in motion. Implemented as a client
   component (cinematic build via WAAPI + pointer parallax over an
   SSR-safe static composition). See ./hero-instance. */

/* HERO (v2) — top-anchored single-column statement, then a full-width
   thesis visualization below (Ramp/Cursor pattern) so the lower hero
   carries weight. /v2-only; the design system and / are untouched. */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--bg)] pt-14 pb-14 md:pt-18 md:pb-16 lg:pt-20 lg:pb-20">
      {/* Fine dot matrix — restrained technical texture so the hero
          reads as a built surface. Fades out before the edges and
          never competes with type. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--rule) 1.1px, transparent 1.1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage:
            "radial-gradient(120% 110% at 50% 20%, black 45%, transparent 85%)",
          maskImage:
            "radial-gradient(120% 110% at 50% 20%, black 45%, transparent 85%)",
          opacity: 0.7,
        }}
      />
      <div className="relative mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <div className="max-w-[46rem]">
          {/* Headline overrides the shared .display-1 weight (500) with
              Figtree 400 + near-zero tracking for a light register.
              Explicit two-line break for a deliberate set. */}
          <h1 className="rise rise-2 display-1 font-normal tracking-[-0.005em] text-[clamp(2rem,3.4vw,3rem)]">
            <span className="block whitespace-nowrap">Revenue,</span>
            <span className="block whitespace-nowrap">without the guesswork.</span>
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
              className="v2-ulink text-[0.9375rem] font-medium text-[var(--ink)] transition-colors hover:text-[var(--ink-soft)]"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="rise rise-4 mt-10 md:mt-12">
          <HeroInstance />
        </div>
      </div>
    </section>
  );
}

/* Outline A — asymmetric feature band (ElevenLabs el-s2): plain-text
   eyebrow → big headline left (7 cols) / supporting prose right (5
   cols). Rendered in Kithos's type system and neutrals. */
function FeatureBand({
  id,
  eyebrow,
  headline,
  children,
  surface = false,
}: {
  id?: string;
  eyebrow: string;
  headline: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      className={`w-full scroll-mt-20 ${
        surface ? "bg-[var(--surface)]" : "bg-[var(--bg)]"
      } py-28 md:py-36 lg:py-44`}
    >
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <span className="label">{eyebrow}</span>
        <div className="mt-10 grid grid-cols-12 gap-x-8 gap-y-8 md:mt-12">
          <h2 className="display-3 col-span-12 max-w-[20ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em] lg:col-span-7">
            {headline}
          </h2>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function RightNowBand() {
  return (
    <FeatureBand
      id="right-now"
      eyebrow="Right now"
      headline="Teams are making revenue decisions from fragments."
      surface
    >
      <p className="lead max-w-[46ch] text-[var(--ink-soft)]">
        Where to focus, who matters, why they should care, and how to move
        deals forward. The context is split across CRM fields, call notes,
        inboxes, Slack threads, spreadsheets, decks, and individual memory.
      </p>
      <p className="body mt-5 max-w-[46ch] text-[var(--ink-soft)]">
        The stack records activity but without a system that ties it all
        together, deals get lost, lessons do not compound, and the team
        does not scale.
      </p>
    </FeatureBand>
  );
}

function KithosBand() {
  return (
    <FeatureBand
      eyebrow="Kithos"
      headline="Kithos helps your team win deals it would otherwise lose."
    >
      <p className="lead max-w-[50ch] text-[var(--ink-soft)]">
        Kithos learns your product, market, customers, accounts, and
        outcomes, then turns that context into clearer commercial
        decisions. The team sees where revenue is most likely to come
        from, which opportunities deserve attention, and what should
        happen next — while every outcome makes the next decision sharper.
      </p>
      <dl className="mt-10 grid grid-cols-3 gap-x-6 border-t border-[var(--rule)] pt-6">
        {[
          ["For", "Early B2B teams"],
          ["Job", "Commercial reasoning"],
          ["Shape", "Sharper with every outcome"],
        ].map(([dt, dd]) => (
          <div key={dt}>
            <dt className="label">{dt}</dt>
            <dd className="body-sm mt-1.5 text-[var(--ink)]">{dd}</dd>
          </div>
        ))}
      </dl>
    </FeatureBand>
  );
}

/* Outline B — centered headline → horizontal card row (ElevenLabs
   el-s3). The four steps as tone-paired tint cards. */
const steps = [
  {
    n: "01",
    title: "Focus the team.",
    body:
      "Kithos surfaces which segments, accounts, and opportunities deserve attention now — and which to deprioritise.",
    tint: "var(--tint-mint)",
  },
  {
    n: "02",
    title: "Move the right deals.",
    body:
      "For each account, Kithos clarifies who matters, why they should care, and what should happen next.",
    tint: "var(--tint-peach)",
  },
  {
    n: "03",
    title: "Make learning travel.",
    body:
      "Outcomes become shared commercial memory. New hires inherit context and patterns, not just CRM activity.",
    tint: "var(--tint-sky)",
  },
  {
    n: "04",
    title: "Improve the motion.",
    body:
      "Every account, meeting, objection, win, and loss feeds back in to sharpen the next move.",
    tint: "var(--tint-sand)",
  },
];

function HowItWorksBand() {
  return (
    <section className="w-full bg-[var(--bg)] py-28 md:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="label">How it works</span>
          <h2 className="display-3 mt-6 max-w-[22ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em]">
            From scattered work to a self-improving revenue motion.
          </h2>
        </div>
        <ol className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-6 rounded-2xl p-8 lg:p-9"
              style={{ background: s.tint }}
            >
              <div
                className="font-display text-[2rem] font-normal leading-none text-[var(--ink)]"
                style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
              >
                {s.n}
              </div>
              <div>
                <h3 className="display-5 text-[var(--ink)]">{s.title}</h3>
                <p className="body-sm mt-3 text-[var(--ink-soft)]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
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
          "--mark-cutout": "#F6F5F1",
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
        @keyframes v2-flow{0%{offset-distance:0%;opacity:0}7%{opacity:1}80%{opacity:1}93%{opacity:.4}100%{offset-distance:100%;opacity:0}}
        .v2-flow{offset-rotate:0deg;animation:v2-flow 4.4s cubic-bezier(.45,0,.75,.85) infinite}
        @media (prefers-reduced-motion:reduce){
          html{scroll-behavior:auto}
          .v2-lift{transition:none}
          .v2-lift:hover,.v2-lift:active{transform:none}
          .v2-ulink::after{transition:none}
          .v2-flow{animation:none;opacity:1;offset-distance:0%}
        }
      `}</style>
      <Nav />
      <main id="main">
        <Hero />
        <RightNowBand />
        <KithosBand />
        <HowItWorksBand />
      </main>
      <ClosingBand />
    </>
  );
}
