import { Nav } from "../nav";
import { AccessButton } from "../access-modal";
import { Wordmark } from "../wordmark";
import { MetaStrip } from "../meta-strip";

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
      </div>
    </section>
  );
}

/* Feature band — ElevenLabs el-s2: headline left, supporting prose
   right (asymmetric 7/5). Rendered in Kithos's type system. */
function FeatureBand({
  id,
  eyebrow,
  headline,
  children,
  surface = false,
}: {
  id?: string;
  eyebrow?: string;
  headline: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-20 border-t border-[var(--rule)] ${
        surface ? "bg-[var(--surface)]" : "bg-[var(--bg)]"
      } py-14 md:py-16 lg:py-20`}
    >
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        {eyebrow ? <span className="label">{eyebrow}</span> : null}
        <div
          className={`grid grid-cols-12 gap-x-8 gap-y-8 ${
            eyebrow ? "mt-10 md:mt-12" : ""
          }`}
        >
          <h2 className="display-3 col-span-12 text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em] lg:col-span-7">
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

/* Restrained line-art for the motion cards (ElevenLabs "Safety, built
   in" pattern, in Kithos's line language). Monochrome; one accent
   element each — the single accent, used assertively. */
function FocusArt() {
  const dots: [number, number][] = [
    [28, 30],
    [54, 64],
    [110, 26],
    [128, 70],
    [40, 86],
    [86, 90],
  ];
  return (
    <svg
      viewBox="0 0 160 110"
      fill="none"
      vectorEffect="non-scaling-stroke"
      shapeRendering="geometricPrecision"
      className="h-full w-full [&_*]:[vector-effect:non-scaling-stroke]"
    >
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="var(--muted)" />
      ))}
      <circle
        cx="88"
        cy="52"
        r="13"
        stroke="var(--accent)"
        strokeWidth="1.4"
      />
      <circle cx="88" cy="52" r="2.6" fill="var(--accent)" />
      <g stroke="var(--accent)" strokeWidth="1.2">
        <line x1="68" y1="52" x2="78" y2="52" />
        <line x1="98" y1="52" x2="108" y2="52" />
        <line x1="88" y1="32" x2="88" y2="42" />
        <line x1="88" y1="62" x2="88" y2="72" />
      </g>
    </svg>
  );
}
function LinkArt() {
  const src: [number, number][] = [
    [22, 22],
    [18, 58],
    [30, 92],
  ];
  const hub: [number, number] = [126, 55];
  return (
    <svg
      viewBox="0 0 160 110"
      fill="none"
      vectorEffect="non-scaling-stroke"
      shapeRendering="geometricPrecision"
      className="h-full w-full [&_*]:[vector-effect:non-scaling-stroke]"
    >
      <g stroke="var(--rule-strong)" strokeWidth="1">
        {src.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M ${x} ${y} C ${x + 60} ${y}, ${hub[0] - 55} ${hub[1]}, ${hub[0]} ${hub[1]}`}
          />
        ))}
      </g>
      {src.map(([x, y]) => (
        <circle key={`s-${x}-${y}`} cx={x} cy={y} r="2.4" fill="var(--muted)" />
      ))}
      <circle
        cx={hub[0]}
        cy={hub[1]}
        r="6"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
      />
      <circle cx={hub[0]} cy={hub[1]} r="2.4" fill="var(--accent)" />
    </svg>
  );
}
function PathArt() {
  return (
    <svg
      viewBox="0 0 160 110"
      fill="none"
      vectorEffect="non-scaling-stroke"
      shapeRendering="geometricPrecision"
      className="h-full w-full [&_*]:[vector-effect:non-scaling-stroke]"
    >
      <path
        d="M 20 86 C 50 86, 58 30, 96 30 S 130 64, 138 55"
        stroke="var(--muted)"
        strokeWidth="1.3"
        strokeDasharray="2 5"
      />
      <path
        d="M 20 86 C 50 86, 58 30, 96 30"
        stroke="var(--accent)"
        strokeWidth="1.6"
      />
      <path
        d="M 12 30 L 30 30 L 42 42 L 42 60 L 24 60 L 12 48 Z"
        transform="translate(96 0)"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
      <circle cx="20" cy="86" r="2.6" fill="var(--muted)" />
    </svg>
  );
}

function RightNowBand() {
  const cards = [
    {
      title: "Know where to focus.",
      body:
        "Most early teams are making revenue decisions from fragments: who to pursue, why they should care, what to say, and what to do next.",
      art: <FocusArt />,
    },
    {
      title: "Bring the context together.",
      body:
        "The evidence is split across CRM fields, call notes, inboxes, Slack, spreadsheets, decks, customer conversations, and founder memory.",
      art: <LinkArt />,
    },
    {
      title: "Move with more clarity.",
      body:
        "Kithos connects that context into sharper account decisions, stronger outreach, better meetings, and a motion that improves with every outcome.",
      art: <PathArt />,
    },
  ];
  return (
    <section
      className="relative w-full scroll-mt-20 border-t border-[var(--rule)] bg-[var(--bg)] py-28 md:py-36 lg:py-44"
    >
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <h2 className="display-3 max-w-[18ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em]">
          Find your revenue motion.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="flex h-full flex-col rounded-2xl border border-[var(--rule)] bg-[var(--surface)] px-6 py-6 md:px-7 md:py-7 lg:px-7 lg:py-8"
            >
              <div className="flex flex-1 items-center justify-center py-4 text-[var(--muted)]">
                <div className="aspect-[5/4] w-full max-w-[14rem]">
                  {c.art}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="display-5 font-normal tracking-[-0.005em] text-[var(--ink)]">
                  {c.title}
                </h3>
                <p className="body-sm mt-3 text-[var(--ink-soft)]">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KithosBand() {
  return (
    <FeatureBand
      id="right-now"
      headline="Kithos helps your team win deals it would otherwise not."
    >
      <p className="lead text-[var(--ink-soft)]">
        See where revenue is most likely to come from, which
        opportunities deserve attention, and what should happen next.
      </p>
    </FeatureBand>
  );
}

/* The four steps as a 2-column × 4-row list — step (left) / what it
   does (right), divided by hairlines to match the site's grid. */
const steps = [
  {
    n: "01",
    title: "Focus the team.",
    lead: "Kithos shows the team where to spend scarce commercial time.",
    body:
      "It surfaces which segments, accounts, and opportunities deserve attention now — and which to deprioritise — so effort lands on the deals most likely to move.",
  },
  {
    n: "02",
    title: "Move the right deals forward.",
    lead:
      "For each account, Kithos clarifies who matters, why they should care, and what should happen next.",
    body:
      "It turns context, signals, objections, and prior outcomes into a clear next move: what to send, who to involve, when to follow up, when to walk away.",
  },
  {
    n: "03",
    title: "Make learning travel.",
    lead:
      "Kithos turns individual outcomes into shared commercial memory.",
    body:
      "What happened, why it happened, and what worked becomes available across accounts, meetings, objections, wins, and losses. New hires inherit context and patterns, not just CRM activity.",
  },
  {
    n: "04",
    title: "Build a motion that improves.",
    lead:
      "Every account, meeting, objection, win, and loss feeds back in.",
    body:
      "Kithos finds the patterns that work for your team and uses them to sharpen the next move — across targeting, messaging, qualification, follow-up, and the playbook itself.",
  },
];

function HowItWorksBand() {
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--bg)] py-28 md:py-36 lg:py-44">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="label">How it works</span>
          <h2 className="display-3 mt-6 max-w-[22ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em]">
            From scattered work to a self-improving revenue motion.
          </h2>
        </div>
        <ol className="mt-16 border-t border-[var(--rule)] md:mt-20">
          {steps.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-1 gap-y-2 border-b border-[var(--rule)] py-9 md:grid-cols-[5fr_7fr] md:gap-y-0 md:py-0"
            >
              <div className="flex items-baseline gap-4 md:py-11 md:pr-12">
                <span
                  className="label shrink-0 text-[var(--muted)]"
                  style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                >
                  {s.n}
                </span>
                <h3 className="display-5 font-normal tracking-[-0.005em] text-[var(--ink)]">
                  {s.title}
                </h3>
              </div>
              <div className="max-w-[54ch] md:border-l md:border-[var(--rule)] md:py-11 md:pl-12">
                <p className="body-sm text-[var(--ink)]">{s.lead}</p>
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

/* New section — section header, then a 2-column body beneath it.
   Copy is placeholder; replace with real content. */
function DetailBand() {
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--bg)] py-28 md:py-36 lg:py-44">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <span className="label">Section eyebrow</span>
        <h2 className="display-3 mt-6 max-w-[24ch] text-[clamp(1.6rem,2.6vw,2.25rem)] font-normal tracking-[-0.005em]">
          Find the right accounts.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-y-10 md:mt-16 md:grid-cols-2">
          <div className="md:pr-12">
            <p className="lead max-w-[46ch] text-[var(--ink-soft)]">
              Early teams decide where revenue might come from using
              fragments scattered across CRM fields, call notes, inboxes,
              Slack, spreadsheets, decks, customer conversations, and
              founder memory.
            </p>
          </div>
          <div className="md:border-l md:border-[var(--rule)] md:pl-12">
            <p className="lead max-w-[46ch] text-[var(--ink-soft)]">
              Kithos learns your product, market, customers, accounts, and
              outcomes to show which opportunities deserve attention now —
              and which do not.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Cell art — one cohesive system across the four cells. A faint
   technical grid backdrop (depth, ties to the site grid), a consistent
   node/connector language with line-weight hierarchy, and one
   signal-yellow focal element. The four read as a progression:
   scatter → connect → converge → resolve. Crisp at any scale. */
function CellArt({ variant }: { variant: 0 | 1 | 2 | 3 }) {
  const node = (x: number, y: number, k: string) => (
    <circle key={k} cx={x} cy={y} r="2.6" fill="var(--muted)" />
  );
  const accent = (x: number, y: number) => (
    <g key="acc">
      <circle
        cx={x}
        cy={y}
        r="8"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
      />
      <circle cx={x} cy={y} r="3" fill="var(--accent)" />
    </g>
  );
  const link = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    k: string,
  ) => (
    <path
      key={k}
      d={`M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`}
      fill="none"
      stroke="var(--rule-strong)"
      strokeWidth="1"
    />
  );
  return (
    <svg
      viewBox="0 0 168 126"
      fill="none"
      shapeRendering="geometricPrecision"
      className="h-full w-full [&_*]:[vector-effect:non-scaling-stroke]"
    >
      <defs>
        <pattern
          id={`cg${variant}`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 14 0 H 0 V 14"
            fill="none"
            stroke="var(--rule)"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect
        width="168"
        height="126"
        fill={`url(#cg${variant})`}
        opacity="0.4"
      />
      {variant === 0 && (
        <>
          {[
            [30, 30],
            [122, 26],
            [54, 74],
            [138, 86],
            [40, 102],
          ].map(([x, y], i) => node(x, y, `n${i}`))}
          {accent(96, 56)}
        </>
      )}
      {variant === 1 && (
        <>
          {link(30, 36, 96, 34, "l0")}
          {link(140, 60, 96, 34, "l1")}
          {link(58, 96, 122, 100, "l2")}
          {[
            [30, 36],
            [140, 60],
            [58, 96],
            [122, 100],
          ].map(([x, y], i) => node(x, y, `n${i}`))}
          {accent(96, 34)}
        </>
      )}
      {variant === 2 && (
        <>
          {link(28, 28, 122, 70, "l0")}
          {link(22, 64, 122, 70, "l1")}
          {link(34, 100, 122, 70, "l2")}
          {[
            [28, 28],
            [22, 64],
            [34, 100],
          ].map(([x, y], i) => node(x, y, `n${i}`))}
          {accent(122, 70)}
        </>
      )}
      {variant === 3 && (
        <>
          {link(26, 40, 70, 63, "l0")}
          {link(26, 90, 70, 63, "l1")}
          <g transform="translate(36 13) scale(0.42)">
            <path
              d="M 36 36 L 136 36 L 204 104 L 204 204 L 104 204 L 36 136 Z"
              fill="none"
              stroke="var(--ink-soft)"
              strokeWidth="3.2"
              strokeLinejoin="miter"
            />
          </g>
          {accent(96, 63)}
        </>
      )}
    </svg>
  );
}

/* 4-cell grid, end-to-end. Each cell: header top-aligned, a shape in
   the middle, subhead + body bottom-aligned. Copy is placeholder. */
function CellGridBand() {
  const cells = [
    { header: "Cell one.", subhead: "Subhead one", body: "Body copy placeholder — replace with the real text." },
    { header: "Cell two.", subhead: "Subhead two", body: "Body copy placeholder — replace with the real text." },
    { header: "Cell three.", subhead: "Subhead three", body: "Body copy placeholder — replace with the real text." },
    { header: "Cell four.", subhead: "Subhead four", body: "Body copy placeholder — replace with the real text." },
  ];
  return (
    <section className="relative w-full border-t border-[var(--rule)] bg-[var(--bg)]">
      <SectionRuleTicks />
      <div className="mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {cells.map((c, i) => (
              <div
                key={c.header}
                className={`flex h-full min-h-[20rem] flex-col px-6 py-10 md:px-12 md:py-14 ${
                  i > 0 ? "border-t border-[var(--rule)] md:border-t-0" : ""
                } ${i % 2 === 1 ? "md:border-l md:border-[var(--rule)]" : ""} ${
                  i >= 2 ? "md:border-t md:border-[var(--rule)]" : ""
                }`}
              >
                <h3 className="display-5 font-normal tracking-[-0.005em] text-[var(--ink)]">
                  {c.header}
                </h3>
                <div className="flex flex-1 items-center justify-center py-8">
                  <div className="aspect-[4/3] w-full max-w-[9rem]">
                    <CellArt variant={i as 0 | 1 | 2 | 3} />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="body-sm font-medium text-[var(--ink)]">
                    {c.subhead}
                  </p>
                  <p className="body-sm mt-2 text-[var(--ink-soft)]">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Registration ticks at every grid crossing (ElevenAPI) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 hidden md:block"
          >
            <GridTick className="left-1/2 top-0" />
            <GridTick className="left-1/2 top-1/2" />
            <GridTick className="left-1/2 top-full" />
            <GridTick className="left-0 top-1/2" />
            <GridTick className="left-full top-1/2" />
          </div>
        </div>
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
        <RightNowBand />
        <HowItWorksBand />
        <DetailBand />
        <CellGridBand />
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
