"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TextLink } from "@/components/ui/text-link";

/** `hint` is the phone Menu's right-hand annotation for each page. */
export const tabs = [
  { href: "/", label: "Home", hint: "ask, or read" },
  { href: "/work", label: "Work", hint: "career, projects, tools" },
  { href: "/outdoor", label: "Outdoor", hint: "routes, ski included" },
  { href: "/reading", label: "Reading", hint: "books and articles" },
  { href: "/mcp", label: "MCP", hint: "this site, for agents" },
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
