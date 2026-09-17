import type { SvgTrace } from "@/lib/gpx";

type TraceProps = {
  trace: SvgTrace;
  /** Accessible name, e.g. the route name. */
  label: string;
  profileHeight?: number;
};

/** A GPX route drawn as a pencil line: the outline from above, the elevation under it. */
export function Trace({ trace, label, profileHeight = 56 }: TraceProps) {
  const { width, height, outline, profile, profileArea } = trace;
  return (
    <figure className="m-0 flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={`${label}, seen from above`}
        className="bg-card border-rule border-[length:var(--border)]"
        style={{ backgroundImage: "var(--paper-grid-fine)" }}
      >
        <path d={outline} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
        <path d={outline} fill="none" stroke="currentColor" strokeWidth={1.6} strokeOpacity={0.35} transform="translate(0.8,1.1)" />
      </svg>
      <svg
        viewBox={`0 0 ${width} ${profileHeight}`}
        width="100%"
        height={profileHeight}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${label}, elevation profile`}
      >
        <path d={profileArea} fill="var(--accent-strong)" fillOpacity={0.18} />
        <path d={profile} fill="none" stroke="var(--accent-strong)" strokeWidth={1.4} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </figure>
  );
}
