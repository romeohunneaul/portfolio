"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/logo";
import { AskShortcut } from "@/components/ask/ask-button";
import { NavTabs } from "./nav-tabs";
import { TextLink } from "@/components/ui/text-link";

/**
 * Wordmark left, five tabs right, one hairline under both.
 * On phones: one sticky line (logo, scrollable tabs, Ask) that slides away on
 * scroll down and returns on scroll up. See .site-header in globals.css.
 */
export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);

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
        <Link href="/" aria-label="Home" className="no-underline">
          <Logo size={40} />
        </Link>
        <TextLink href="/" className="text-meta font-mono tracking-[var(--track-name)] uppercase max-sm:hidden">
          François Massanes
        </TextLink>
      </span>
      <div className="flex min-w-0 items-center gap-x-4 gap-y-2 sm:flex-wrap">
        <NavTabs />
        {/* Header shortcut is desktop only; the FAB carries Ask on phones. */}
        <span className="max-sm:hidden">
          <AskShortcut />
        </span>
      </div>
    </header>
  );
}
