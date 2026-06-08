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

const GRID_BREAKPOINT_QUERIES = [
  "(max-width: 47.999rem)",
  "(min-width: 48rem)",
  "(min-width: 1024px)",
] as const;

export type SiteGridCell = {
  col: number;
  row: number;
  color: string;
};

export type SiteGridCellsOptions = {
  /** Keep cells inside the content panel (exclude gutter + trail columns). */
  filter?: "panel";
  gutterColsVar?: string;
  /** Derive gutter width as (headline col start − 1), for calc-based gutters. */
  gutterFromHeadlineStartVar?: string;
  trailColsVar?: string;
};

function readGridVarInt(
  styles: CSSStyleDeclaration,
  name: string,
  fallback: number,
): number {
  const raw = styles.getPropertyValue(name).trim();
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

function readGutterCols(
  styles: CSSStyleDeclaration,
  options?: SiteGridCellsOptions,
): number {
  if (options?.gutterColsVar) {
    return readGridVarInt(styles, options.gutterColsVar, 0);
  }

  if (options?.gutterFromHeadlineStartVar) {
    return Math.max(
      0,
      readGridVarInt(styles, options.gutterFromHeadlineStartVar, 1) - 1,
    );
  }

  return 0;
}

function readTrailCols(
  styles: CSSStyleDeclaration,
  options?: SiteGridCellsOptions,
): number {
  if (!options?.trailColsVar) {
    return 0;
  }

  return readGridVarInt(styles, options.trailColsVar, 0);
}

export function filterPanelGridCells(
  cells: SiteGridCell[],
  cols: number,
  gutterCols: number,
  trailCols: number,
): SiteGridCell[] {
  const panelEnd = cols - trailCols;
  return cells.filter(
    (cell) => cell.col > gutterCols && cell.col <= panelEnd,
  );
}

function cellHash(col: number, row: number, salt: number): number {
  return ((col * 73856093) ^ (row * 19349663) ^ salt) >>> 0;
}

export function pickGridCellColor(
  col: number,
  row: number,
  base: string,
): string {
  if (cellHash(col, row, 1) % 100 >= GRID_CELL_ACCENT_RATIO * 100) {
    return base;
  }

  return GRID_CELL_ACCENTS[
    cellHash(col, row, 2) % GRID_CELL_ACCENTS.length
  ];
}

export function buildGridCells(
  cols: number,
  rows: number,
  base: string,
): SiteGridCell[] {
  return Array.from({ length: cols * rows }, (_, index) => {
    const col = (index % cols) + 1;
    const row = Math.floor(index / cols) + 1;

    return {
      col,
      row,
      color: pickGridCellColor(col, row, base),
    };
  });
}

function resolveGridCells(
  frame: HTMLElement,
  colsVar: string,
  baseColor: string,
  options?: SiteGridCellsOptions,
): SiteGridCell[] {
  const styles = getComputedStyle(frame);
  const cols = readGridVarInt(styles, colsVar, 8);
  const cellSize = frame.clientWidth / cols;
  const rows = cellSize > 0 ? Math.ceil(frame.clientHeight / cellSize) : 0;

  if (rows === 0) {
    return [];
  }

  const cells = buildGridCells(cols, rows, baseColor);

  if (options?.filter !== "panel") {
    return cells;
  }

  return filterPanelGridCells(
    cells,
    cols,
    readGutterCols(styles, options),
    readTrailCols(styles, options),
  );
}

export function useSiteGridCells(
  frameRef: RefObject<HTMLElement | null>,
  colsVar: string,
  baseColor: string,
  {
    filter,
    gutterColsVar,
    gutterFromHeadlineStartVar,
    trailColsVar,
  }: SiteGridCellsOptions = {},
): SiteGridCell[] {
  const [gridCells, setGridCells] = useState<SiteGridCell[]>([]);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const resolvedOptions: SiteGridCellsOptions | undefined = filter
      ? {
          filter,
          gutterColsVar,
          gutterFromHeadlineStartVar,
          trailColsVar,
        }
      : undefined;

    const syncCells = () => {
      setGridCells(
        resolveGridCells(frame, colsVar, baseColor, resolvedOptions),
      );
    };

    syncCells();

    const mediaQueries = GRID_BREAKPOINT_QUERIES.map((query) =>
      window.matchMedia(query),
    );
    const onBreakpointChange = () => syncCells();

    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", onBreakpointChange);
    }

    if (typeof ResizeObserver === "undefined") {
      return () => {
        for (const mediaQuery of mediaQueries) {
          mediaQuery.removeEventListener("change", onBreakpointChange);
        }
      };
    }

    const observer = new ResizeObserver(syncCells);
    observer.observe(frame);

    return () => {
      observer.disconnect();
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", onBreakpointChange);
      }
    };
  }, [
    frameRef,
    colsVar,
    baseColor,
    filter,
    gutterColsVar,
    gutterFromHeadlineStartVar,
    trailColsVar,
  ]);

  return gridCells;
}
