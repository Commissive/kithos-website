"use client";

import { Tabs, TabsList, TabsPanel, TabsTrigger, useTabsBaseId } from "../tabs";
import { CommercialContextPanel } from "./commercial-context-panel";
import {
  COMMERCIAL_CONTEXT_PILLARS,
  DEFAULT_PILLAR_ID,
} from "./pillars";

export function CommercialContextTabs() {
  return (
    <Tabs
      aria-label="Commercial context pillars"
      className="commercial-context-tabs"
      defaultValue={DEFAULT_PILLAR_ID}
    >
      <CommercialContextTabPanels />
    </Tabs>
  );
}

function CommercialContextTabPanels() {
  const baseId = useTabsBaseId();
  const total = COMMERCIAL_CONTEXT_PILLARS.length;

  return (
    <>
      <TabsList variant="ruled" className="commercial-context-tabs__list">
        {COMMERCIAL_CONTEXT_PILLARS.map((pillar) => (
          <TabsTrigger key={pillar.id} value={pillar.id} className="type-eyebrow">
            {pillar.eyebrow}
          </TabsTrigger>
        ))}
      </TabsList>
      {COMMERCIAL_CONTEXT_PILLARS.map((pillar, index) => (
        <TabsPanel key={pillar.id} value={pillar.id}>
          <article aria-labelledby={`${baseId}-heading-${pillar.id}`} className="commercial-context-pillar">
            <CommercialContextPanel
              pillar={pillar}
              titleId={`${baseId}-heading-${pillar.id}`}
              index={index}
              total={total}
            />
          </article>
        </TabsPanel>
      ))}
    </>
  );
}
