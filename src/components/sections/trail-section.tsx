import { DrawnMark } from "@/components/ui/drawn-mark";
import { TextLink } from "@/components/ui/text-link";
import Image from "next/image";
import { Trace } from "@/components/ui/trace";
import { profile } from "@/data/profile";
import { utmb } from "@/data/trail";
import type { LoadedRoute } from "@/lib/routes";

const fmt = new Intl.NumberFormat("en-GB");

/** Traces drawn from the GPX files, a photo slot, and the file to download. */
export function RouteGrid({ routes }: { routes: LoadedRoute[] }) {
  return (
    <ul className="m-0 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {routes.map((r) => (
        <li key={r.slug} className="flex flex-col gap-3">
          <Trace trace={r.trace} label={r.name} />
          <RoutePhotos route={r} />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{r.name}</span>
            <span className="text-soft text-meta font-mono tabular-nums">
              {r.track.distanceKm} km, {fmt.format(r.track.gainM)} m+
            </span>
          </div>
          <p className="m-0">
            {r.where}. {r.note}
          </p>
          <a href={r.file} download className="draws hd hd-rest text-meta no-underline self-start">
            <span>Download GPX</span>
            <DrawnMark ghost />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Up to three photos from public/photos/<slug>/; a quiet placeholder until they exist. */
function RoutePhotos({ route }: { route: LoadedRoute }) {
  if (route.photos.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="border-rule text-soft text-meta flex h-16 items-center justify-center border border-dashed font-mono"
      >
        photos to come
      </div>
    );
  }
  return (
    <ul className="m-0 grid list-none grid-cols-3 gap-2 p-0">
      {route.photos.slice(0, 3).map((file) => (
        <li key={file} className="relative aspect-square overflow-hidden">
          <Image src={`/photos/${route.slug}/${file}`} alt={`${route.name}, on the trail`} fill sizes="120px" className="object-cover" />
        </li>
      ))}
    </ul>
  );
}

/** One quiet line. The links exist; they are not the point. */
export function ElsewhereLine() {
  return (
    <p className="text-soft text-meta m-0">
      {utmb.races} races so far. Also on <TextLink href={profile.links.strava}>Strava</TextLink> and{" "}
      <TextLink href={profile.links.utmb}>UTMB</TextLink>.
    </p>
  );
}
