import type { CSSProperties } from "react";
import {
  PILLAR_ACCENT_VAR,
  type CommercialContextPillar,
} from "./pillars";

export function CommercialContextPanel({
  pillar,
  titleId,
  index,
  total,
}: {
  pillar: CommercialContextPillar;
  titleId: string;
  index: number;
  total: number;
}) {
  return (
    <div
      className="commercial-context-panel"
      style={
        {
          "--pillar-accent": PILLAR_ACCENT_VAR[pillar.accent],
        } as CSSProperties
      }
    >
      <div className="commercial-context-panel__content">
        <div className="commercial-context-panel__heading">
          <h3 id={titleId} className="commercial-context-panel__title type-callout">
            {pillar.heading}
          </h3>
        </div>
        <div className="commercial-context-panel__prose">
          <p className="commercial-context-panel__callout type-subhead">
            {pillar.callout}
          </p>
          <p className="commercial-context-panel__body type-body-lg">{pillar.body}</p>
        </div>
        <p className="commercial-context-panel__index step-index">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
