"use client";

import { PageColumn, PageShell } from "./page-layout";
import "./scroll-linked-tour.css";
import { useScrollSpy } from "./use-scroll-spy";

export type ScrollLinkedPanelCard = {
  title: string;
  body: string;
};

export type ScrollLinkedPanel = {
  id: string;
  navLabel: string;
  title: string;
  body?: string;
  cards?: readonly ScrollLinkedPanelCard[];
  /** Use for full-sentence panel titles (default caps at 16ch). */
  titleVariant?: "feature" | "statement";
};

function ScrollLinkedPanelCards({
  cards,
}: {
  cards: readonly ScrollLinkedPanelCard[];
}) {
  return (
    <div className="scroll-linked-tour__panel-cards">
      {cards.map((card) => (
        <article
          key={card.title}
          className="scroll-linked-tour__panel-card"
        >
          <h4 className="scroll-linked-tour__panel-card-title type-card">
            {card.title}
          </h4>
          <p className="scroll-linked-tour__panel-card-body type-body-lg">
            {card.body}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ScrollLinkedTour({
  panels,
  navLabel,
}: {
  panels: readonly ScrollLinkedPanel[];
  navLabel: string;
}) {
  const sectionIds = panels.map((panel) => panel.id);
  const activeId = useScrollSpy(sectionIds);

  return (
    <div className="scroll-linked-tour">
      <nav className="scroll-linked-tour__nav" aria-label={navLabel}>
        <div className="scroll-linked-tour__nav-inner">
          <ul className="scroll-linked-tour__nav-list">
            {panels.map((panel) => {
              const isActive = activeId === panel.id;

              return (
                <li key={panel.id}>
                  <a
                    href={`#${panel.id}`}
                    className={
                      isActive
                        ? "scroll-linked-tour__nav-link is-active"
                        : "scroll-linked-tour__nav-link"
                    }
                    aria-current={isActive ? "location" : undefined}
                  >
                    {panel.navLabel}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <PageShell className="scroll-linked-tour__content">
        <PageColumn>
          <div className="scroll-linked-tour__panels">
            {panels.map((panel) => {
              const headingId = `${panel.id}-heading`;

              return (
                <section
                  key={panel.id}
                  id={panel.id}
                  aria-labelledby={headingId}
                  className="scroll-linked-tour__panel"
                >
                  <div className="scroll-linked-tour__panel-inner">
                    <div className="scroll-linked-tour__panel-title-col">
                      <h3
                        id={headingId}
                        className={
                          panel.titleVariant === "statement"
                            ? "scroll-linked-tour__panel-title scroll-linked-tour__panel-title--statement type-feature"
                            : "scroll-linked-tour__panel-title type-feature"
                        }
                      >
                        {panel.title}
                      </h3>
                    </div>
                    {panel.cards || panel.body ? (
                      <div className="scroll-linked-tour__panel-body-col">
                        {panel.cards ? (
                          <ScrollLinkedPanelCards cards={panel.cards} />
                        ) : (
                          <p className="scroll-linked-tour__panel-body lead">
                            {panel.body}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        </PageColumn>
      </PageShell>
    </div>
  );
}
