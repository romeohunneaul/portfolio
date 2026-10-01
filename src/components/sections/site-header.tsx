"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { RidgeSketch } from "@/components/ui/ridge-sketch";
import { AskShortcut } from "@/components/ask/ask-button";
import { NavTabs, tabs } from "./nav-tabs";
import { TextLink } from "@/components/ui/text-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sticker } from "@/components/ui/sticker";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { profile } from "@/data/profile";

/**
 * Wordmark left, five tabs right, one hairline under both.
 * On phones: one sticky line (logo, night switch, Menu) that slides away on scroll down and
 * returns on scroll up. See .site-header in globals.css. The Menu is a native <details>,
 * so it opens without JS; keyed by path, it closes itself on navigation.
 */
export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
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
        {/* Phones: the name wraps onto two lines (9ch) so logo, name, switch and Menu share one row. */}
        <TextLink href="/" className="text-meta font-mono tracking-[var(--track-name)] uppercase max-sm:max-w-[9ch] max-sm:leading-tight">
          François Massanes
        </TextLink>
        {/* The standing contact target, on every page: one channel, LinkedIn. Phones carry it in the Menu. */}
        <a href={profile.links.linkedin} rel="noreferrer" target="_blank" className="no-underline max-sm:hidden">
          <Sticker>say hi on linkedin</Sticker>
        </a>
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
        {/* Phones: the tabs as a sheet dropping from the header, same grammar as the home's Examples
            sheet (ruled rows, mono hint on the right). Native <details>: opens without JS. */}
        <details key={pathname} ref={menu} className="group sm:hidden">
          <summary className="relative z-20 flex min-h-11 cursor-pointer list-none items-center gap-2 pl-2 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden items-center gap-2 group-open:inline-flex">
              Close
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
                <path d="M2 2l8 8" />
                <path d="M10 2l-8 8" />
              </svg>
            </span>
          </summary>
          {/* Scrim: dims the page; a tap on it closes the menu (with JS; without, the summary does). */}
          <div aria-hidden="true" onClick={() => menu.current?.removeAttribute("open")} className="fixed inset-0 z-10 bg-[var(--scrim)]" />
          <nav
            aria-label="Sections"
            className="menu-sheet bg-card border-ink absolute inset-x-0 top-full z-20 flex flex-col border-b-[length:var(--border)]"
          >
            <ul className="m-0 list-none p-0">
              {tabs.map(({ href, label, hint }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href} className="border-rule border-b">
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      data-current={active || undefined}
                      className="draws flex items-baseline justify-between gap-4 px-6 py-4 no-underline"
                    >
                      <span className={`hd ${active ? "font-semibold" : ""}`}>
                        <span>{label}</span>
                        <DrawnMark />
                      </span>
                      <span className="text-meta text-soft text-right font-mono">{hint}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a href={profile.links.linkedin} rel="noreferrer" target="_blank" className="self-start px-6 py-5 no-underline">
              <Sticker>say hi on linkedin</Sticker>
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
