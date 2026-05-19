/* Integration grid — the Fin treatment. The Kithos mark occupies a
   large central 3×3 tile, framed by 12 unique logo tiles, and the
   ruled lattice keeps drawing outward in every direction as empty
   cells that dissolve under a radial mask — so the grid bleeds into
   the section background rather than ending at a hard edge.
   Static, decorative. Used as the step-01 visual in TabbedSections.

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

export function IntegrationGrid() {
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
