/**
 * Minimal GPX reader. Enough for a trail trace: track points, distance,
 * climb, and SVG paths for the map outline and the elevation profile.
 * No XML dependency — GPX from Strava/Garmin/TraceDeTrail is regular enough.
 */

export type TrackPoint = { lat: number; lon: number; ele: number };

export type Track = {
  name: string | null;
  points: TrackPoint[];
  distanceKm: number;
  gainM: number;
  maxEleM: number;
  minEleM: number;
};

const EARTH_RADIUS_M = 6_371_000;

export function parseGpx(xml: string): Track {
  const name = xml.match(/<name>([^<]*)<\/name>/)?.[1]?.trim() ?? null;
  const points: TrackPoint[] = [];
  const re =
    /<trkpt\s+(?:lat="([-\d.]+)"\s+lon="([-\d.]+)"|lon="([-\d.]+)"\s+lat="([-\d.]+)")[^>]*>([\s\S]*?)<\/trkpt>/g;
  for (const m of xml.matchAll(re)) {
    const lat = Number(m[1] ?? m[4]);
    const lon = Number(m[2] ?? m[3]);
    const ele = Number(m[5].match(/<ele>([-\d.]+)<\/ele>/)?.[1] ?? NaN);
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      points.push({ lat, lon, ele: Number.isFinite(ele) ? ele : 0 });
    }
  }
  return { name, points, ...measure(points) };
}

function haversine(a: TrackPoint, b: TrackPoint): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/** Climb is summed only once elevation has moved by `threshold` metres — GPS noise otherwise inflates it. */
function measure(points: TrackPoint[], threshold = 8) {
  let distanceKm = 0;
  let gainM = 0;
  let maxEleM = -Infinity;
  let minEleM = Infinity;
  let anchor = points[0]?.ele ?? 0;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    if (i > 0) distanceKm += haversine(points[i - 1], p) / 1000;
    maxEleM = Math.max(maxEleM, p.ele);
    minEleM = Math.min(minEleM, p.ele);
    const delta = p.ele - anchor;
    if (Math.abs(delta) >= threshold) {
      if (delta > 0) gainM += delta;
      anchor = p.ele;
    }
  }

  if (!points.length) {
    maxEleM = 0;
    minEleM = 0;
  }
  return {
    distanceKm: round(distanceKm, 1),
    gainM: Math.round(gainM),
    maxEleM: Math.round(maxEleM),
    minEleM: Math.round(minEleM),
  };
}

function round(n: number, decimals: number) {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

/** Keep at most `max` points, evenly spaced. Endpoints are always kept. */
export function decimate<T>(points: T[], max: number): T[] {
  if (points.length <= max) return points;
  const step = (points.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => points[Math.round(i * step)]);
}

export type SvgTrace = {
  width: number;
  height: number;
  outline: string; // "M x y L x y …" — the route seen from above
  profile: string; // elevation, left to right, same width
  profileArea: string; // profile closed on the baseline, for a wash
};

/**
 * Equirectangular projection scaled by cos(lat), so a loop keeps its shape.
 * The outline fits in a `size` box; the profile is `size × profileHeight`.
 */
export function toSvg(track: Track, size = 200, profileHeight = 56, maxPoints = 400): SvgTrace {
  const pts = decimate(track.points, maxPoints);
  if (pts.length < 2) {
    return { width: size, height: size, outline: "", profile: "", profileArea: "" };
  }

  const lat0 = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
  const kx = Math.cos((lat0 * Math.PI) / 180);
  const xs = pts.map((p) => p.lon * kx);
  const ys = pts.map((p) => -p.lat);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY) || 1;
  const pad = 6;
  const scale = (size - pad * 2) / span;
  const offX = (size - (maxX - minX) * scale) / 2;
  const offY = (size - (maxY - minY) * scale) / 2;

  const outline = pts
    .map((_, i) => {
      const x = offX + (xs[i] - minX) * scale;
      const y = offY + (ys[i] - minY) * scale;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const eles = pts.map((p) => p.ele);
  const minE = Math.min(...eles);
  const spanE = Math.max(...eles) - minE || 1;
  const profilePts = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * size;
    const y = profileHeight - 2 - ((p.ele - minE) / spanE) * (profileHeight - 4);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  const profile = profilePts.map((p, i) => `${i === 0 ? "M" : "L"}${p}`).join(" ");
  const profileArea = `${profile} L${size} ${profileHeight} L0 ${profileHeight} Z`;

  return { width: size, height: size, outline, profile, profileArea };
}
