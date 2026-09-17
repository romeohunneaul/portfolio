import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { routes, type Route } from "@/data/trail";
import { parseGpx, toSvg, type SvgTrace, type Track } from "./gpx";

export type LoadedRoute = Route & {
  file: string; // public URL of the GPX
  track: Omit<Track, "points">;
  trace: SvgTrace;
};

/** Reads `public/gpx/<slug>.gpx` at build time. A missing file is a build error on purpose. */
export const loadRoutes = cache(async (): Promise<LoadedRoute[]> => {
  return Promise.all(
    routes.map(async (r) => {
      const xml = await readFile(path.join(process.cwd(), "public", "gpx", `${r.slug}.gpx`), "utf8");
      const { points, ...track } = parseGpx(xml);
      return { ...r, file: `/gpx/${r.slug}.gpx`, track, trace: toSvg({ ...track, points }) };
    }),
  );
});
