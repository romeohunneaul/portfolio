const PATHS = {
  arrow: { w: 44, h: 24, d: ["M2 3c9 12 21 16 38 16", "M32 15l8 4-9 3"] },
  elevation: { w: 92, h: 15, d: ["M1 13l15-8 9 5 13-10 13 8 11-5 13 7 15-6"] },
  mountain: { w: 46, h: 34, d: ["M3 29L16 7l9 13 4-5 11 14z"] },
  check: { w: 34, h: 34, d: ["M4 20l8 9L30 6"] },
  squiggle: { w: 60, h: 26, d: ["M2 20c8-6 12 6 20 0s12 6 20 0 12 4 16 2"] },
  book: { w: 42, h: 34, d: ["M6 5h13c2 0 3 1 3 3v22c0-2-1-3-3-3H6z", "M36 5H23c-2 0-3 1-3 3v22c0-2 1-3 3-3h13z"] },
  bubble: { w: 42, h: 34, d: ["M4 5h34v20H22l-7 6v-6H4z"] },
  pencil: { w: 38, h: 34, d: ["M6 26l20-20 6 6-20 20-8 2z", "M22 10l6 6"] },
  spark: { w: 34, h: 34, d: ["M17 4v6", "M17 30v-6", "M4 17h6", "M30 17h-6", "M8 8l4 4", "M26 26l-4-4", "M26 8l-4 4", "M8 26l4-4"] },
} as const;

export type MarkName = keyof typeof PATHS;

type MarkProps = {
  name: MarkName;
  scale?: number;
  className?: string;
};

/** Hand-drawn marks: stroke only, currentColor, one pen family (fine liner). */
export function Mark({ name, scale = 1, className }: MarkProps) {
  const p = PATHS[name];
  return (
    <svg
      width={p.w * scale}
      height={p.h * scale}
      viewBox={`0 0 ${p.w} ${p.h}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {p.d.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
