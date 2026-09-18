/**
 * What's playing. Paste a Spotify playlist URL (or just its id) in `playlist`
 * and the home page embeds it; `tracks` is the no-JS / no-embed fallback and
 * what the MCP server returns.
 */

export const music = {
  /** e.g. "37i9dQZF1DXcBWIGoYBM5M" or the full open.spotify.com URL */
  playlist: "",
  updated: "2026-09",
  tracks: [] as { title: string; artist: string; url: string }[],
};

export function playlistId(value: string) {
  const m = value.match(/playlist\/([A-Za-z0-9]+)/);
  return m ? m[1] : value.trim();
}
