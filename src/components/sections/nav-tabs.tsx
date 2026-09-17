"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const tabs = [
  { href: "/", label: "home" },
  { href: "/work", label: "work" },
  { href: "/trail", label: "trail" },
  { href: "/reading", label: "reading" },
  { href: "/mcp", label: "mcp" },
] as const;

/** Client only for the active state; the links work without JS. */
export function NavTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Sections" className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[length:var(--size-label)]">
      {tabs.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`px-2 py-px no-underline hover:bg-[var(--accent-tint)] ${active ? "bg-[var(--accent-tint)]" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
