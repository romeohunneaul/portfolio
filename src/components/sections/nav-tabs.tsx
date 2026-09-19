"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawnMark } from "@/components/ui/drawn-mark";

export const tabs = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/outdoor", label: "Outdoor" },
  { href: "/reading", label: "Reading" },
  { href: "/mcp", label: "MCP" },
] as const;

/** Client only for the active state; the links work without JS. */
export function NavTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Sections" className="-mx-2.5 flex flex-wrap gap-x-1 gap-y-1">
      {tabs.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            data-current={active || undefined}
            className={`draws text-row px-2.5 py-1.5 no-underline ${active ? "font-medium" : ""}`}
          >
            <span className="hd">
              <span>{label}</span>
              <DrawnMark />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
