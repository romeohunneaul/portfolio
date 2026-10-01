"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { RidgeSketch } from "@/components/ui/ridge-sketch";
import { AskShortcut } from "@/components/ask/ask-button";
import { NavTabs, tabs } from "./nav-tabs";
import { TextLink } from "@/components/ui/text-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * Wordmark left, five tabs right, one hairline under both.
 * On phones: one sticky line (logo, night switch, Menu) that slides away on scroll down and
 * returns on scroll up. See .site-header in globals.css. The Menu is a native <details>,
 * so it opens without JS; keyed by path, it closes itself on navigation.
 */
export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  // The home's hero is the ask box; a second Ask in the header would compete with it.
  const pathname = usePathname();
  const home = pathname === "/";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Ignore jitter; never hide near the top.
      if (Math.abs(y - last) < 8) return;
      ref.current?.toggleAttribute("data-hidden", y > last && y > 80);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={ref}
      className="site-header border-rule flex items-center justify-between gap-x-4 border-b-[length:var(--border)] pb-4 sm:flex-wrap sm:gap-x-8 sm:gap-y-3"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-[var(--highlight)] focus:px-3 focus:py-2">
        Skip to content
      </a>
      <span className="flex shrink-0 items-center gap-3">
        {/* Same hand-drawn mark as the home's way down: traces itself on load, sun by day, moon by night. */}
        <Link href="/" aria-label="Home" className="no-underline [--sketch-fill:var(--paper)]">
          <RidgeSketch width={44} />
        </Link>
        <TextLink href="/" className="text-meta font-mono tracking-[var(--track-name)] uppercase max-sm:hidden">
          François Massanes
        </TextLink>
      </span>
      <div className="flex min-w-0 items-center gap-x-4 gap-y-2 sm:flex-wrap">
        <span className="max-sm:hidden">
          <NavTabs />
        </span>
        {/* Header shortcut is desktop only; the FAB carries Ask on phones. */}
        {!home && (
          <span className="max-sm:hidden">
            <AskShortcut />
          </span>
        )}
        <ThemeToggle />
        <details key={pathname} className="group sm:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center pl-2 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav aria-label="Sections" className="bg-paper border-rule absolute inset-x-0 top-full flex flex-col border-b-[length:var(--border)] px-6 py-2">
            {tabs.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`text-title py-3 no-underline ${active ? "font-semibold" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </details>
      </div>
    </header>
  );
}
