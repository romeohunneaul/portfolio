"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/lib/theme";
import { useAxis } from "@/lab/variants";

type Pt = [number, number];
type Mode = "day" | "night";

/**
 * One element of the drawing, in paint order. `at`/`dur` place it on the pen's timeline:
 * lines trace themselves, fills settle once their outline is down.
 * solid: an opaque fill that hides what sits behind the ridge — never shifted, never washed.
 */
type El = {
  kind: "line" | "fill";
  pts: Pt[];
  color: string;
  at: number;
  dur: number;
  w?: number;
  closed?: boolean;
  square?: boolean;
  solid?: boolean;
  seed: number;
};

const arc = (cx: number, cy: number, r: number, from: number, to: number, n = 28): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = from + ((to - from) * i) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

/* ── Geometry — the header mark (logo.tsx), sun enlarged. ViewBox leaves room for the rays. ── */

const VB = "-2 -5 50 38";
const RIDGE: Pt[] = [[3, 30], [16, 9], [23, 20], [28, 14], [40, 30]];
const LISERETS: Pt[][] = [
  [[12.9, 18], [16.05, 20.05], [19.5, 17.8]],
  [[25.75, 19.95], [28.51, 22.2], [30.7, 20.55]],
];
const SUN = { cx: 31, cy: 11, r: 8.5 };
/** Drawn like a hand closes a circle: it starts top-left and overshoots a little. */
const SUN_LINE = arc(SUN.cx, SUN.cy, SUN.r, -2.4, -2.4 + Math.PI * 2.08);
const SUN_DISC = arc(SUN.cx, SUN.cy, SUN.r, 0, Math.PI * 2);
const RAYS: Pt[][] = Array.from({ length: 9 }, (_, i) => {
  const a = -Math.PI / 2 + ((i - 4) / 9) * Math.PI * 2;
  return [[SUN.cx + (SUN.r + 2) * Math.cos(a), SUN.cy + (SUN.r + 2) * Math.sin(a)], [SUN.cx + (SUN.r + 4.6) * Math.cos(a), SUN.cy + (SUN.r + 4.6) * Math.sin(a)]];
});
/** Crescent opening to the right: outer arc, then the inner arc back. */
const MOON: Pt[] = [...arc(31, 11, 7.5, 1.05, 5.25, 20), ...arc(34.4, 9.2, 6.2, 4.95, 1.35, 18)];
const STARS: Pt[] = [[4, 6], [10, 1], [19, 3], [44, 2], [45, 14], [8, 14], [41, 21]];
const star = ([x, y]: Pt, s = 0.9): Pt[][] => [[[x - s, y], [x + s, y]], [[x, y - s], [x, y + s]]];

/**
 * Ridge first, then the snow lines, then the sky. Colours are tokens only: the site's night
 * theme flips ink, paper and accents, so the drawing follows the page without a palette of its own.
 * At night the ridge is a silhouette (the page's own paper, darker than the card) — not ice.
 */
function elements(mode: Mode): El[] {
  const night = mode === "night";
  const ridge = {
    fill: { kind: "fill", pts: RIDGE, closed: true, solid: true, color: night ? "var(--paper)" : "var(--paper-card)", at: 1.1, dur: 0.5, seed: 1 },
    line: { kind: "line", pts: RIDGE, closed: true, color: "var(--ridge)", w: 2.4, at: 0, dur: 1.5, seed: 1 },
  } as const;
  const liserets: El[] = LISERETS.map((pts, i) => ({
    kind: "line", pts, color: "var(--snow)",
    w: 1.6, square: true, at: 1.55 + i * 0.35, dur: 0.35, seed: 10 + i,
  }));

  const sky: El[] = night
    ? [
        { kind: "fill", pts: MOON, closed: true, color: "color-mix(in srgb, var(--ink) 75%, var(--highlight-punch))", at: 3.0, dur: 0.5, seed: 20 },
        { kind: "line", pts: MOON, closed: true, color: "color-mix(in srgb, var(--ink) 45%, var(--highlight-punch))", w: 1.2, at: 2.3, dur: 0.9, seed: 21 },
        ...STARS.flatMap((p) => star(p)).map((pts, i): El => ({
          kind: "line", pts, color: "var(--ink)", w: 0.45, at: 3.3 + Math.floor(i / 2) * 0.12, dur: 0.14, seed: 30 + i,
        })),
      ]
    : [
        { kind: "fill", pts: SUN_DISC, closed: true, color: "var(--accent-strong)", at: 3.0, dur: 0.5, seed: 20 },
        { kind: "line", pts: SUN_LINE, color: "var(--accent-strong)", w: 1.3, at: 2.3, dur: 0.9, seed: 21 },
        ...RAYS.map((pts, i): El => ({ kind: "line", pts, color: "var(--accent-strong)", w: 1.3, at: 3.3 + i * 0.08, dur: 0.18, seed: 30 + i })),
      ];

  // Paint order: the sky behind, the ridge hides its lower half, the snow lines on top.
  return [...sky, ridge.fill, ridge.line, ...liserets];
}

/* ── Hand wobble ───────────────────────────────────────────────────────── */

const noise = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Subdivide every segment, then nudge each point. amp 0 = the plain line of the logo. */
function wobble(points: Pt[], amp: number, seed: number, closed = false, step = 4): string {
  const pts = closed ? [...points, points[0]] : points;
  const out: Pt[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const n = amp ? Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / step)) : 1;
    for (let k = 1; k <= n; k++) out.push([ax + ((bx - ax) * k) / n, ay + ((by - ay) * k) / n]);
  }
  const d = out
    .map(([x, y], i) => {
      const dx = (noise(seed * 97 + i * 7.1) - 0.5) * 2 * amp;
      const dy = (noise(seed * 53 + i * 3.7) - 0.5) * 2 * amp;
      return `${i ? "L" : "M"}${(x + dx).toFixed(2)} ${(y + dy).toFixed(2)}`;
    })
    .join("");
  return closed ? `${d}Z` : d;
}

/* ── Art directions ────────────────────────────────────────────────────── */

type Da = { opacity: number; pencil: boolean; ghost: boolean; fills: "plain" | "offset" | "wash" };
const DAS: Record<string, Da> = {
  liner: { opacity: 1, pencil: false, ghost: false, fills: "plain" },
  pencil: { opacity: 0.85, pencil: true, ghost: true, fills: "plain" },
  crayon: { opacity: 1, pencil: false, ghost: false, fills: "offset" },
  ink: { opacity: 1, pencil: false, ghost: false, fills: "wash" },
};

/* ── The drawing ───────────────────────────────────────────────────────── */

function Drawing({ mode, da, trace, width }: { mode: Mode; da: Da; trace: string; width: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [frame, setFrame] = useState(0);
  const draws = trace !== "boil";
  const boils = trace !== "draw";
  const els = elements(mode);
  const amp = boils ? 0.22 : 0;
  const seedOf = (e: El) => e.seed + (boils ? frame * 131 : 0);

  // Boil: redraw every line with a new wobble, 8 times a second.
  useEffect(() => {
    if (!boils || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % 3), 125);
    return () => clearInterval(id);
  }, [boils]);

  // One pen: each line traces itself at its own pace, each fill settles after its outline.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!draws) return;
        const tl = gsap.timeline();
        els.forEach((e, i) => {
          if (e.kind === "line") {
            // Tween the SVG attribute: the CSS property doesn't interpolate here and jumps 1 → 0 at mid-tween.
            tl.fromTo(
              `[data-i="${i}"]`,
              { attr: { "stroke-dashoffset": 1 } },
              { attr: { "stroke-dashoffset": 0 }, duration: e.dur, ease: "sine.inOut" },
              e.at,
            );
          } else {
            tl.fromTo(`[data-i="${i}"]`, { opacity: 0 }, { opacity: 1, duration: e.dur, ease: "power1.out" }, e.at);
          }
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [mode, trace, da], revertOnUpdate: true },
  );

  return (
    <svg ref={ref} viewBox={VB} width={width} role="img" aria-label={mode === "night" ? "The ridge at night, under a moon" : "The ridge and the sun"} style={{ maxWidth: "100%" }}>
      <defs>
        <filter id="hs-pencil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="5" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="0.35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="hs-wash" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="0.18" />
        </filter>
      </defs>

      {els.map((e, i) => {
        if (e.kind === "fill") {
          const shifted = !e.solid && da.fills === "offset";
          const washed = !e.solid && da.fills === "wash";
          return (
            <path
              key={i}
              data-i={i}
              d={wobble(e.pts, amp, seedOf(e), e.closed)}
              fill={e.color}
              opacity={shifted ? 0.85 : washed ? 0.7 : 1}
              transform={shifted ? "translate(0.8 0.6)" : undefined}
              filter={washed ? "url(#hs-wash)" : undefined}
            />
          );
        }
        const line = {
          stroke: e.color,
          fill: "none",
          strokeLinecap: e.square ? ("square" as const) : ("round" as const),
          strokeLinejoin: "round" as const,
          pathLength: 1,
          strokeDasharray: 1,
        };
        return (
          <g key={i} opacity={da.opacity} filter={da.pencil ? "url(#hs-pencil)" : undefined}>
            <path data-i={i} d={wobble(e.pts, amp, seedOf(e), e.closed)} strokeWidth={e.w} {...line} />
            {da.ghost && (
              <path data-i={i} d={wobble(e.pts, amp + 0.18, seedOf(e) + 500, e.closed)} strokeWidth={(e.w ?? 1) * 0.5} strokeOpacity={0.4} {...line} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Stage ─────────────────────────────────────────────────────────────── */

/** The logo, drawn by hand in the margin. Its switch is the site's night mode — flip it and the ridge redraws. */
export default function HeroSketch() {
  const da = DAS[useAxis("da")] ?? DAS.liner;
  const trace = useAxis("trace");
  const hero = useAxis("size") === "hero";
  const mode: Mode = useTheme() === "dark" ? "night" : "day";

  const card = (
    <div
      className={`border-rule bg-card relative flex items-center justify-center border-[length:var(--border)] ${hero ? "py-10" : "h-[210px]"}`}
      style={{ backgroundImage: "var(--paper-grid-fine)" }}
    >
      <Drawing mode={mode} da={da} trace={trace} width={hero ? 380 : 170} />
      <span className="absolute top-2 right-2">
        <ThemeToggle />
      </span>
    </div>
  );

  if (hero) {
    return <main className="mx-auto flex max-w-[var(--artboard-max)] flex-col gap-6 px-6 py-16">{card}</main>;
  }

  return (
    <main className="mx-auto grid max-w-[var(--artboard-max)] gap-14 px-6 py-16 lg:grid-cols-[1fr_var(--aside-width)]">
      <div className="flex flex-col gap-4">
        <h1 className="text-lede">{profile.name}</h1>
        {profile.bio.slice(1).map((p) => (
          <p key={p} className="max-w-[var(--measure)]">{p}</p>
        ))}
      </div>
      <aside className="flex flex-col gap-6 pt-2">
        {card}
        <a href={profile.links.linkedin} rel="noreferrer" target="_blank" className="flex items-center gap-2 self-start no-underline">
          <Mark name="arrow" />
          <Sticker>have a look around or say hi on linkedin</Sticker>
        </a>
      </aside>
    </main>
  );
}
