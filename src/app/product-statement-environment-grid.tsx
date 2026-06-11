import type { CSSProperties } from "react";
import "./product-statement-environment-grid.css";
import { GridBandCellVertices } from "./grid-band-cell";

const ENVIRONMENT_MARQUEE_DURATION = 48;

type ProductStatementEnvironmentGridProps = {
  labels: readonly string[];
};

export function ProductStatementEnvironmentGrid({
  labels,
}: ProductStatementEnvironmentGridProps) {
  const loop = [...labels, ...labels];

  return (
    <div className="pseg-scroll">
      <div
        className="pseg-scroll__marquee"
        style={
          {
            "--pseg-marquee-duration": `${ENVIRONMENT_MARQUEE_DURATION}s`,
          } as CSSProperties
        }
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
                <GridBandCellVertices prefix="pseg-scroll" />
                <span className="pseg-scroll__label ui">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
