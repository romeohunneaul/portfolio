"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Pt = [number, number];

/**
 * The logo, drawn by hand: the ridge traces itself, the snow lines follow, then the sky —
 * a sun with its rays by day, a moon and stars by night. Each stroke runs on its own clock
 * (`at`/`dur`, seconds); the motion is CSS (.sketch in globals.css), so the drawing is
 * there without JS and never flashes on hydration. Both skies are rendered; the theme
 * picks one with `dark:`. Flipping the theme replays the whole drawing.
 * Geometry is logo.tsx's, sun enlarged; prototyped in /lab/hero-sketch.
 * The ridge is filled with the card colour (it sat on a card); set `--sketch-fill` for another surface.
 */
type Stroke = { d: string; color: string; at: number; dur: number; w?: number; square?: boolean };

const path = (pts: Pt[], closed = false) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join("") + (closed ? "Z" : "");

const arc = (cx: number, cy: number, r: number, from: number, to: number, n = 28): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = from + ((to - from) * i) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

const RIDGE = path([[3, 30], [16, 9], [23, 20], [28, 14], [40, 30]], true);
const LISERETS = ["M12.9 18L16.05 20.05L19.5 17.8", "M25.75 19.95L28.51 22.2L30.7 20.55"];
const SUN = { cx: 31, cy: 11, r: 8.5 };
/** Drawn like a hand closes a circle: it starts top-left and overshoots a little. */
const SUN_LINE = path(arc(SUN.cx, SUN.cy, SUN.r, -2.4, -2.4 + Math.PI * 2.08));
const SUN_DISC = path(arc(SUN.cx, SUN.cy, SUN.r, 0, Math.PI * 2), true);
const RAYS = Array.from({ length: 9 }, (_, i) => {
  const a = -Math.PI / 2 + ((i - 4) / 9) * Math.PI * 2;
  const at = (r: number): Pt => [SUN.cx + r * Math.cos(a), SUN.cy + r * Math.sin(a)];
  return path([at(SUN.r + 2), at(SUN.r + 4.6)]);
});
/** Crescent opening to the right: outer arc, then the inner arc back. */
const MOON = path([...arc(31, 11, 7.5, 1.05, 5.25, 20), ...arc(34.4, 9.2, 6.2, 4.95, 1.35, 18)], true);
const STARS: Pt[] = [[4, 6], [10, 1], [19, 3], [44, 2], [45, 14], [8, 14], [41, 21]];

const DAY: Stroke[] = [
  { d: SUN_LINE, color: "var(--accent-strong)", w: 1.3, at: 2.3, dur: 0.9 },
  ...RAYS.map((d, i) => ({ d, color: "var(--accent-strong)", w: 1.3, at: 3.3 + i * 0.08, dur: 0.18 })),
];
const NIGHT: Stroke[] = [
  { d: MOON, color: "color-mix(in srgb, var(--ink) 45%, var(--highlight-punch))", w: 1.2, at: 2.3, dur: 0.9 },
  ...STARS.flatMap(([x, y], i) => [
    { d: path([[x - 0.9, y], [x + 0.9, y]]), color: "var(--ink)", w: 0.45, at: 3.3 + i * 0.12, dur: 0.14 },
    { d: path([[x, y - 0.9], [x, y + 0.9]]), color: "var(--ink)", w: 0.45, at: 3.3 + i * 0.12, dur: 0.14 },
  ]),
];

const clock = (at: number, dur: number) => ({ "--at": `${at}s`, "--dur": `${dur}s` }) as CSSProperties;

function Lines({ strokes }: { strokes: Stroke[] }) {
  return strokes.map((s) => (
    <path
      key={s.d}
      data-line
      d={s.d}
      pathLength={1}
      fill="none"
      stroke={s.color}
      strokeWidth={s.w}
      strokeLinecap={s.square ? "square" : "round"}
      strokeLinejoin="round"
      style={clock(s.at, s.dur)}
    />
  ));
}

export function RidgeSketch({ width = 170 }: { width?: number }) {
  const ref = useRef<SVGSVGElement>(null);

  // Replay on a theme flip. The no-flash script sets data-theme before hydration,
  // so this only fires on a real switch.
  useEffect(() => {
    const replay = () => ref.current?.getAnimations?.({ subtree: true }).forEach((a) => (a.cancel(), a.play()));
    const mo = new MutationObserver(replay);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  return (
    <svg ref={ref} className="sketch" viewBox="-2 -5 50 38" width={width} aria-hidden style={{ maxWidth: "100%" }}>
      {/* Sky first: the ridge hides its lower half. */}
      <g className="dark:hidden">
        <path data-fill d={SUN_DISC} fill="var(--accent-strong)" style={clock(3.0, 0.5)} />
        <Lines strokes={DAY} />
      </g>
      <g className="hidden dark:inline">
        <path
          data-fill
          d={MOON}
          fill="color-mix(in srgb, var(--ink) 75%, var(--highlight-punch))"
          style={clock(3.0, 0.5)}
        />
        <Lines strokes={NIGHT} />
      </g>
      {/* At night the ridge is a silhouette in the page's paper, darker than the card — not ice. */}
      <path data-fill d={RIDGE} className="fill-[var(--sketch-fill,var(--paper-card))] dark:fill-[var(--paper)]" style={clock(1.1, 0.5)} />
      <Lines strokes={[{ d: RIDGE, color: "var(--ridge)", w: 2.4, at: 0, dur: 1.5 }]} />
      <Lines
        strokes={LISERETS.map((d, i) => ({ d, color: "var(--snow)", w: 1.6, square: true, at: 1.55 + i * 0.35, dur: 0.35 }))}
      />
    </svg>
  );
}
