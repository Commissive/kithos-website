/* Workflow reasoning diagrams — instrument drawings in the site's
   hairline/cell language. Decorative (aria-hidden at the call site).

   Conventions:
   - 96×56 viewBox on an 8-unit modular grid (matches site cell rhythm)
   - vector-effect="non-scaling-stroke" keeps every line 1px like site rules
   - data-d-line  → dash-drawn on scroll (GSAP)
   - data-d-bar   → scaleX from left on scroll
   - data-d-cell  → scale/fade in on scroll
   - data-d-pop   → fade in on scroll
   - data-hover-accent → color shift on card hover (CSS)
*/

const GRID_X = Array.from({ length: 11 }, (_, i) => (i + 1) * 8);
const GRID_Y = Array.from({ length: 6 }, (_, i) => (i + 1) * 8);

function DiagramGrid() {
  return (
    <g className="wd-grid">
      {GRID_X.map((x) => (
        <line key={`v${x}`} x1={x} y1={0} x2={x} y2={56} />
      ))}
      {GRID_Y.map((y) => (
        <line key={`h${y}`} x1={0} y1={y} x2={96} y2={y} />
      ))}
    </g>
  );
}

function diagramProps(title: string) {
  return {
    viewBox: "0 0 96 56",
    role: "img" as const,
    "aria-label": title,
    className: "wd",
    preserveAspectRatio: "xMidYMid meet",
  };
}

/** Focus — scattered market cells; a crosshair + reticle isolates the segment worth winning. */
export function FocusDiagram() {
  return (
    <svg {...diagramProps("Diagram: a crosshair isolating one market segment")}>
      <DiagramGrid />

      {/* Market noise — dim cells off-target */}
      <g className="wd-cell wd-cell--noise">
        <rect data-d-cell x={8} y={8} width={8} height={8} />
        <rect data-d-cell x={32} y={40} width={8} height={8} />
        <rect data-d-cell x={16} y={32} width={8} height={8} />
        <rect data-d-cell x={80} y={8} width={8} height={8} />
        <rect data-d-cell x={72} y={40} width={8} height={8} />
      </g>

      {/* Segment cluster — warm, near the focal point */}
      <g className="wd-cell wd-cell--near">
        <rect data-d-cell x={48} y={16} width={8} height={8} />
        <rect data-d-cell x={64} y={32} width={8} height={8} />
        <rect data-d-cell x={48} y={32} width={8} height={8} />
      </g>

      {/* Crosshair through the focal cell */}
      <g className="wd-hairline">
        <line data-d-line x1={0} y1={28} x2={96} y2={28} />
        <line data-d-line x1={60} y1={0} x2={60} y2={56} />
      </g>

      {/* Focal cell */}
      <rect
        data-d-cell
        className="wd-cell wd-cell--focal"
        x={56}
        y={24}
        width={8}
        height={8}
      />

      {/* Reticle corner brackets */}
      <g className="wd-bracket" data-hover-accent>
        <path data-d-line d="M50 23 v-5 h5" />
        <path data-d-line d="M65 18 h5 v5" />
        <path data-d-line d="M70 33 v5 h-5" />
        <path data-d-line d="M55 38 h-5 v-5" />
      </g>

      <text data-d-pop className="wd-label" x={92} y={16} textAnchor="end">
        fit 0.92
      </text>
    </svg>
  );
}

/** Prioritise — accounts ranked against a conviction threshold. */
export function PrioritiseDiagram() {
  const rows = [
    { y: 6, w: 58, tone: "wd-bar--qualified" },
    { y: 14, w: 47, tone: "wd-bar--second" },
    { y: 22, w: 38, tone: "wd-bar--rest" },
    { y: 30, w: 26, tone: "wd-bar--rest" },
    { y: 38, w: 16, tone: "wd-bar--rest" },
  ];

  return (
    <svg
      {...diagramProps("Diagram: accounts ranked against a pursuit threshold")}
    >
      <DiagramGrid />

      {rows.map((row) => (
        <g key={row.y}>
          <rect
            data-d-pop
            className="wd-stub"
            x={4}
            y={row.y}
            width={10}
            height={4}
          />
          <rect
            data-d-bar
            className={`wd-bar ${row.tone}`}
            x={18}
            y={row.y}
            width={row.w}
            height={4}
          />
        </g>
      ))}

      {/* Pursue marks on qualifying accounts */}
      <g className="wd-mark" data-hover-accent>
        <rect data-d-cell x={79} y={6} width={4} height={4} />
        <rect data-d-cell x={79} y={14} width={4} height={4} />
      </g>

      {/* Conviction threshold */}
      <line
        data-d-pop
        className="wd-threshold"
        x1={64}
        y1={2}
        x2={64}
        y2={46}
      />
      <text data-d-pop className="wd-label" x={92} y={52} textAnchor="end">
        pursue ≥ 0.80
      </text>
    </svg>
  );
}

/** Engage — an orthogonal buying path through stakeholders to the close. */
export function EngageDiagram() {
  return (
    <svg
      {...diagramProps("Diagram: a buying path navigated through stakeholders")}
    >
      <DiagramGrid />

      {/* Explored dead-end */}
      <g className="wd-deadend">
        <path data-d-pop d="M32 28 v12 h10" fill="none" />
        <path data-d-pop d="M44.5 37.5 l5 5 M49.5 37.5 l-5 5" />
      </g>

      {/* The path that lands */}
      <path
        data-d-line
        className="wd-path"
        d="M8 44 V28 H32 V12 H56 V28 H76"
        fill="none"
      />

      {/* Stakeholder nodes along the way */}
      <g className="wd-node">
        <rect data-d-cell x={5.5} y={41.5} width={5} height={5} />
        <rect data-d-cell x={29.5} y={25.5} width={5} height={5} />
        <rect data-d-cell x={53.5} y={9.5} width={5} height={5} />
      </g>

      {/* Terminal — the close */}
      <g data-hover-accent>
        <rect
          data-d-cell
          className="wd-cell wd-cell--focal"
          x={76}
          y={24}
          width={8}
          height={8}
        />
        <path
          data-d-line
          className="wd-check"
          d="M78 28 l1.5 1.7 L82 26.4"
          fill="none"
        />
      </g>

      <text data-d-pop className="wd-label" x={4} y={53}>
        intro
      </text>
      <text data-d-pop className="wd-label" x={76} y={19}>
        won
      </text>
    </svg>
  );
}

export const WORKFLOW_DIAGRAMS = {
  focus: FocusDiagram,
  prioritise: PrioritiseDiagram,
  engage: EngageDiagram,
} as const;
