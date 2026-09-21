/**
 * The drawn mark — the system's only hover treatment. An irregular line that
 * draws itself (stroke-dashoffset) when the closest `.draws` ancestor is
 * hovered or focused, or carries `data-current`. The SVG renders here; the
 * motion lives in globals.css (.hd / .mk / .draws).
 *
 * - "underline": stretches to its host's width (place inside an inline `.hd`).
 * - "loop": a hand loop around an icon-sized control.
 */
const PATHS = {
  underline: { w: 60, h: 8, d: "M2 4.6c8-2 18-2.6 28-1.8 8 .6 17 1.6 28 .6", sw: 1.5 },
  loop: { w: 52, h: 42, d: "M38 9C30 5 14 5.5 9 12c-5 6.5 2 17 15 18 11 1 20-4 20-11 0-5-5-9-12-10.5", sw: 1.4 },
} as const;

type DrawnMarkProps = { shape?: keyof typeof PATHS };

export function DrawnMark({ shape = "underline" }: DrawnMarkProps) {
  const p = PATHS[shape];
  return (
    <svg
      className={`mk ${shape === "loop" ? "around" : "under"}`}
      {...(shape === "loop" ? { width: p.w, height: p.h } : { preserveAspectRatio: "none" })}
      viewBox={`0 0 ${p.w} ${p.h}`}
      fill="none"
      stroke="var(--ink)"
      strokeWidth={p.sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={p.d} pathLength={1} />
    </svg>
  );
}
