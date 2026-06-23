/* Isometric wireframe illustrations — Linear-style blueprint figures. */

function WireProps() {
  return (
    <>
      <g className="next-move-wire next-move-wire--muted">
        <path d="M20 168 128 222a10 10 0 0 0 9 0l108-54" />
        <path d="M20 150 128 204a10 10 0 0 0 9 0l108-54" />
        <path d="M20 132 128 186a10 10 0 0 0 9 0l108-54" />
        <path d="M20 114 128 168a10 10 0 0 0 9 0l108-54" />
        <path d="M20 96 128 150a10 10 0 0 0 9 0l108-54" />
        <path d="M20 78 128 132a10 10 0 0 0 9 0l108-54" />
      </g>
      <g className="next-move-wire next-move-wire--bright">
        <path d="M248 98a3 3 0 0 1 2 3v86a3 3 0 0 1-2 3L136 245a12 12 0 0 1-11 0L15 190a3 3 0 0 1-2-3v-86c0-1 .7-2 2-3l113-56a6 6 0 0 1 6 0z" />
        <path d="M248 58a3 3 0 0 1 2 3v9a3 3 0 0 1-2 3L136 130a10 10 0 0 1-9 0L15 73a3 3 0 0 1-2-3V61c0-1 .7-2 2-3l113-56a6 6 0 0 1 6 0z" />
      </g>
    </>
  );
}

export function NextMoveIllustrationContext() {
  return (
    <svg viewBox="0 0 265 262" fill="none" aria-hidden="true">
      <WireProps />
      <g className="next-move-wire--hover-cube">
        <circle
          className="next-move-wire next-move-wire--bright"
          cx="132"
          cy="92"
          r="14"
        />
      </g>
    </svg>
  );
}

export function NextMoveIllustrationEvidence() {
  return (
    <svg viewBox="0 0 265 262" fill="none" aria-hidden="true">
      <g className="next-move-wire next-move-wire--bright">
        <path d="M58 176 94 138 130 176 94 214Z" />
        <path d="M118 132 154 94 190 132 154 170Z" />
        <path d="M148 176 184 138 220 176 184 214Z" />
      </g>
      <g className="next-move-wire next-move-wire--muted">
        <path d="M88 118 124 80 160 118 124 156Z" />
        <path d="M38 148 74 110 110 148 74 186Z" />
        <path d="M178 98 214 60 250 98 214 136Z" />
      </g>
      <g className="next-move-wire--hover-dial">
        <path
          className="next-move-wire next-move-wire--bright"
          d="M58 176 200 94"
        />
      </g>
    </svg>
  );
}

export function NextMoveIllustrationOutcomes() {
  return (
    <svg viewBox="0 0 265 262" fill="none" aria-hidden="true">
      <g className="next-move-wire next-move-wire--muted">
        <path d="M48 220V92l18 10v118z" />
        <path d="M88 220V72l18 10v138z" />
        <path d="M128 220V112l18 10v98z" />
        <path d="M168 220V52l18 10v158z" />
        <path d="M208 220V132l18 10v78z" />
      </g>
      <g className="next-move-wire next-move-wire--bright next-move-wire--hover-bars">
        <path d="M48 92 66 82 66 200 48 220z" />
        <path d="M88 72 106 62 106 200 88 220z" />
        <path d="M128 112 146 102 146 200 128 220z" />
        <path d="M168 52 186 42 186 200 168 220z" />
        <path d="M208 132 226 122 226 200 208 220z" />
      </g>
      <g className="next-move-wire--hover-scan">
        <path
          className="next-move-wire next-move-wire--bright"
          d="M40 145 H225"
        />
      </g>
      <g className="next-move-wire--hover-rail">
        <path
          className="next-move-wire next-move-wire--muted"
          d="M40 185 H225"
        />
      </g>
    </svg>
  );
}
