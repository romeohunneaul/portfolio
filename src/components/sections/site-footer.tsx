import { profile } from "@/data/profile";

/** "Trouver François" — one line, not a banner. */
export function SiteFooter() {
  return (
    <footer id="hello" className="border-rule text-soft mt-[var(--space-11)] border-t-[length:var(--border)] pt-4 text-[length:var(--size-meta)]">
      Say hello:{" "}
      <a href={`mailto:${profile.email}`}>mail</a> · <a href={profile.links.github} rel="noreferrer">github</a> ·{" "}
      <a href={profile.links.linkedin} rel="noreferrer">linkedin</a> ·{" "}
      <a href={profile.links.strava} rel="noreferrer">strava</a> · <a href="/api/mcp">mcp</a>
    </footer>
  );
}
