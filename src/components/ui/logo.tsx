/**
 * The brand mark — François's Figma drawing (UIRA Sunset Logo): the filled
 * ridge, a big sun behind it, and two grey snow liserets on the cols.
 * Motion is CSS only (see the logo block in globals.css):
 *
 * - "static"  the drawing, still — the header default.
 * - "draw"    ridge draws itself, fill settles, liserets, sun pops. Replays on hover.
 * - "sunset"  the disc sets behind the silhouette, ochre to rose, 7s loop.
 *             Ambient — margin card, never a header.
 * - "snow"    five flakes drifting above. Only reads at 150px.
 *
 * The silhouette is filled with the surface colour so the sun passes behind:
 * `--logo-fill` defaults to the page paper; set it to the card colour when the
 * logo sits on a card (the margin does).
 */
type LogoProps = {
  size?: number;
  variant?: "static" | "draw" | "sunset" | "snow";
  className?: string;
};

const RIDGE = "M3 30L16 9l7 11 5-6 12 16z";
/* Snow grey from the Figma file. */
const SNOW = "#d9d9d9";
const LISERET_1 = "M12.9 18l3.15 2.05 3.45-2.25";
const LISERET_2 = "M25.75 19.95l2.76 2.25 2.19-1.65";

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

function Liserets({ draw }: { draw?: boolean }) {
  const attrs = (order: string) => (draw ? { "data-draw": order, pathLength: 1 } : {});
  return (
    <>
      <path {...attrs("2")} d={LISERET_1} stroke={SNOW} strokeWidth={1.6} strokeLinecap="square" />
      <path {...attrs("3")} d={LISERET_2} stroke={SNOW} strokeWidth={1.6} strokeLinecap="square" />
    </>
  );
}

export function Logo({ size = 46, variant = "static", className }: LogoProps) {
  if (variant === "draw") {
    return (
      <svg {...frame(size, className, "logo-draw")}>
        <circle data-pop="1" cx="30" cy="13" r="6.4" fill="#e8a97f" stroke="none" />
        <path data-draw="1" data-fill="1" d={RIDGE} pathLength={1} fill="var(--logo-fill, var(--paper))" />
        <Liserets draw />
      </svg>
    );
  }

  return (
    <svg {...frame(size, className, variant === "sunset" ? "logo-sunset" : variant === "snow" ? "logo-snow" : undefined)}>
      {variant === "snow" && (
        <g opacity={0.5} fill="currentColor" stroke="none">
          <circle className="flake" cx="9" cy="8" r="0.9" />
          <circle className="flake" cx="16" cy="5" r="0.7" />
          <circle className="flake" cx="24" cy="7" r="0.9" />
          <circle className="flake" cx="36" cy="4" r="0.7" />
          <circle className="flake" cx="42" cy="9" r="0.8" />
        </g>
      )}
      <circle data-sun="1" cx="30" cy="13" r="6.4" fill="#e8a97f" stroke="none" />
      <path d={RIDGE} fill="var(--logo-fill, var(--paper))" />
      <Liserets />
    </svg>
  );
}
