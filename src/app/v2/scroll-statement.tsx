import { useId } from "react";

/* Below-the-fold focal statement — single beat between the hero and
   TabbedSections. Static: the section's weight comes from generous
   vertical padding + balanced display type inside a hairline frame,
   not from a scroll-pinned word-by-word reveal. Server-rendered, no
   JS. The earlier `accent` prop and gradient bg were removed — both
   were dead (accent was always empty; the gradient mixed two
   tokens that resolve to the same colour).

   Component name kept as `ScrollStatement` so the import in
   v2/page.tsx doesn't churn; it no longer scrolls, see the new
   shape below. */

export function ScrollStatement({
  eyebrow,
  text,
}: {
  eyebrow: string;
  text: string;
}) {
  const eyebrowId = useId();
  // Each "\n" in `text` forces a hard line break. We keep this so
  // copy can opt-in to manual breaks; CSS `text-wrap: balance` on the
  // statement handles soft wrapping.
  const lines = text.split("\n");

  return (
    <section
      id="right-now"
      aria-labelledby={eyebrowId}
      className="relative w-full scroll-mt-20 border-t border-[var(--rule)] bg-[var(--surface)] py-[var(--section-pad-y-spacious)]"
    >
      {/* Top-rail registration ticks at the content column edges —
          matches the rest of the page's grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 md:px-10"
      >
        <div className="relative mx-auto h-0 max-w-[86rem]">
          {["left-0", "left-full"].map((p) => (
            <span
              key={p}
              className={`absolute top-0 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 ${p}`}
            >
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--rule-strong)]" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--rule-strong)]" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[86rem] px-6 text-center md:px-10">
        <div className="mx-auto inline-block border border-[var(--rule)] px-8 py-10 md:px-14 md:py-14">
          <h2 id={eyebrowId} className="label">
            {eyebrow}
          </h2>
          <p className="v2-statement mx-auto mt-8 max-w-[22ch] md:max-w-[34ch]">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
