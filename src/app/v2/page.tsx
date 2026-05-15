import { Nav } from "../nav";
import { AccessButton } from "../access-modal";

/* Alternate site — testbed at /v2. Nav + an alternate hero only;
   nothing below it. Copied from the real hero (not shared) so
   iterating here never affects /. */

/* Hero backdrop — hairline grid with the brand-mark hexagon outlined
   in accent yellow, top-right. Copied verbatim from src/app/page.tsx;
   this is fixed brand language. */
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--rule) 1px, transparent 1px),
            linear-gradient(to bottom, var(--rule) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 70% at 50% 35%, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 35%, black 40%, transparent 100%)",
          opacity: 0.7,
        }}
      />
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

/* HERO (v2) — same bones as the real hero, retuned for a short,
   benefit-led header: headline runs wide (no max-w clamp), subhead
   sits closer (mt-8) and keeps a readable measure. */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--bg)] pt-24 pb-32 md:pt-36 md:pb-44 lg:pt-40 lg:pb-52">
      <HeroBackdrop />
      <div className="relative mx-auto w-full max-w-[78rem] px-6 md:px-10">
        <h1 className="rise rise-2 display-1">
          Revenue, without the guesswork.
        </h1>
        <p className="rise rise-3 lead mt-8 max-w-[48ch] text-[var(--ink-soft)]">
          Kithos pulls together the scattered context behind your market,
          accounts, conversations, and outcomes, into sharper account
          decisions, stronger outreach, better meetings, and a sales
          motion that improves with every outcome.
        </p>
        <div className="rise rise-4 mt-12">
          <AccessButton size="lg" />
        </div>
      </div>
    </section>
  );
}

export default function V2Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}
