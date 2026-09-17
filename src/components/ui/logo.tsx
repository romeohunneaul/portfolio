type LogoProps = {
  size?: number;
  /** Draw the mark in once on mount (ridge, snow line, sun). */
  animate?: boolean;
  className?: string;
};

/** The only brand mark: a marker-weight mountain, a snow line, a small sun. */
export function Logo({ size = 46, animate = false, className }: LogoProps) {
  const draw = (duration: string, delay = "0s") =>
    animate ? { strokeDasharray: 1, animation: `logo-draw ${duration} ease-out ${delay} forwards` } : undefined;

  return (
    <svg
      width={size}
      height={(size * 34) / 46}
      viewBox="0 0 46 34"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
      aria-hidden="true"
      className={className}
    >
      <path d="M3 29L16 7l9 13 4-5 11 14z" pathLength={1} style={draw("1.1s")} />
      <path d="M11.5 18.5c3-2 5 1 8-1" pathLength={1} strokeOpacity={0.7} style={draw("0.5s", "0.9s")} />
      <path d="M35 6.5a3.4 3.4 0 1 0 0.1 0" pathLength={1} className="text-accent-strong" style={draw("0.6s", "1.3s")} />
    </svg>
  );
}
