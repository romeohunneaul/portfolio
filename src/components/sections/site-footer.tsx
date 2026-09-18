import { profile } from "@/data/profile";

/** "Trouver François" — one line, not a banner. */
export function SiteFooter() {
  const links = [
    ["Mail", `mailto:${profile.email}`],
    ["GitHub", profile.links.github],
    ["LinkedIn", profile.links.linkedin],
    ["Strava", profile.links.strava],
    ["MCP", "/mcp"],
  ] as const;
  return (
    <footer id="hello" className="border-rule mt-16 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t-[length:var(--border)] pt-6">
      <span className="text-soft">Say hello</span>
      {links.map(([label, href]) => (
        <a key={label} href={href} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          {label}
        </a>
      ))}
    </footer>
  );
}
