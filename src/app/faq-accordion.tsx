"use client";

import { useId, useState } from "react";
import { FAQ_ITEMS } from "./faq-content";

export function FaqAccordion() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="faq-accordion">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <article
            key={item.q}
            className={
              isOpen
                ? "faq-accordion__item faq-accordion__item--open"
                : "faq-accordion__item"
            }
          >
            <h3 className="faq-accordion__heading">
              <button
                type="button"
                id={triggerId}
                className="faq-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className="faq-accordion__question type-card-title">
                  {item.q}
                </span>
                <span className="faq-accordion__icon" aria-hidden />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="faq-accordion__panel"
              aria-hidden={!isOpen}
              inert={!isOpen}
            >
              <div className="faq-accordion__panel-inner">
                <p className="body faq-accordion__answer">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
