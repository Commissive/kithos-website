"use client";

/* Stack grid — the 8×4 checkerboard of B2B commercial tools.
   Extracted as a client component so we can drive a scroll-triggered
   entrance animation via IntersectionObserver. Cells fade + rise in a
   diagonal sweep (top-left → bottom-right) when the grid enters view,
   so the "scattered context" assembles in front of the reader at the
   moment they reach it. Respects prefers-reduced-motion. */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";
import { stackTools } from "./stack-logos";

const COLS = 8;
const ROWS = 4;
const STAGGER_MS = 30;

type Cell = {
  tool: (typeof stackTools)[number] | null;
  row: number;
  col: number;
  idx: number;
};

function buildCells(): Cell[] {
  const cells: Cell[] = [];
  let toolIdx = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isFilled = (row + col) % 2 === 0;
      let tool: Cell["tool"] = null;
      if (isFilled && toolIdx < stackTools.length) {
        tool = stackTools[toolIdx++];
      }
      cells.push({ tool, row, col, idx: row * COLS + col });
    }
  }
  return cells;
}

export function StackGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // `intersected` tracks the IO trigger; `visible` is derived. With
  // reduced-motion the grid is visible immediately and no observer is
  // attached. Without it, the observer flips `intersected` once when
  // the grid enters view.
  const [intersected, setIntersected] = useState(false);
  const visible = reducedMotion || intersected;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const cells = buildCells();

  return (
    <div
      ref={ref}
      data-stack-visible={visible || undefined}
      className="stack-grid inline-grid grid-cols-8 border-t border-l border-[var(--rule)]"
    >
      {cells.map(({ tool, row, col, idx }) => {
        // Diagonal stagger: cells on the same (row+col) anti-diagonal
        // animate together, so the sweep moves from top-left corner
        // toward the bottom-right.
        const delay = (row + col) * STAGGER_MS;
        const animStyle = { animationDelay: `${delay}ms` };
        if (tool) {
          return (
            <div
              key={tool.name}
              title={tool.name}
              style={{
                ...animStyle,
                color: tool.color ?? "var(--ink-soft)",
              }}
              className="stack-cell flex h-14 w-14 items-center justify-center border-r border-b border-[var(--rule)] transition-colors duration-200 hover:bg-[var(--bg)]"
            >
              <tool.Mark
                width={tool.size ?? 44}
                height={tool.size ?? 44}
                aria-hidden
                focusable={false}
              />
              <span className="sr-only">{tool.name}</span>
            </div>
          );
        }
        return (
          <div
            key={`empty-${idx}`}
            aria-hidden
            style={animStyle}
            className="stack-cell h-14 w-14 border-r border-b border-[var(--rule)]"
          />
        );
      })}
    </div>
  );
}
