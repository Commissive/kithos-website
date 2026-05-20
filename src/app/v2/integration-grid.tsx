/* Integration marquee — a single ruled row of brand logos that
   scrolls right-to-left in a seamless loop. Replaces the prior
   centred-Kithos lattice. The cell + hairline aesthetic from the
   lattice is preserved (each logo sits in an 80px square with the
   site's rule colour), and a horizontal soft mask dissolves the
   leading and trailing edges so logos fade in/out rather than
   popping. Reduced-motion safe — animation pauses, logos read as a
   static row. */

const LOGOS = [
  "/logos/chatgpt.svg",
  "/logos/salesforce.svg",
  "/logos/gmail.svg",
  "/logos/gong.svg",
  "/logos/hubspot.svg",
  "/logos/apollo-icon.svg",
  "/logos/claude-icon.svg",
  "/logos/slack-mark.svg",
  "/logos/notion.svg",
  "/logos/linkedin.svg",
  "/logos/zoominfo.svg",
  "/logos/Google_Google_Sheets_6.svg",
];

/* Cell size in px (matches the prior lattice cell so the visual
   rhythm is consistent across surfaces). */
const CELL = 80;

/* Speed — seconds per full loop. Slow enough that each logo is
   readable; fast enough that the strip feels alive. */
const DURATION_S = 36;

export function IntegrationGrid() {
  // Duplicate the list so the translateX(-50%) animation loops
  // seamlessly — when the first set scrolls off the left, the
  // duplicate is already in place to its right.
  const reel = [...LOGOS, ...LOGOS];

  return (
    <div
      aria-hidden
      className="w-full overflow-hidden"
      style={{
        // Soft-fade the leading and trailing edges so logos dissolve
        // in/out instead of popping past a hard boundary.
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes integration-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .integration-marquee {
          animation: integration-marquee ${DURATION_S}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .integration-marquee { animation: none; }
        }
      `}</style>
      <div
        className="integration-marquee flex w-max"
        style={{ willChange: "transform" }}
      >
        {reel.map((src, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center justify-center"
            style={{ width: CELL, height: CELL }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              style={{
                width: "50%",
                height: "50%",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
