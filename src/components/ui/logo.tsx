/**
 * The brand mark, from the "Logo — variations" board. Two drawings, three
 * motions, CSS keyframes only (see the logo block in globals.css):
 *
 * - "static"  L1 open ridge — the header default.
 * - "draw"    M1: draws itself on load, replays on hover, two ski traces.
 * - "sunset"  M2 on L3: the disc sets behind the paper-filled silhouette,
 *             ochre to rose, 7s loop. Ambient — margin card, never a header.
 * - "snow"    M3: five flakes drifting. Only reads at 150px.
 */
type LogoProps = {
  size?: number;
  variant?: "static" | "draw" | "sunset" | "snow";
  className?: string;
};

const frame = (size: number, className?: string, motion?: string) => ({
  width: size,
  height: (size * 34) / 46,
  viewBox: "0 0 46 34",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  className: [motion, className].filter(Boolean).join(" ") || undefined,
});

export function Logo({ size = 46, variant = "static", className }: LogoProps) {
  if (variant === "sunset") {
    return (
      <svg {...frame(size, className, "logo-sunset")}>
        <circle data-sun="1" cx="30" cy="13" r="6.4" fill="#e8a97f" stroke="none" />
        <path d="M3 30L16 9l7 11 5-6 12 16z" fill="var(--paper-card)" />
        <path d="M2 30h42" strokeWidth={0.9} strokeOpacity={0.4} />
      </svg>
    );
  }

  if (variant === "snow") {
    return (
      <svg {...frame(size, className, "logo-snow")}>
        <circle cx="35.5" cy="6" r="2.6" fill="var(--accent-strong)" stroke="none" />
        <g opacity={0.5} fill="currentColor" stroke="none">
          <circle className="flake" cx="9" cy="8" r="0.9" />
          <circle className="flake" cx="16" cy="5" r="0.7" />
          <circle className="flake" cx="24" cy="7" r="0.9" />
          <circle className="flake" cx="30" cy="4" r="0.7" />
          <circle className="flake" cx="41" cy="9" r="0.8" />
        </g>
        <path d="M2 30h42" strokeWidth={0.9} strokeOpacity={0.4} />
        <path d="M6 30l11-19 7 11 5-6 9 14" />
        <path d="M14.5 14.2l2.2 1.4 2-1.6" strokeWidth={1.6} strokeOpacity={0.6} />
      </svg>
    );
  }

  const draw = variant === "draw";
  const drawn = (order: string) => (draw ? { "data-draw": order, pathLength: 1 } : {});
  return (
    <svg {...frame(size, className, draw ? "logo-draw" : undefined)}>
      <circle {...(draw ? { "data-pop": "1" } : {})} cx="35.5" cy="8" r="3.2" fill="var(--accent-strong)" stroke="none" />
      <path d="M2 30h42" strokeWidth={0.9} strokeOpacity={0.4} />
      <path {...drawn("1")} d="M6 30l11-19 7 11 5-6 9 14" />
      <path {...drawn("2")} d="M14.5 14.2l2.2 1.4 2-1.6" strokeWidth={1.6} strokeOpacity={0.6} />
      {draw && (
        <>
          <path data-draw="3" pathLength={1} d="M18.2 13.2c1.4 3.2 2.9 5.6 5.2 8.2" strokeWidth={1.1} strokeOpacity={0.5} />
          <path data-draw="4" pathLength={1} d="M19.4 15c1.2 2.6 2.5 4.5 4.3 6.6" strokeWidth={1.1} strokeOpacity={0.5} />
        </>
      )}
    </svg>
  );
}
