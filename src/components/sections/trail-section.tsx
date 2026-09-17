import { EntryRow } from "@/components/ui/entry-row";
import { Mark } from "@/components/ui/mark";
import { Trace } from "@/components/ui/trace";
import { profile } from "@/data/profile";
import { races, utmb } from "@/data/trail";
import type { LoadedRoute } from "@/lib/routes";

const fmt = new Intl.NumberFormat("en-GB");

export function UtmbLine() {
  return (
    <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[length:var(--size-row)]">
      <span>UTMB index {utmb.index}</span>
      <Mark name="elevation" className="text-accent-strong" />
      <span className="text-soft text-[length:var(--size-body)]">
        {utmb.races} races, {utmb.top10} top-10 ·{" "}
        <a href={profile.links.utmb} rel="noreferrer">
          utmb
        </a>{" "}
        ·{" "}
        <a href={profile.links.strava} rel="noreferrer">
          strava
        </a>
      </span>
    </p>
  );
}

export function RaceList({ limit }: { limit?: number }) {
  const list = limit ? races.slice(0, limit) : races;
  return (
    <div>
      {list.map((r) => (
        <EntryRow
          key={r.date + r.name}
          title={r.name}
          mark={
            <span className="text-soft font-mono text-[length:var(--size-caption)]">
              {r.km} km · {fmt.format(r.gain)} m+
            </span>
          }
          meta={
            <>
              {r.time} · {r.rank} · {r.date.slice(0, 4)}
            </>
          }
        />
      ))}
    </div>
  );
}

/** Traces drawn from the GPX files. Each card links to the file itself. */
export function RouteGrid({ routes }: { routes: LoadedRoute[] }) {
  return (
    <ul className="m-0 grid list-none gap-x-6 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {routes.map((r) => (
        <li key={r.slug} className="flex flex-col gap-2">
          <Trace trace={r.trace} label={r.name} />
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[length:var(--size-row)] font-medium">{r.name}</span>
            <span className="text-soft font-mono text-[length:var(--size-caption)] whitespace-nowrap">
              {r.track.distanceKm} km · {fmt.format(r.track.gainM)} m+
            </span>
          </div>
          <p className="text-soft m-0 text-[length:var(--size-body)]">
            {r.where}. {r.note}
          </p>
          <a href={r.file} download className="text-soft font-mono text-[length:var(--size-caption)]">
            download gpx ↓
          </a>
        </li>
      ))}
    </ul>
  );
}
