"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export const GRID_CELL_ACCENTS = [
  "var(--forest-tint)",
  "var(--terracotta-tint)",
  "var(--bone-shade)",
  "var(--forest-soft)",
] as const;

/** Share of grid cells that use an accent tint (rest use the section base). */
export const GRID_CELL_ACCENT_RATIO = 0.18;

export type SiteGridCell = {
  col: number;
  row: number;
  color: string;
};

export function pickGridCellColor(base: string): string {
  if (Math.random() >= GRID_CELL_ACCENT_RATIO) {
    return base;
  }

  return GRID_CELL_ACCENTS[
    Math.floor(Math.random() * GRID_CELL_ACCENTS.length)
  ];
}

export function buildGridCells(
  cols: number,
  rows: number,
  base: string,
): SiteGridCell[] {
  return Array.from({ length: cols * rows }, (_, index) => ({
    col: (index % cols) + 1,
    row: Math.floor(index / cols) + 1,
    color: pickGridCellColor(base),
  }));
}

export function useSiteGridCells(
  frameRef: RefObject<HTMLElement | null>,
  colsVar: string,
  baseColor: string,
): SiteGridCell[] {
  const [gridCells, setGridCells] = useState<SiteGridCell[]>([]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const syncCells = () => {
      const styles = getComputedStyle(frame);
      const cols = Number.parseInt(styles.getPropertyValue(colsVar), 10) || 8;
      const cellSize = frame.clientWidth / cols;
      const rows = cellSize > 0 ? Math.ceil(frame.clientHeight / cellSize) : 0;

      if (rows === 0) {
        setGridCells([]);
        return;
      }

      setGridCells(buildGridCells(cols, rows, baseColor));
    };

    syncCells();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(syncCells);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [frameRef, colsVar, baseColor]);

  return gridCells;
}
