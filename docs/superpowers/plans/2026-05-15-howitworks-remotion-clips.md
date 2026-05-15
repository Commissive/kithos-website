# How It Works — Remotion Clips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four editorial-precise 5s motion clips (focus/move/learn/improve), render them to transparent WebM + PNG poster, and mount them above each "How it works" card on the Kithos homepage.

**Architecture:** An isolated Remotion project under `remotion/` (own deps, zero impact on the Next bundle). A shared motion-grammar layer (`theme`, `useBeat`, SVG primitives) drives four clip compositions, each parameterized by a `theme` Zod prop. A Node render script emits 8 transparent WebMs + 8 PNG posters into `public/howitworks/`. A single client component `HowItWorksClip` plays the right variant, gated by IntersectionObserver, with the poster as the reduced-motion / unsupported fallback.

**Tech Stack:** Remotion 4.x (React 19 compatible, peer `react >=16.8.0`), Zod, Next 16 / React 19, Tailwind 4, SVG (vector — stays crisp at any DPR), VP9 WebM (`yuva420p`, the only browser-friendly transparent codec; H.264/MP4 cannot carry alpha so there is no MP4 variant — the PNG poster is the fallback).

**TDD note:** Pure logic (`theme`, `useBeat`, easing) gets real unit tests via `vitest`. Visual compositions cannot be meaningfully unit-tested; their "test" is a deterministic single-frame `remotion still` render plus an eyeball pass in Remotion Studio, as the spec's Testing section specifies. Each visual task states the exact frame to check and what must be true.

---

## File Structure

```
remotion/                         # isolated project (own package.json)
  package.json
  remotion.config.ts              # transparent VP9 WebM defaults
  tsconfig.json
  vitest.config.ts
  src/
    index.ts                      # registerRoot
    Root.tsx                      # 4 Compositions, theme schema
    theme.ts                      # light/dark token values (mirror globals.css)
    theme.test.ts
    beat.ts                       # useBeat() + BEAT constants + EASE
    beat.test.ts
    grammar/
      Mark.tsx                    # account tick
      Crosshair.tsx               # 4px vertex crosshair
      HexReticle.tsx              # brand-mark hexagon
      MonoCaption.tsx             # bottom-left mono caption
      Stage.tsx                   # transparent AbsoluteFill + 0 0 1920 1080 svg
    clips/
      Focus.tsx                   # clip 01
      Move.tsx                    # clip 02
      Travel.tsx                  # clip 03
      Improve.tsx                 # clip 04
  scripts/
    render.mjs                    # renders 4 clips x 2 themes -> webm + poster png

public/howitworks/                # render output (committed)
  focus-light.webm  focus-light.png  focus-dark.webm  focus-dark.png
  move-*  travel-*  improve-*

src/app/howitworks-clip.tsx       # NEW client component
src/app/page.tsx                  # MODIFY HowItWorks to mount clips
```

---

## Task 0: Scaffold the isolated Remotion project

**Files:**
- Create: `remotion/` (via scaffolder, then relocate)
- Create: `remotion/remotion.config.ts`
- Modify: `.gitignore` (ensure `remotion/node_modules` ignored, keep `public/howitworks`)

- [ ] **Step 1: Scaffold a blank Remotion project into a temp dir and move it to `remotion/`**

Run from repo root:
```bash
npx create-video@latest --yes --blank --no-tailwind .remotion-tmp \
  && rm -rf remotion \
  && mv .remotion-tmp remotion \
  && cd remotion && npm install && cd ..
```
Expected: `remotion/package.json`, `remotion/src/Root.tsx`, `remotion/src/index.ts` exist; `cd remotion && npx remotion --version` prints a 4.x version.

- [ ] **Step 2: Add Zod and vitest to the Remotion project**

Run:
```bash
cd remotion && npm i zod && npm i -D vitest && cd ..
```
Expected: `remotion/package.json` lists `zod` in deps and `vitest` in devDeps.

- [ ] **Step 3: Configure transparent VP9 WebM as the render default**

Create `remotion/remotion.config.ts`:
```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuva420p");
Config.setCodec("vp9");
Config.overrideWebpackConfig((c) => c);
```

- [ ] **Step 4: Add a vitest config and test script**

Create `remotion/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
```

Add to `remotion/package.json` `"scripts"`:
```json
"test": "vitest run"
```

- [ ] **Step 5: Ensure git ignores Remotion deps but tracks rendered output**

Append to root `.gitignore` (create if absent):
```
remotion/node_modules
remotion/.remotion
.remotion-tmp
```
Confirm `public/howitworks/` is NOT ignored (it must be committed).

- [ ] **Step 6: Commit**

```bash
git add remotion .gitignore
git commit -m "chore: scaffold isolated Remotion project with transparent WebM config"
```

---

## Task 1: Theme token module

**Files:**
- Create: `remotion/src/theme.ts`
- Test: `remotion/src/theme.test.ts`

- [ ] **Step 1: Write the failing test**

Create `remotion/src/theme.test.ts`:
```ts
import { expect, test } from "vitest";
import { THEME, type ThemeName } from "./theme";

test("light tokens mirror globals.css", () => {
  expect(THEME.light.ink).toBe("#090806");
  expect(THEME.light.inkSoft).toBe("#43423F");
  expect(THEME.light.accent).toBe("#F4D916");
});

test("dark tokens mirror globals.css", () => {
  expect(THEME.dark.ink).toBe("#F6F5F1");
  expect(THEME.dark.inkSoft).toBe("#ABABA7");
  expect(THEME.dark.accent).toBe("#F4D916");
});

test("ThemeName covers exactly light and dark", () => {
  const names: ThemeName[] = ["light", "dark"];
  expect(Object.keys(THEME).sort()).toEqual(names.sort());
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd remotion && npx vitest run src/theme.test.ts`
Expected: FAIL — cannot find module `./theme`.

- [ ] **Step 3: Write minimal implementation**

Create `remotion/src/theme.ts`:
```ts
export type ThemeName = "light" | "dark";

export interface Tokens {
  ink: string;
  inkSoft: string;
  accent: string;
}

// Mirrored from src/app/globals.css :root and the dark media block.
export const THEME: Record<ThemeName, Tokens> = {
  light: { ink: "#090806", inkSoft: "#43423F", accent: "#F4D916" },
  dark: { ink: "#F6F5F1", inkSoft: "#ABABA7", accent: "#F4D916" },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd remotion && npx vitest run src/theme.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add remotion/src/theme.ts remotion/src/theme.test.ts
git commit -m "feat(remotion): theme token module mirroring globals.css"
```

---

## Task 2: Beat timing + easing

**Files:**
- Create: `remotion/src/beat.ts`
- Test: `remotion/src/beat.test.ts`

Beat map at 30fps over 150 frames (5.0s): setup 0–36, transform 36–102, resolve 102–132, hold 132–150.

- [ ] **Step 1: Write the failing test**

Create `remotion/src/beat.test.ts`:
```ts
import { expect, test } from "vitest";
import { BEAT, beatProgress } from "./beat";

test("BEAT boundaries match the 5s @30fps beat map", () => {
  expect(BEAT.fps).toBe(30);
  expect(BEAT.total).toBe(150);
  expect(BEAT.setupEnd).toBe(36);
  expect(BEAT.transformEnd).toBe(102);
  expect(BEAT.resolveEnd).toBe(132);
});

test("beatProgress clamps to 0 before and 1 after a phase", () => {
  expect(beatProgress(0, "transform")).toBe(0);
  expect(beatProgress(36, "transform")).toBe(0);
  expect(beatProgress(102, "transform")).toBe(1);
  expect(beatProgress(150, "transform")).toBe(1);
});

test("beatProgress is monotonic within a phase", () => {
  const a = beatProgress(50, "transform");
  const b = beatProgress(80, "transform");
  expect(a).toBeGreaterThan(0);
  expect(b).toBeGreaterThan(a);
  expect(b).toBeLessThan(1);
});

test("resolve phase progresses across 102..132", () => {
  expect(beatProgress(102, "resolve")).toBe(0);
  expect(beatProgress(132, "resolve")).toBe(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd remotion && npx vitest run src/beat.test.ts`
Expected: FAIL — cannot find module `./beat`.

- [ ] **Step 3: Write minimal implementation**

Create `remotion/src/beat.ts`:
```ts
import { Easing, interpolate } from "remotion";

export const BEAT = {
  fps: 30,
  total: 150,
  setupEnd: 36,
  transformEnd: 102,
  resolveEnd: 132,
} as const;

export const EASE = Easing.bezier(0.7, 0, 0.2, 1);

type Phase = "setup" | "transform" | "resolve" | "hold";

const RANGE: Record<Phase, [number, number]> = {
  setup: [0, BEAT.setupEnd],
  transform: [BEAT.setupEnd, BEAT.transformEnd],
  resolve: [BEAT.transformEnd, BEAT.resolveEnd],
  hold: [BEAT.resolveEnd, BEAT.total],
};

// Raw 0..1 progress through a phase, clamped, no easing applied.
export function beatProgress(frame: number, phase: Phase): number {
  const [a, b] = RANGE[phase];
  return interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// Eased 0..1 progress through a phase.
export function easedProgress(frame: number, phase: Phase): number {
  const [a, b] = RANGE[phase];
  return interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd remotion && npx vitest run src/beat.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add remotion/src/beat.ts remotion/src/beat.test.ts
git commit -m "feat(remotion): beat timing map + shared bezier easing"
```

---

## Task 3: Grammar primitives

**Files:**
- Create: `remotion/src/grammar/Stage.tsx`
- Create: `remotion/src/grammar/Mark.tsx`
- Create: `remotion/src/grammar/Crosshair.tsx`
- Create: `remotion/src/grammar/HexReticle.tsx`
- Create: `remotion/src/grammar/MonoCaption.tsx`

No unit tests (visual). Verified via Studio in Task 4.

- [ ] **Step 1: Create the Stage wrapper**

Create `remotion/src/grammar/Stage.tsx`:
```tsx
import React from "react";
import { AbsoluteFill } from "remotion";

// Transparent 1920x1080 stage. All clips draw inside one SVG so stroke
// widths are in a shared coordinate space.
export const Stage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        {children}
      </svg>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Create Crosshair**

Create `remotion/src/grammar/Crosshair.tsx`:
```tsx
import React from "react";

// A vertex crosshair (never a dot). arm = half-length in svg units.
export const Crosshair: React.FC<{
  x: number;
  y: number;
  color: string;
  opacity?: number;
  arm?: number;
}> = ({ x, y, color, opacity = 1, arm = 14 }) => (
  <g stroke={color} strokeWidth={3.2} opacity={opacity}>
    <line x1={x - arm} y1={y} x2={x + arm} y2={y} />
    <line x1={x} y1={y - arm} x2={x} y2={y + arm} />
  </g>
);
```

- [ ] **Step 3: Create Mark**

Create `remotion/src/grammar/Mark.tsx`:
```tsx
import React from "react";

// An account tick: a short vertical hairline. scale shrinks de-prioritised
// marks; filled draws it as a small square (an "outcome" / locked state).
export const Mark: React.FC<{
  x: number;
  y: number;
  color: string;
  opacity?: number;
  scale?: number;
  filled?: boolean;
}> = ({ x, y, color, opacity = 1, scale = 1, filled = false }) => {
  const h = 26 * scale;
  if (filled) {
    const s = 13 * scale;
    return (
      <rect
        x={x - s / 2}
        y={y - s / 2}
        width={s}
        height={s}
        fill={color}
        opacity={opacity}
      />
    );
  }
  return (
    <line
      x1={x}
      y1={y - h / 2}
      x2={x}
      y2={y + h / 2}
      stroke={color}
      strokeWidth={3.2}
      opacity={opacity}
    />
  );
};
```

- [ ] **Step 4: Create HexReticle (brand mark)**

Create `remotion/src/grammar/HexReticle.tsx`:
```tsx
import React from "react";
import { Crosshair } from "./Crosshair";

// The brand-mark hexagon in a 0..240 local box, scaled and centred at
// (cx, cy). dashOffset 0..1 draws the path on; showVertices adds crosshairs.
const HEX = "M 36 36 L 136 36 L 204 104 L 204 204 L 104 204 L 36 136 Z";
const VERTS: [number, number][] = [
  [36, 36],
  [136, 36],
  [204, 104],
  [204, 204],
  [104, 204],
  [36, 136],
];
const PERIM = 760; // approx path length, used for draw-on dasharray

export const HexReticle: React.FC<{
  cx: number;
  cy: number;
  size: number; // rendered width in svg units
  color: string;
  opacity?: number;
  draw?: number; // 0..1 path draw-on
  showVertices?: boolean;
}> = ({ cx, cy, size, color, opacity = 1, draw = 1, showVertices = false }) => {
  const s = size / 240;
  return (
    <g
      transform={`translate(${cx - (size / 2)} ${cy - (size / 2)}) scale(${s})`}
      opacity={opacity}
    >
      <path
        d={HEX}
        fill="none"
        stroke={color}
        strokeWidth={1.2 / s}
        strokeLinejoin="miter"
        strokeDasharray={PERIM}
        strokeDashoffset={PERIM * (1 - draw)}
      />
      {showVertices &&
        VERTS.map(([x, y]) => (
          <Crosshair
            key={`${x}-${y}`}
            x={x}
            y={y}
            color={color}
            arm={8 / s}
          />
        ))}
    </g>
  );
};
```

- [ ] **Step 5: Create MonoCaption**

Create `remotion/src/grammar/MonoCaption.tsx`:
```tsx
import React from "react";

// Bottom-left mono caption. opacity is driven by the caller (resolve phase).
export const MonoCaption: React.FC<{
  text: string;
  color: string;
  opacity: number;
}> = ({ text, color, opacity }) => (
  <text
    x={120}
    y={1000}
    fill={color}
    opacity={opacity}
    style={{
      fontFamily:
        'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace',
      fontSize: 30,
      letterSpacing: 3,
      textTransform: "uppercase",
    }}
  >
    {text}
  </text>
);
```

- [ ] **Step 6: Commit**

```bash
git add remotion/src/grammar
git commit -m "feat(remotion): shared motion-grammar primitives"
```

---

## Task 4: Clip 01 — Focus (vertical slice)

**Files:**
- Create: `remotion/src/clips/Focus.tsx`
- Modify: `remotion/src/Root.tsx` (replace scaffold content)
- Modify: `remotion/src/index.ts` (only if scaffold differs — verify)

Behaviour: 14 scattered marks. Setup: all faint, drift in. Transform: 11 dim+shrink to `inkSoft`; a hex reticle flies from off-canvas and converges to centre. Resolve: reticle locks (draw-on completes), 3 target marks snap to `ink` with crosshairs, accent ring + caption `FOCUS · 3 OF 7 IN SCOPE` fade in. Hold: static.

- [ ] **Step 1: Implement the clip**

Create `remotion/src/clips/Focus.tsx`:
```tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { z } from "zod";
import { THEME } from "../theme";
import { beatProgress, easedProgress } from "../beat";
import { Stage } from "../grammar/Stage";
import { Mark } from "../grammar/Mark";
import { Crosshair } from "../grammar/Crosshair";
import { HexReticle } from "../grammar/HexReticle";
import { MonoCaption } from "../grammar/MonoCaption";

export const clipSchema = z.object({ theme: z.enum(["light", "dark"]) });
export type ClipProps = z.infer<typeof clipSchema>;

// 14 deterministic positions; indices 2,6,11 are the focus targets.
const POS: [number, number][] = [
  [430, 360], [690, 250], [560, 560], [880, 470], [330, 700],
  [770, 760], [980, 300], [620, 410], [490, 880], [860, 640],
  [1180, 540], [930, 470], [1080, 760], [400, 520],
];
const TARGETS = [2, 6, 11];
const CENTER: [number, number] = [780, 540];

export const Focus: React.FC<ClipProps> = ({ theme }) => {
  const frame = useCurrentFrame();
  const t = THEME[theme];

  const driftIn = easedProgress(frame, "setup");
  const sort = easedProgress(frame, "transform"); // dim/shrink non-targets
  const converge = easedProgress(frame, "transform"); // reticle flies in
  const lock = easedProgress(frame, "resolve"); // draw-on + crosshairs
  const captionO = beatProgress(frame, "resolve");

  // Reticle travels from off top-right to CENTER during transform.
  const rx = 1700 + (CENTER[0] - 1700) * converge;
  const ry = -200 + (CENTER[1] - -200) * converge;

  return (
    <Stage>
      {POS.map(([x, y], i) => {
        const isTarget = TARGETS.includes(i);
        const baseO = 0.25 + 0.55 * driftIn;
        const opacity = isTarget
          ? baseO + 0.45 * lock
          : baseO * (1 - 0.75 * sort);
        const scale = isTarget ? 1 : 1 - 0.45 * sort;
        const color = isTarget && lock > 0.5 ? t.ink : t.inkSoft;
        return (
          <g key={i}>
            <Mark x={x} y={y} color={color} opacity={opacity} scale={scale} />
            {isTarget && lock > 0 && (
              <Crosshair x={x} y={y} color={t.ink} opacity={lock} arm={20} />
            )}
          </g>
        );
      })}

      <HexReticle
        cx={rx}
        cy={ry}
        size={520}
        color={t.inkSoft}
        opacity={0.4 + 0.6 * converge}
        draw={0.35 + 0.65 * lock}
      />

      {/* accent lock ring — the single accent moment */}
      <circle
        cx={CENTER[0]}
        cy={CENTER[1]}
        r={250}
        fill="none"
        stroke={t.accent}
        strokeWidth={3}
        opacity={lock}
      />

      <MonoCaption
        text="FOCUS · 3 OF 7 IN SCOPE"
        color={t.ink}
        opacity={captionO}
      />
    </Stage>
  );
};
```

- [ ] **Step 2: Replace Root.tsx with the four-composition registry**

Overwrite `remotion/src/Root.tsx`:
```tsx
import React from "react";
import { Composition } from "remotion";
import { clipSchema } from "./clips/Focus";
import { Focus } from "./clips/Focus";

const COMMON = {
  durationInFrames: 150,
  fps: 30,
  width: 1920,
  height: 1080,
  schema: clipSchema,
} as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="focus-light"
        component={Focus}
        defaultProps={{ theme: "light" as const }}
        {...COMMON}
      />
      <Composition
        id="focus-dark"
        component={Focus}
        defaultProps={{ theme: "dark" as const }}
        {...COMMON}
      />
    </>
  );
};
```
(Clips 02–04 add their compositions here in Tasks 7–9.)

- [ ] **Step 3: Verify index.ts registers the root**

Read `remotion/src/index.ts`. It must be exactly:
```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
```
If the scaffold differs, replace it with the above.

- [ ] **Step 4: Single-frame still check (the "test")**

Run from repo root:
```bash
cd remotion && npx remotion still focus-light --frame=140 --scale=0.5 \
  out/focus-check.png && cd ..
```
Expected: command exits 0; open `remotion/out/focus-check.png` (frame 140 = hold). Must show: 3 ink marks with crosshairs, a completed hex outline, an accent ring, dimmed non-target marks, and the caption `FOCUS · 3 OF 7 IN SCOPE`. Transparent background (checkerboard in viewers).

- [ ] **Step 5: Studio eyeball pass**

Run: `cd remotion && npx remotion studio` — scrub `focus-light` 0→150. Confirm the four beats read (drift → sort+converge → lock → hold), accent appears only in resolve, motion uses the shared easing (no linear ramps). Switch `theme` prop to `dark` in the sidebar; confirm ink/inkSoft invert and accent is unchanged. Stop Studio.

- [ ] **Step 6: Commit**

```bash
git add remotion/src/clips/Focus.tsx remotion/src/Root.tsx remotion/src/index.ts
git commit -m "feat(remotion): clip 01 Focus + composition registry"
```

---

## Task 5: Render script

**Files:**
- Create: `remotion/scripts/render.mjs`
- Modify: `remotion/package.json` (add `render` script)

- [ ] **Step 1: Write the render script**

Create `remotion/scripts/render.mjs`:
```js
import { bundle } from "@remotion/bundler";
import {
  renderMedia,
  renderStill,
  selectComposition,
} from "@remotion/renderer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "..");
const outDir = path.join(root, "public", "howitworks");
mkdirSync(outDir, { recursive: true });

const CLIPS = ["focus", "move", "travel", "improve"];
const THEMES = ["light", "dark"];

const serveUrl = await bundle({
  entryPoint: path.join(__dirname, "..", "src", "index.ts"),
});

for (const clip of CLIPS) {
  for (const theme of THEMES) {
    const id = `${clip}-${theme}`;
    let composition;
    try {
      composition = await selectComposition({ serveUrl, id });
    } catch {
      console.log(`skip ${id} (not registered yet)`);
      continue;
    }
    const webm = path.join(outDir, `${id}.webm`);
    const poster = path.join(outDir, `${id}.png`);
    await renderMedia({
      composition,
      serveUrl,
      codec: "vp9",
      pixelFormat: "yuva420p",
      imageFormat: "png",
      outputLocation: webm,
      crf: 18,
    });
    await renderStill({
      composition,
      serveUrl,
      frame: 149, // final hold frame
      imageFormat: "png",
      output: poster,
    });
    console.log(`rendered ${id} -> webm + poster`);
  }
}
console.log("done");
```

- [ ] **Step 2: Add the render script to package.json**

In `remotion/package.json` `"scripts"` add:
```json
"render": "node scripts/render.mjs"
```

- [ ] **Step 3: Run the render (only `focus-*` exists so far)**

Run from repo root:
```bash
cd remotion && npm run render && cd ..
```
Expected: logs `rendered focus-light -> webm + poster`, `rendered focus-dark -> webm + poster`, and `skip move-* / travel-* / improve-*`. Files `public/howitworks/focus-light.webm`, `focus-light.png`, `focus-dark.webm`, `focus-dark.png` exist and each `.webm` is non-zero (`ls -la public/howitworks`).

- [ ] **Step 4: Commit**

```bash
git add remotion/scripts/render.mjs remotion/package.json public/howitworks
git commit -m "feat(remotion): render script + rendered Focus clip assets"
```

---

## Task 6: Site integration component + wire Focus (completes the vertical slice)

**Files:**
- Create: `src/app/howitworks-clip.tsx`
- Modify: `src/app/page.tsx` (HowItWorks: add clip slot; map only `focus` for now)

- [ ] **Step 1: Create the client component**

Create `src/app/howitworks-clip.tsx`:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const CLIP_IDS = ["focus", "move", "travel", "improve"] as const;
export type ClipId = (typeof CLIP_IDS)[number];

// Plays the matching transparent WebM once when scrolled into view, then
// holds the final frame. Theme is selected by prefers-color-scheme via the
// <source media> queries (the site themes purely from the OS). The PNG
// poster is the fallback for reduced-motion and WebM-unsupported browsers.
export function HowItWorksClip({ id }: { id: ClipId }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const base = `/howitworks/${id}`;

  if (reduced) {
    return (
      <picture>
        <source srcSet={`${base}-dark.png`} media="(prefers-color-scheme: dark)" />
        <img
          src={`${base}-light.png`}
          alt=""
          aria-hidden
          className="aspect-video w-full"
        />
      </picture>
    );
  }

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="metadata"
      poster={`${base}-light.png`}
      aria-hidden
      className="aspect-video w-full"
    >
      <source src={`${base}-dark.webm`} media="(prefers-color-scheme: dark)" type="video/webm" />
      <source src={`${base}-light.webm`} type="video/webm" />
    </video>
  );
}
```

- [ ] **Step 2: Wire it into HowItWorks**

In `src/app/page.tsx`, add the import near the other `./` imports:
```tsx
import { HowItWorksClip, type ClipId } from "./howitworks-clip";
```

In the `features` array, add a `clip` field to each entry. For Task 6 only entry `01` is functional, but set all four now (their assets arrive in Tasks 7–9):
```tsx
const features = [
  { n: "01", clip: "focus" as ClipId, title: "Focus the team.", lead: "Kithos shows the team where to spend scarce commercial time.", body: "It surfaces which segments, accounts, and opportunities deserve attention now — and which to deprioritise — so effort lands on the deals most likely to move." },
  { n: "02", clip: "move" as ClipId, title: "Move the right deals forward.", lead: "For each account, Kithos clarifies who matters, why they should care, and what should happen next.", body: "It turns context, signals, objections, and prior outcomes into a clear next move: what to send, who to involve, when to follow up, when to walk away." },
  { n: "03", clip: "travel" as ClipId, title: "Make learning travel.", lead: "Kithos turns individual outcomes into shared commercial memory.", body: "What happened, why it happened, and what worked becomes available across accounts, meetings, objections, wins, and losses. New hires inherit context and patterns, not just CRM activity." },
  { n: "04", clip: "improve" as ClipId, title: "Build a motion that improves.", lead: "Every account, meeting, objection, win, and loss feeds back in.", body: "Kithos finds the patterns that work for your team and uses them to sharpen the next move — across targeting, messaging, qualification, follow-up, and the playbook itself." },
];
```

In the `HowItWorks` `<li>` JSX, insert the clip as the first child of the `<li>`, above the number row:
```tsx
<li
  key={f.n}
  className="relative flex flex-col gap-6 rounded-2xl p-8 md:p-10 lg:p-12"
  style={{ background: tints[i] }}
>
  <div className="overflow-hidden rounded-lg">
    <HowItWorksClip id={f.clip} />
  </div>
  <div className="flex items-baseline justify-between gap-4">
```
(Leave the rest of the `<li>` unchanged.)

- [ ] **Step 3: Typecheck + build**

Run from repo root: `npm run build`
Expected: compiles successfully; TypeScript passes; `/` is still statically prerendered.

- [ ] **Step 4: Browser verification (golden path + edge cases)**

Run `npm run dev`, then verify with Playwright at the dev URL:
- Light OS: scroll to `#how`; the `01` card video plays once on entry and holds frame ~149 (3 marks + crosshairs + accent ring + caption). Cards 02–04 show their poster (none yet → broken img is expected until Tasks 7–9; acceptable at this checkpoint, note it).
- Dark OS (`emulateMedia colorScheme:'dark'`): the `01` clip uses `focus-dark.webm` (ink is light).
- Reduced motion (`emulateMedia reducedMotion:'reduce'`): no `<video>` mounted for `01`; the poster `<img>` renders.
Confirm zero Remotion packages in the client bundle: `grep -r "remotion" .next/static 2>/dev/null` returns nothing.

- [ ] **Step 5: Commit**

```bash
git add src/app/howitworks-clip.tsx src/app/page.tsx
git commit -m "feat: mount Focus clip on the How It Works card"
```

---

## Task 7: Clip 02 — Move

**Files:**
- Create: `remotion/src/clips/Move.tsx`
- Modify: `remotion/src/Root.tsx` (register `move-light` / `move-dark`)

Behaviour: account node left (240,540), goal marker right (1680,540). Setup: node + goal fade in. Transform: 3 context fragments (`signal·objection·prior`) fly from bottom and dock into a left-to-right polyline that draws toward the goal. Resolve: final segment fires in accent + caption `NEXT MOVE: INTRO + PROOF`. Hold: static.

- [ ] **Step 1: Implement the clip**

Create `remotion/src/clips/Move.tsx`:
```tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { beatProgress, easedProgress } from "../beat";
import { Stage } from "../grammar/Stage";
import { Crosshair } from "../grammar/Crosshair";
import { MonoCaption } from "../grammar/MonoCaption";
import { clipSchema, type ClipProps } from "./Focus";

export { clipSchema };

const NODE: [number, number] = [240, 540];
const GOAL: [number, number] = [1680, 540];
// polyline waypoints between node and goal
const WAY: [number, number][] = [
  [240, 540], [620, 430], [1000, 600], [1340, 470], [1680, 540],
];
const FRAGS: { x: number; label: string }[] = [
  { x: 560, label: "SIGNAL" },
  { x: 880, label: "OBJECTION" },
  { x: 1200, label: "PRIOR" },
];

export const Move: React.FC<ClipProps> = ({ theme }) => {
  const frame = useCurrentFrame();
  const t = THEME[theme];

  const appear = easedProgress(frame, "setup");
  const dock = easedProgress(frame, "transform"); // frags rise + path draws
  const fire = easedProgress(frame, "resolve"); // final accent segment
  const captionO = beatProgress(frame, "resolve");

  // Path drawn progressively across the first 4 segments during transform,
  // last segment reserved for the accent "fire".
  const drawnSegs = dock * 4;

  return (
    <Stage>
      {/* node + goal */}
      <circle cx={NODE[0]} cy={NODE[1]} r={16} fill={t.ink} opacity={appear} />
      <g opacity={appear}>
        <Crosshair x={GOAL[0]} y={GOAL[1]} color={t.inkSoft} arm={26} />
      </g>

      {/* context fragments rising and docking */}
      {FRAGS.map((f, i) => {
        const startO = beatProgress(frame, "transform");
        const y = 980 - 440 * dock;
        return (
          <g key={f.label} opacity={(0.3 + 0.7 * dock) * (i < 3 ? 1 : 0)}>
            <rect
              x={f.x - 16}
              y={y - 16}
              width={32}
              height={32}
              fill="none"
              stroke={t.inkSoft}
              strokeWidth={3.2}
              opacity={0.3 + 0.7 * startO}
            />
          </g>
        );
      })}

      {/* polyline (first 4 segments, ink) */}
      {WAY.slice(0, 4).map(([x1, y1], i) => {
        const [x2, y2] = WAY[i + 1];
        const segP = Math.max(0, Math.min(1, drawnSegs - i));
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x1 + (x2 - x1) * segP}
            y2={y1 + (y2 - y1) * segP}
            stroke={t.ink}
            strokeWidth={3.2}
            opacity={0.85}
          />
        );
      })}

      {/* final accent segment — the next move */}
      {(() => {
        const [x1, y1] = WAY[3];
        const [x2, y2] = WAY[4];
        return (
          <g>
            <line
              x1={x1}
              y1={y1}
              x2={x1 + (x2 - x1) * fire}
              y2={y1 + (y2 - y1) * fire}
              stroke={t.accent}
              strokeWidth={4}
            />
          </g>
        );
      })()}

      <MonoCaption
        text="NEXT MOVE: INTRO + PROOF"
        color={t.ink}
        opacity={captionO}
      />
    </Stage>
  );
};
```

- [ ] **Step 2: Register the compositions**

In `remotion/src/Root.tsx`, add the import:
```tsx
import { Move } from "./clips/Move";
```
And add inside the `<>...</>`, after the Focus compositions:
```tsx
<Composition
  id="move-light"
  component={Move}
  defaultProps={{ theme: "light" as const }}
  {...COMMON}
/>
<Composition
  id="move-dark"
  component={Move}
  defaultProps={{ theme: "dark" as const }}
  {...COMMON}
/>
```

- [ ] **Step 3: Still + Studio check**

Run: `cd remotion && npx remotion still move-light --frame=140 --scale=0.5 out/move-check.png && cd ..`
Expected: exit 0; image shows node→polyline→goal with the final segment in accent and caption `NEXT MOVE: INTRO + PROOF`. Then `npx remotion studio`, scrub `move-light` and `move-dark`, confirm beats and theme inversion. Stop Studio.

- [ ] **Step 4: Commit**

```bash
git add remotion/src/clips/Move.tsx remotion/src/Root.tsx
git commit -m "feat(remotion): clip 02 Move"
```

---

## Task 8: Clip 03 — Travel

**Files:**
- Create: `remotion/src/clips/Travel.tsx`
- Modify: `remotion/src/Root.tsx` (register `travel-light` / `travel-dark`)

Behaviour: 6-node constellation; node 0 holds a filled outcome mark. Transform: a line radiates outcome→node by node, each lighting and staying lit. Resolve: a 7th "new hire" node fades in and an accent link reaches it + caption `MEMORY: SHARED ACROSS 7`. Hold: static.

- [ ] **Step 1: Implement the clip**

Create `remotion/src/clips/Travel.tsx`:
```tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { beatProgress, easedProgress } from "../beat";
import { Stage } from "../grammar/Stage";
import { Mark } from "../grammar/Mark";
import { MonoCaption } from "../grammar/MonoCaption";
import { clipSchema, type ClipProps } from "./Focus";

export { clipSchema };

// node 0 = origin outcome; 1..5 existing accounts; 6 = new hire
const NODES: [number, number][] = [
  [520, 540], [760, 360], [980, 600], [1180, 380],
  [1320, 620], [900, 820], [1500, 480],
];
// radiate order as edges from already-lit set
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 5], [3, 4],
];

export const Travel: React.FC<ClipProps> = ({ theme }) => {
  const frame = useCurrentFrame();
  const t = THEME[theme];

  const fill = easedProgress(frame, "setup"); // outcome fills
  const spread = easedProgress(frame, "transform"); // edges draw in order
  const join = easedProgress(frame, "resolve"); // new hire joins (accent)
  const captionO = beatProgress(frame, "resolve");

  const drawn = spread * EDGES.length;

  const litBy = (node: number) => {
    if (node === 0) return fill;
    let maxP = 0;
    EDGES.forEach(([, b], idx) => {
      if (b === node) maxP = Math.max(maxP, Math.min(1, drawn - idx));
    });
    return maxP;
  };

  return (
    <Stage>
      {EDGES.map(([a, b], i) => {
        const p = Math.max(0, Math.min(1, drawn - i));
        const [x1, y1] = NODES[a];
        const [x2, y2] = NODES[b];
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x1 + (x2 - x1) * p}
            y2={y1 + (y2 - y1) * p}
            stroke={t.inkSoft}
            strokeWidth={3.2}
            opacity={0.7}
          />
        );
      })}

      {/* accent link to new-hire node 6 from node 3 */}
      {(() => {
        const [x1, y1] = NODES[3];
        const [x2, y2] = NODES[6];
        return (
          <line
            x1={x1}
            y1={y1}
            x2={x1 + (x2 - x1) * join}
            y2={y1 + (y2 - y1) * join}
            stroke={t.accent}
            strokeWidth={4}
            opacity={join}
          />
        );
      })()}

      {NODES.map(([x, y], i) => {
        if (i === 6) {
          return (
            <Mark key={i} x={x} y={y} color={t.ink} opacity={join} />
          );
        }
        const lit = litBy(i);
        return (
          <Mark
            key={i}
            x={x}
            y={y}
            color={i === 0 ? t.ink : t.inkSoft}
            opacity={0.3 + 0.7 * lit}
            filled={i === 0 && fill > 0.5}
          />
        );
      })}

      <MonoCaption
        text="MEMORY: SHARED ACROSS 7"
        color={t.ink}
        opacity={captionO}
      />
    </Stage>
  );
};
```

- [ ] **Step 2: Register the compositions**

In `remotion/src/Root.tsx` add `import { Travel } from "./clips/Travel";` and, after the Move compositions:
```tsx
<Composition
  id="travel-light"
  component={Travel}
  defaultProps={{ theme: "light" as const }}
  {...COMMON}
/>
<Composition
  id="travel-dark"
  component={Travel}
  defaultProps={{ theme: "dark" as const }}
  {...COMMON}
/>
```

- [ ] **Step 3: Still + Studio check**

Run: `cd remotion && npx remotion still travel-light --frame=140 --scale=0.5 out/travel-check.png && cd ..`
Expected: exit 0; image shows the filled outcome, lit constellation, accent link to the 7th node, caption `MEMORY: SHARED ACROSS 7`. Studio-scrub `travel-light`/`travel-dark`, confirm beats + theme inversion. Stop Studio.

- [ ] **Step 4: Commit**

```bash
git add remotion/src/clips/Travel.tsx remotion/src/Root.tsx
git commit -m "feat(remotion): clip 03 Travel"
```

---

## Task 9: Clip 04 — Improve

**Files:**
- Create: `remotion/src/clips/Improve.tsx`
- Modify: `remotion/src/Root.tsx` (register `improve-light` / `improve-dark`)

Behaviour: 5 input ticks (`a m o w l`) bottom-left feed a circular loop centred at (960,540). Transform: loop rotates and its radius contracts in 3 visible steps while a step-bar climbs. Resolve: tightest pass emits one accent next-move vector + caption `MOTION v.04 · SHARPER`. Hold: static.

- [ ] **Step 1: Implement the clip**

Create `remotion/src/clips/Improve.tsx`:
```tsx
import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { beatProgress, easedProgress } from "../beat";
import { Stage } from "../grammar/Stage";
import { Mark } from "../grammar/Mark";
import { MonoCaption } from "../grammar/MonoCaption";
import { clipSchema, type ClipProps } from "./Focus";

export { clipSchema };

const CX = 960;
const CY = 540;
const INPUTS = ["A", "M", "O", "W", "L"];

export const Improve: React.FC<ClipProps> = ({ theme }) => {
  const frame = useCurrentFrame();
  const t = THEME[theme];

  const feed = easedProgress(frame, "setup");
  const cycle = easedProgress(frame, "transform");
  const emit = easedProgress(frame, "resolve");
  const captionO = beatProgress(frame, "resolve");

  // radius contracts in 3 steps: 320 -> 250 -> 180 -> 130
  const step = Math.floor(cycle * 3.999);
  const radii = [320, 250, 180, 130];
  const radius = radii[Math.min(step, 3)];
  const rot = cycle * Math.PI * 4; // two revolutions

  // ring as a circle with rotating gap to imply motion
  const dash = 2 * Math.PI * radius;

  return (
    <Stage>
      {/* input ticks feeding in */}
      {INPUTS.map((label, i) => {
        const x = 360 + i * 70;
        const y = 900 - 120 * feed;
        return (
          <Mark
            key={label}
            x={x}
            y={y}
            color={t.inkSoft}
            opacity={0.3 + 0.7 * feed}
          />
        );
      })}

      {/* contracting loop */}
      <g transform={`rotate(${(rot * 180) / Math.PI} ${CX} ${CY})`}>
        <circle
          cx={CX}
          cy={CY}
          r={radius}
          fill="none"
          stroke={t.ink}
          strokeWidth={3.2}
          strokeDasharray={`${dash * 0.78} ${dash * 0.22}`}
          opacity={0.4 + 0.6 * cycle}
        />
      </g>

      {/* step-bar climbing */}
      {[0, 1, 2, 3].map((b) => (
        <rect
          key={b}
          x={1500 + b * 40}
          y={760 - b * 26}
          width={26}
          height={40 + b * 26}
          fill={t.inkSoft}
          opacity={step >= b ? 0.6 : 0.12}
        />
      ))}

      {/* accent emitted next-move vector */}
      <line
        x1={CX}
        y1={CY}
        x2={CX + 360 * emit}
        y2={CY - 220 * emit}
        stroke={t.accent}
        strokeWidth={4}
        opacity={emit}
      />

      <MonoCaption
        text="MOTION v.04 · SHARPER"
        color={t.ink}
        opacity={captionO}
      />
    </Stage>
  );
};
```

- [ ] **Step 2: Register the compositions**

In `remotion/src/Root.tsx` add `import { Improve } from "./clips/Improve";` and, after the Travel compositions:
```tsx
<Composition
  id="improve-light"
  component={Improve}
  defaultProps={{ theme: "light" as const }}
  {...COMMON}
/>
<Composition
  id="improve-dark"
  component={Improve}
  defaultProps={{ theme: "dark" as const }}
  {...COMMON}
/>
```

- [ ] **Step 3: Still + Studio check**

Run: `cd remotion && npx remotion still improve-light --frame=140 --scale=0.5 out/improve-check.png && cd ..`
Expected: exit 0; image shows the contracted loop, climbed step-bar, accent vector, caption `MOTION v.04 · SHARPER`. Studio-scrub `improve-light`/`improve-dark`, confirm 3 contraction steps + theme inversion. Stop Studio.

- [ ] **Step 4: Commit**

```bash
git add remotion/src/clips/Improve.tsx remotion/src/Root.tsx
git commit -m "feat(remotion): clip 04 Improve"
```

---

## Task 10: Render all + final end-to-end verification

**Files:**
- Modify: `public/howitworks/*` (all 8 webm + 8 png)

- [ ] **Step 1: Render every clip and theme**

Run from repo root:
```bash
cd remotion && npm run render && cd ..
ls -la public/howitworks
```
Expected: 8 `.webm` + 8 `.png` files (`focus|move|travel|improve` × `light|dark`), each `.webm` non-zero. No `skip` lines.

- [ ] **Step 2: Codec/quality gate**

For each `.webm`, check size and that strokes are crisp:
```bash
du -h public/howitworks/*.webm
```
Expected: each ≤ ~200 KB (spec ceiling). If any clip is visibly blurry on hairlines when played, raise render scale (set `width:3840,height:2160` in `COMMON`, re-render) — recorded in spec risks. Do not exceed 200 KB without flagging.

- [ ] **Step 3: Production build + bundle check**

Run: `npm run build`
Expected: success; `/` prerendered. Then:
```bash
grep -rl "remotion" .next/static 2>/dev/null || echo "NO REMOTION IN CLIENT BUNDLE"
```
Expected: prints `NO REMOTION IN CLIENT BUNDLE`.

- [ ] **Step 4: Full browser verification (both themes + reduced motion)**

Run `npm run dev`. With Playwright at the dev URL, scroll to `#how` and verify for all four cards:
- Light OS: each clip plays once on entry, holds its final frame; the accent moment appears only late; caption present and correct per clip.
- Dark OS (`emulateMedia colorScheme:'dark'`): each clip uses its `-dark.webm`; ink reads light, accent unchanged.
- Reduced motion (`emulateMedia reducedMotion:'reduce'`): no `<video>` elements under `#how`; each card shows its poster `<img>` (theme-correct via `<picture>`).
- No console errors; no broken image requests in the network panel for `/howitworks/*`.

- [ ] **Step 5: Commit**

```bash
git add public/howitworks
git commit -m "feat: render all four How It Works clips (light + dark)"
```

---

## Self-Review

**Spec coverage:**
- Editorial-precise direction → grammar primitives (Task 3) + clips (4,7,8,9). ✓
- Pre-rendered transparent WebM, no Remotion JS shipped → Task 5 render script, Task 6/10 bundle grep. ✓ (MP4 fallback dropped — H.264 has no alpha; PNG poster is the documented fallback. Deviation noted in plan header.)
- Motion grammar (palette, single accent moment, mono caption, 5s/30fps beat, bezier easing, hold) → `theme.ts` (1), `beat.ts` (2), primitives (3), enforced in each clip. ✓
- Play once on IntersectionObserver, hold final frame → `HowItWorksClip` (6). ✓
- System-only theming via `<source media>` → `HowItWorksClip` (6); consistent with the committed globals.css change. ✓
- Reduced motion → poster-only branch (6), verified (6,10). ✓
- 16:9 above the numeral, prose unchanged → page.tsx edit (6) inserts clip as first `<li>` child only. ✓
- Four clip concepts → Tasks 4,7,8,9 implement exactly the spec's described beats and captions. ✓
- Risks: codec/bitrate gate (Task 10 step 2 with escape hatch); Remotion/React 19 — resolved (peer `react >=16.8.0`), no pin needed, stated in Tech Stack. ✓
- Out of scope (CI wiring, OG reuse) — not in plan. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete code; clips 02–04 carry full code (not "similar to Task 4"). ✓

**Type consistency:** `clipSchema`/`ClipProps` defined once in `Focus.tsx`, re-exported and reused by Move/Travel/Improve and Root. `ClipId` defined in `howitworks-clip.tsx`, used in `page.tsx`. `THEME`/`ThemeName`/`Tokens` consistent across all clips. `beatProgress`/`easedProgress`/`BEAT`/`EASE` names stable from Task 2 onward. ✓
