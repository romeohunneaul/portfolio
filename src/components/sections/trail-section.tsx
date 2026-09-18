import { EntryRow } from "@/components/ui/entry-row";
import { Mark } from "@/components/ui/mark";
import { Trace } from "@/components/ui/trace";
import { profile } from "@/data/profile";
import { races, utmb } from "@/data/trail";
import type { LoadedRoute } from "@/lib/routes";

const fmt = new Intl.NumberFormat("en-GB");

export function UtmbLine() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-title m-0 flex flex-wrap items-center gap-x-4">
        <span>UTMB index {utmb.index}</span>
        <Mark name="elevation" className="text-accent-strong" />
      </p>
      <p className="m-0 flex flex-wrap gap-x-4">
        <span>
          {utmb.races} races, {utmb.top10} top-10 finishes
        </span>
        <a href={profile.links.utmb} rel="noreferrer">
          UTMB profile
        </a>
        <a href={profile.links.strava} rel="noreferrer">
          Strava
        </a>
      </p>
    </div>
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
            <span className="text-soft text-meta font-mono tabular-nums">
              {r.km} km, {fmt.format(r.gain)} m+
            </span>
          }
          meta={
            <>
              <span>{r.time}</span>
              <span>{r.rank}</span>
              <span>{r.date.slice(0, 4)}</span>
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
    <ul className="m-0 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {routes.map((r) => (
        <li key={r.slug} className="flex flex-col gap-3">
          <Trace trace={r.trace} label={r.name} />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{r.name}</span>
            <span className="text-soft text-meta font-mono tabular-nums">
              {r.track.distanceKm} km, {fmt.format(r.track.gainM)} m+
            </span>
          </div>
          <p className="m-0">
            {r.where}. {r.note}
          </p>
          <a href={r.file} download className="text-meta self-start">
            Download GPX
          </a>
        </li>
      ))}
    </ul>
  );
}
