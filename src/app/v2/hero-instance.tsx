"use client";

import { useEffect, useRef } from "react";
import {
  SiSalesforce,
  SiSlack,
  SiGmail,
  SiHubspot,
  SiNotion,
  SiGooglesheets,
} from "react-icons/si";
import { FiGlobe } from "react-icons/fi";

/* Hero instance — the thesis in motion: the real sales-stack logos
   stream in from the left and resolve into the flat signal-yellow
   Kithos mark.

   SSR renders the full, correct static composition (no-JS / reduced
   motion get a good picture). On mount, when motion is allowed, a
   one-time cinematic build plays on top — routes draw, the mark
   springs in with a physical settle and a single accent wake ring —
   then it relaxes into the calm continuous loop (CSS Motion Path).
   Pointer parallax adds a few px of depth. Everything is layered on;
   nothing the build does is required for the picture to read. */

const ICONS = [
  SiSalesforce,
  SiSlack,
  SiGmail,
  SiHubspot,
  SiNotion,
  SiGooglesheets,
  FiGlobe,
];

const CX = 580;
const CY = 130;

// Deterministic per-source hash (pure, stable across SSR/client).
const hash = (n: number) => {
  const v = Math.sin(n * 99.137) * 43758.5453;
  return v - Math.floor(v);
};

const STACK = ICONS.map((Icon, i) => {
  const band = 26 + (i * 218) / (ICONS.length - 1);
  const oy = Math.round(band + (hash(i + 1) * 26 - 13));
  const ox = Math.round(64 + hash(i + 17) * 96);
  const dur = +(4 + hash(i + 31) * 1.6).toFixed(2);
  const delay = +(hash(i + 53) * dur).toFixed(2);
  const d = `M ${ox} ${oy} C ${ox + 250} ${oy}, ${CX - 230} ${
    oy + (CY - oy) * 0.62
  }, ${CX} ${CY}`;
  return { Icon, ox, oy, dur, delay, d };
});

export function HeroInstance() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<SVGGElement>(null);
  const routeRefs = useRef<(SVGPathElement | null)[]>([]);
  const hexRef = useRef<SVGGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const hex = hexRef.current;
    const ring = ringRef.current;
    const routes = routeRefs.current.filter(Boolean) as SVGPathElement[];

    // --- Cinematic build (one-time) -----------------------------------
    routes.forEach((p, i) => {
      p.style.strokeDasharray = "1";
      p.style.strokeDashoffset = "1";
      const a = p.animate(
        [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
        {
          duration: 680,
          delay: 120 + i * 70,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "forwards",
        },
      );
      a.finished
        .then(() => {
          p.style.strokeDasharray = "";
          p.style.strokeDashoffset = "";
        })
        .catch(() => {});
    });

    if (hex) {
      hex.style.transformBox = "fill-box";
      hex.style.transformOrigin = "center";
      hex.animate(
        [
          { opacity: 0, transform: "scale(.45)" },
          { opacity: 1, transform: "scale(1.09)", offset: 0.62 },
          { transform: "scale(.97)", offset: 0.82 },
          { opacity: 1, transform: "scale(1)" },
        ],
        {
          duration: 860,
          delay: 460,
          // back-ease ≈ a damped spring settle
          easing: "cubic-bezier(.34,1.32,.5,1)",
          fill: "backwards",
        },
      );
    }

    if (ring) {
      ring.animate(
        [
          { transform: "scale(.2)", opacity: 0.34 },
          { transform: "scale(2.6)", opacity: 0 },
        ],
        {
          duration: 640,
          delay: 1160,
          easing: "cubic-bezier(.22,1,.36,1)",
          fill: "forwards",
        },
      );
    }

    // --- Pointer parallax (a few px of depth) -------------------------
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const wrap = wrapRef.current;
    const px = parallaxRef.current;
    if (!wrap || !px) return;

    let tx = 0;
    let ty = 0;
    let cxv = 0;
    let cyv = 0;
    let raf = 0;
    const tick = () => {
      cxv += (tx - cxv) * 0.08;
      cyv += (ty - cyv) * 0.08;
      px.style.transform = `translate(${cxv.toFixed(2)}px, ${cyv.toFixed(
        2,
      )}px)`;
      raf = Math.abs(tx - cxv) > 0.05 || Math.abs(ty - cyv) > 0.05
        ? requestAnimationFrame(tick)
        : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx * 14;
      ty = ny * 9;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="relative w-full">
      <svg
        viewBox="0 0 1160 270"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g ref={parallaxRef} style={{ willChange: "transform" }}>
          {/* Faint guide routes */}
          {STACK.map((s, i) => (
            <path
              key={`g-${i}`}
              ref={(el) => {
                routeRefs.current[i] = el;
              }}
              pathLength={1}
              d={s.d}
              fill="none"
              stroke="var(--rule)"
              strokeWidth="0.7"
              opacity="0.3"
            />
          ))}
          {/* The genuine logos, continuously flowing into the mark */}
          {STACK.map((s, i) => (
            <g
              key={`f-${i}`}
              className="v2-flow"
              style={{
                offsetPath: `path("${s.d}")`,
                offsetRotate: "0deg",
                animationDuration: `${s.dur}s`,
                animationDelay: `-${s.delay}s`,
              }}
            >
              <g transform="translate(-14 -14)">
                <s.Icon size={28} color="var(--muted)" />
              </g>
            </g>
          ))}
          {/* Accent wake ring — one-shot secondary motion on the settle */}
          <circle
            ref={ringRef}
            cx={CX}
            cy={CY}
            r="34"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          {/* Focal Kithos mark — flat, solid signal-yellow. Outer group
              positions; inner group carries the spring (its transform
              must not clobber the positioning transform). */}
          <g transform="translate(501 51) scale(0.66)">
            <g ref={hexRef}>
              <path
                d="M 36 36 L 136 36 L 204 104 L 204 204 L 104 204 L 36 136 Z"
                fill="var(--accent)"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
