"use client";

import { usePathname } from "next/navigation";
import { TextLink } from "@/components/ui/text-link";

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
    <nav aria-label="Sections" className="flex flex-wrap gap-x-5 gap-y-1">
      {tabs.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <TextLink key={href} href={href} current={active} className={`text-row py-1 ${active ? "font-medium" : ""}`}>
            {label}
          </TextLink>
        );
      })}
    </nav>
  );
}
