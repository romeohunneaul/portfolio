/**
 * A hand-drawn box around a region, in the loud colour: four strokes that overshoot at the corners,
 * drawn one after the other when `on`, the way DrawnMark draws under a link. Lines in percentages
 * keep the pen width whatever the region's size. The parent must be `relative`.
 */
const STROKES = [
  { x1: "-1%", y1: "4%", x2: "101%", y2: "1%" },
  { x1: "99.5%", y1: "-6%", x2: "100.5%", y2: "104%" },
  { x1: "101%", y1: "97%", x2: "-1.5%", y2: "99%" },
  { x1: "0.5%", y1: "106%", x2: "-0.5%", y2: "-4%" },
];
const DELAYS = ["delay-0", "delay-150", "delay-300", "delay-450"];

export function DrawnBox({ on }: { on: boolean }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      className="stroke-accent-strong pointer-events-none absolute -top-2 -left-2 z-20 h-[calc(100%+1rem)] w-[calc(100%+1rem)] overflow-visible"
    >
      {STROKES.map((l, i) => (
        <line
          key={i}
          {...l}
          pathLength={1}
          strokeLinecap="round"
          // 1 3 + 1.02, as in DrawnMark: at rest the dash sits fully outside the line.
          className={`[stroke-dasharray:1_3] [stroke-width:var(--stroke-fine)] transition-[stroke-dashoffset] duration-[var(--draw-duration)] ease-[var(--draw-ease)] motion-reduce:transition-none ${
            on ? `[stroke-dashoffset:0] ${DELAYS[i]}` : "[stroke-dashoffset:1.02]"
          }`}
        />
      ))}
    </svg>
  );
}
