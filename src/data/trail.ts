/**
 * Outdoor. Routes are GPX files dropped in `public/gpx/` — one line here per
 * file; photos go in `public/photos/<slug>/` and are listed in `photos`.
 * Races and the UTMB index stay here for the MCP server; the site keeps them quiet.
 */

export type Route = {
  slug: string; // = public/gpx/<slug>.gpx
  name: string;
  where: string;
  note: string;
  sport: "trail" | "ski";
  kind: "loop" | "race" | "stage" | "vertical" | "tour";
  /** File names under public/photos/<slug>/ — empty shows a placeholder. */
  photos: string[];
};

// `note` is one sentence, first person — placeholders below until François rewrites them.
export const routes: Route[] = [
  { slug: "mont-charvin", name: "Mont Charvin loop", where: "Aravis", note: "The one I send people to.", sport: "trail", kind: "loop", photos: [] },
  { slug: "kv-manigod", name: "KV Manigod", where: "Aravis", note: "1,000 m up, no down. Millet Manigod Trail Challenge 2025.", sport: "trail", kind: "vertical", photos: [] },
  { slug: "annecy-30k", name: "Annecy 30K, 1,500 m", where: "Annecy", note: "A long training loop above the lake.", sport: "trail", kind: "loop", photos: [] },
  { slug: "grand-raid-ventoux-50k", name: "Grand Raid Ventoux 50K", where: "Ventoux", note: "Race trace, 2026 edition.", sport: "trail", kind: "race", photos: [] },
  { slug: "pyrenees-etape-1", name: "Pyrénées, stage 1", where: "Pyrénées", note: "First day of a six-stage crossing.", sport: "trail", kind: "stage", photos: [] },
  { slug: "courzieu-yzeron", name: "Courzieu – Yzeron", where: "Monts du Lyonnais", note: "The closest real climb to Lyon.", sport: "trail", kind: "loop", photos: [] },
  // Ski tours: export the GPX from Garmin Connect (activities 22570425277, 21666362418,
  // 22035493763), drop them in public/gpx/, then add a line here with sport: "ski".
];

export const utmb = {
  index: 701,
  races: 32,
  top10: 2,
  updated: "2026-09",
};

export type Race = { date: string; name: string; km: number; gain: number; time: string; rank: string };

export const races: Race[] = [
  { date: "2026-08-30", name: "La Grande Bambée", km: 44, gain: 2700, time: "4:48:51", rank: "4 / 124" },
  { date: "2026-07-05", name: "La Mini'Hard", km: 18, gain: 1270, time: "1:51:19", rank: "1 / 305" },
  { date: "2026-05-15", name: "Volvic Volcanic Experience", km: 86, gain: 2750, time: "8:07:56", rank: "18 / 720" },
  { date: "2026-04-26", name: "Grand Raid Ventoux", km: 51, gain: 2500, time: "5:32:47", rank: "54 / 1322" },
  { date: "2025-09-07", name: "Serre Che Trail", km: 26, gain: 1850, time: "3:08:22", rank: "8 / 430" },
  { date: "2025-07-20", name: "Trail des Gets", km: 21, gain: 1050, time: "2:07:13", rank: "10 / 607" },
  { date: "2025-06-22", name: "Bernex Trail Challenge", km: 21, gain: 1400, time: "2:42:22", rank: "8 / 218" },
  { date: "2025-04-26", name: "Grand Raid Ventoux 50K", km: 49, gain: 2200, time: "4:59:08", rank: "64 / 957" },
  { date: "2024-11-30", name: "SaintéLyon", km: 82, gain: 2273, time: "12:30:05", rank: "3858 / 6252" },
  { date: "2024-07-06", name: "Grand Raid Guillestrois-Queyras", km: 45, gain: 3200, time: "7:32:13", rank: "24 / 246" },
  { date: "2024-06-28", name: "Marathon du Mont-Blanc — KV", km: 3.8, gain: 1000, time: "0:52:00", rank: "70 / 553" },
  { date: "2023-03-18", name: "EcoTrail Paris", km: 18.6, gain: 400, time: "1:50:40", rank: "716 / 2536" },
];
