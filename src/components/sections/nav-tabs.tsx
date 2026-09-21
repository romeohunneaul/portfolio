"use client";

import { useEffect, useRef } from "react";
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
  const ref = useRef<HTMLElement>(null);

  // Phones scroll the strip sideways: keep the current tab in view.
  useEffect(() => {
    const nav = ref.current;
    const current = nav?.querySelector<HTMLElement>("[aria-current]");
    if (nav && current) nav.scrollLeft = current.offsetLeft - nav.offsetLeft - 24;
  }, [pathname]);

  return (
    <nav ref={ref} aria-label="Sections" className="nav-tabs flex gap-x-5 gap-y-1 sm:flex-wrap">
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
