import { Nav } from "./nav";
import { AccessButton } from "./access-modal";
import { Highlight } from "./highlight";
import { Wordmark } from "./wordmark";
import { BrandMark } from "./brand-mark";
import { MetaStrip } from "./meta-strip";
import { StackGrid } from "./stack-grid";

const features = [
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

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <RightNow />
        <Kithos />
        <HowItWorks />
      </main>
      <Closing />
    </>
  );
}

/* Hero backdrop — a hairline grid that fills the hero region with the
   brand mark hexagon outlined in terracotta accent, sitting top-right.
   Marks at each vertex echo a technical-drawing convention. The grid
   is set via CSS gradients (cheap, responsive, no SVG geometry math). */
function HeroBackdrop() {
  const hexVertices: [number, number][] = [
    [36, 36],
    [136, 36],
    [204, 104],
    [204, 204],
    [104, 204],
    [36, 136],
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--rule) 1px, transparent 1px),
            linear-gradient(to bottom, var(--rule) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          // Fade the grid out at the edges and bottom so the page below
          // doesn't inherit a hard cut.
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 70% at 50% 35%, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 35%, black 40%, transparent 100%)",
          opacity: 0.7,
        }}
      />
      {/* Hex outline + vertex crosshairs */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="absolute -right-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 md:right-0 md:h-[520px] md:w-[520px] lg:h-[600px] lg:w-[600px]"
      >
        <path
          d="M 36 36 L 136 36 L 204 104 L 204 204 L 104 204 L 36 136 Z"
          stroke="var(--accent)"
          strokeWidth="1.2"
          strokeLinejoin="miter"
        />
        <g stroke="var(--accent)" strokeWidth="1">
          {hexVertices.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
              <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* HERO — generous, the entry point. Full-width assertion with a grid
   backdrop tracing the brand mark on the right. */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--bg)] pt-24 pb-32 md:pt-36 md:pb-44 lg:pt-40 lg:pb-52">
      <HeroBackdrop />
      <div className="relative mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <h1 className="rise rise-2 display-1 max-w-[16ch]">
          Commercial reasoning for{" "}
          <Highlight delay={650}>repeatable revenue</Highlight>.
        </h1>
        <p className="rise rise-3 lead mt-10 max-w-[48ch] text-[var(--ink-soft)]">
          Kithos helps early B2B teams turn scattered commercial context into
          sharper account decisions, stronger outreach, better meetings, and a
          sales motion that improves with every outcome.
        </p>
        <div className="rise rise-4 mt-12">
          <AccessButton size="lg" tone="forest" />
        </div>
      </div>
    </section>
  );
}

/* RIGHT NOW — asymmetric 7/5 split. The headline + prose lead and the
   stack-fragments grid is the supporting visual, anchored to the right
   edge with a mono caption that ties it back to the body copy. */
function RightNow() {
  return (
    <section
      id="now"
      className="w-full bg-[var(--surface)] py-28 md:py-40 lg:py-48"
    >
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        {/* Section header — top rule + eyebrow + thin rule extending to
            the right edge. Acts as an architectural opening line for
            the section, anchoring the content below it. */}
        <div className="flex items-baseline gap-6 border-t border-[var(--rule-strong)] pt-6">
          <span className="label">Right now</span>
          <div
            aria-hidden
            className="h-px flex-1 self-center bg-[var(--rule)]"
          />
        </div>
        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-14 md:mt-16">
          {/* LEFT — 7 cols, text leads. Vertical rhythm: 6→10→5 (label,
              headline, lead, body) — a clear scale, no arbitrary gaps. */}
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display-2 max-w-[16ch]">
              Teams are making revenue decisions from{" "}
              <Highlight>fragments</Highlight>.
            </h2>
            <p className="lead mt-10 max-w-[52ch] text-[var(--ink-soft)]">
              Where to focus, who matters, why they should care, and how
              to move deals forward. The context is split across CRM
              fields, call notes, inboxes, Slack threads, spreadsheets,
              decks, and individual memory.
            </p>
            <p className="body mt-5 max-w-[52ch] text-[var(--ink-soft)]">
              The stack records activity but without a system that ties
              it all together, deals get lost, lessons do not compound,
              and the team does not scale.
            </p>
          </div>
          {/* RIGHT — checkerboard grid, offset down so the headline
              overhangs above it. The grid is a client component so it
              can drive a scroll-triggered diagonal fade-in. */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:flex lg:flex-col lg:items-end lg:pt-20 xl:pt-24">
            <StackGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

/* KITHOS — the answer. Left-anchored to keep the page's asymmetric
   rhythm: eyebrow + headline cantilever on the left, supporting prose
   offset to the right. Mirrors RightNow's composition. */
function Kithos() {
  return (
    <section
      id="kithos"
      className="w-full bg-[var(--bg)] py-28 md:py-40 lg:py-48"
    >
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <span className="label">Kithos</span>
        <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="display-2 max-w-[18ch]">
              Kithos helps your team{" "}
              <Highlight>win deals</Highlight> it would otherwise lose.
            </h2>
            <p className="lead mt-8 max-w-[58ch] text-[var(--ink-soft)]">
              Kithos learns your product, market, customers, accounts,
              and outcomes, then turns that context into clearer
              commercial decisions. The team sees where revenue is most
              likely to come from, which opportunities deserve
              attention, and what should happen next — while every
              outcome makes the next decision sharper.
            </p>
          </div>
          {/* Right offset — three short stamps that restate the value
              shape without repeating the prose. The mono treatment ties
              them back to the eyebrow and HowItWorks numerals. */}
          <aside className="col-span-12 lg:col-span-3 lg:col-start-10 lg:pt-3">
            <dl className="grid grid-cols-1 gap-y-6 border-t border-[var(--rule)] pt-6 lg:border-t-0 lg:pt-0">
              <div>
                <dt className="label">For</dt>
                <dd className="body-sm mt-1.5 text-[var(--ink)]">
                  Early B2B teams
                </dd>
              </div>
              <div>
                <dt className="label">Job</dt>
                <dd className="body-sm mt-1.5 text-[var(--ink)]">
                  Commercial reasoning
                </dd>
              </div>
              <div>
                <dt className="label">Shape</dt>
                <dd className="body-sm mt-1.5 text-[var(--ink)]">
                  Sharper with every outcome
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* HOW IT WORKS — the mechanism. Four tone-paired cards in a 2×2 grid.
   Each tint is a low-chroma pastel that survives both themes; the
   card-level token is set inline so each card can override --tint. */
function HowItWorks() {
  const tints = [
    "var(--tint-mint)",
    "var(--tint-peach)",
    "var(--tint-sky)",
    "var(--tint-sand)",
  ];
  return (
    <section
      id="how"
      className="w-full bg-[var(--bg)] py-32 md:py-48 lg:py-56"
    >
      <div className="mx-auto w-full max-w-[86rem] px-6 md:px-10">
        <span className="label">How it works</span>
        <h2 className="display-2 mt-6 max-w-[18ch]">
          From scattered work to a self-improving revenue motion.
        </h2>
        <ol className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:mt-24">
          {features.map((f, i) => (
            <li
              key={f.n}
              className="relative flex flex-col gap-6 rounded-2xl p-8 md:p-10 lg:p-12"
              style={{ background: tints[i] }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div
                  className="font-display text-[clamp(2.75rem,5vw,4rem)] font-medium leading-[0.9] tracking-[-0.035em] text-[var(--ink)]"
                  style={{ fontVariantNumeric: "tabular-nums lining-nums" }}
                >
                  {f.n}
                </div>
                <div
                  aria-hidden
                  className="h-[2px] flex-1 max-w-[6rem] bg-[var(--ink)]/15"
                />
              </div>
              <div>
                <h3 className="display-5 text-[var(--ink)]">{f.title}</h3>
                <p className="body-sm mt-4 max-w-[44ch] text-[var(--ink)]">
                  {f.lead}
                </p>
                <p className="body-sm mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                  {f.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* CLOSING — terracotta finale that fits in a single viewport. CTA in
   the upper portion, brand lockup mid-size, meta strip at the very
   bottom. Replaces the old standalone footer. */
function Closing() {
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
      {/* CTA — flex-1 so it claims whatever room the bottom doesn't need */}
      <div className="mx-auto flex w-full max-w-[86rem] flex-1 flex-col justify-center px-6 py-16 md:px-10 md:py-24">
        <span
          className="label"
          style={{ color: "var(--on-accent-soft)" }}
        >
          Get early access
        </span>
        <h2 className="display-1 mt-6 max-w-[22ch] text-[var(--on-accent)]">
          Make the next decision sharper than the last.
        </h2>
        <div className="mt-12">
          <AccessButton size="lg" tone="on-accent" />
        </div>
      </div>

      {/* Bottom zone — at md+ the lockup is a tone-on-tone backdrop
          with the meta strip overlaid on its lower edge. At mobile the
          lockup is small, so the two stack as separate rows instead of
          colliding. */}
      <div className="md:relative">
        <div
          className="mx-auto flex w-full max-w-[86rem] items-center justify-center gap-5 px-6 sm:gap-6 md:gap-8 md:px-10 lg:gap-10"
          style={
            {
              "--mark-tile":
                "color-mix(in oklch, var(--accent) 90%, var(--accent-ink) 10%)",
              "--mark-cutout": "var(--accent)",
              color:
                "color-mix(in oklch, var(--accent) 90%, var(--accent-ink) 10%)",
            } as React.CSSProperties
          }
        >
          <BrandMark className="h-12 w-12 shrink-0 sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-32 lg:w-32" />
          <Wordmark className="h-12 w-auto shrink-0 sm:h-16 md:h-24 lg:h-32" />
        </div>

        <div className="mx-auto mt-10 w-full max-w-[86rem] px-6 pb-6 sm:mt-12 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-10 md:pb-8">
          <MetaStrip />
        </div>
      </div>
    </section>
  );
}
