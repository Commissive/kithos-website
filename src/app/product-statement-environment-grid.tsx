import "./product-statement-environment-grid.css";

const ENVIRONMENT_MARQUEE_DURATION = 48;

type ProductStatementEnvironmentGridProps = {
  labels: readonly string[];
};

function CellVertices() {
  return (
    <div className="pseg-scroll__vertices" aria-hidden="true">
      <span className="pseg-scroll__vertex pseg-scroll__vertex--tl">+</span>
      <span className="pseg-scroll__vertex pseg-scroll__vertex--tr">+</span>
      <span className="pseg-scroll__vertex pseg-scroll__vertex--bl">+</span>
      <span className="pseg-scroll__vertex pseg-scroll__vertex--br">+</span>
    </div>
  );
}

export function ProductStatementEnvironmentGrid({
  labels,
}: ProductStatementEnvironmentGridProps) {
  const loop = [...labels, ...labels];

  return (
    <div className="pseg-scroll">
      <div
        className="pseg-scroll__marquee"
        style={{
          "--pseg-marquee-duration": `${ENVIRONMENT_MARQUEE_DURATION}s`,
        }}
      >
        <ul
          className="pseg-scroll__track"
          role="list"
          aria-label="Complex buying environments"
        >
          {loop.map((label, index) => {
            const isDuplicate = index >= labels.length;

            return (
              <li
                key={`${label}-${index}`}
                className="pseg-scroll__cell"
                role="listitem"
                aria-hidden={isDuplicate ? true : undefined}
              >
                <CellVertices />
                <span className="pseg-scroll__label ui">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
