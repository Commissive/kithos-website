"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AccessButton } from "./access-modal";
import { SectionHeadingSupport } from "./page-layout";
import "./hero.css";

type CellPlate = { left: number; top: number; width: number; height: number };

/** Position of `el` relative to `ancestor`, ignoring transforms (offset-based). */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top };
}

/** Snap an element's box outward to whole grid cells so any cell the text
 *  touches is fully covered. The grid paints with `background-position: -1px 0`
 *  (vertical lines on each cell's left edge, horizontals on the top edge), so
 *  the plate stops 1px shy of its right/top/bottom bounding lines — otherwise it
 *  paints over the cell edges sitting next to the copy. */
function snapToCells(el: HTMLElement, frame: HTMLElement, cell: number): CellPlate {
  const { left, top } = offsetWithin(el, frame);
  const x0 = Math.floor(left / cell) * cell;
  const y0 = Math.floor(top / cell) * cell;
  const x1 = Math.ceil((left + el.offsetWidth) / cell) * cell;
  const y1 = Math.ceil((top + el.offsetHeight) / cell) * cell;
  return { left: x0, top: y0 + 1, width: x1 - x0 - 1, height: y1 - y0 - 1 };
}

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [plates, setPlates] = useState<CellPlate[]>([]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const cols = Number.parseInt(
        getComputedStyle(frame).getPropertyValue("--hero-grid-cols"),
        10,
      );
      const cell = cols > 0 ? frame.clientWidth / cols : 0;
      if (!cell) {
        setPlates([]);
        return;
      }
      const targets = [
        frame.querySelector<HTMLElement>(".type-hero"),
        frame.querySelector<HTMLElement>(".hero__subhead"),
      ].filter((el): el is HTMLElement => el !== null);
      setPlates(targets.map((el) => snapToCells(el, frame, cell)));
    };

    measure();

    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(frame);

    // Web fonts shift the copy metrics — re-snap once they're ready.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer?.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="hero-headline"
      data-on-accent
      className="hero w-full"
    >
      <div className="hero__inset">
        <div ref={frameRef} className="hero__frame">
          <div aria-hidden className="hero__grid" />
          <div aria-hidden className="hero__plates">
            {plates.map((plate, index) => (
              <span
                key={index}
                className="hero__plate"
                style={{
                  left: plate.left,
                  top: plate.top,
                  width: plate.width,
                  height: plate.height,
                }}
              />
            ))}
          </div>
          <div aria-hidden className="hero__grid-gutter hero__grid-gutter--start" />
          <div aria-hidden className="hero__grid-gutter hero__grid-gutter--end" />
          <div aria-hidden className="hero__grid-row1-top" />
          <div aria-hidden className="hero__headline-band" />
          <div className="hero__headline-copy">
            <p data-hero-rise className="hero__pill">
              The platform for commercial reasoning.
            </p>
            <h1 id="hero-headline" data-hero-rise className="type-hero">
              <span className="hero__headline-line">Repeatable&nbsp;revenue.</span>
              <span className="hero__headline-line">
                Without&nbsp;the&nbsp;guesswork.
              </span>
            </h1>
          </div>
          <div aria-hidden className="hero__content-band" />
          <div className="hero__content">
            <div data-hero-rise className="hero__lead">
              <SectionHeadingSupport className="hero__subhead">
                Kithos helps teams selling into complex buying environments
                make the commercial decisions that win the right&nbsp;customers.
              </SectionHeadingSupport>
              <div className="hero__actions">
                <AccessButton size="lg" tone="on-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
