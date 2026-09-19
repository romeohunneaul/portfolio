import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { AskShortcut } from "@/components/ask/ask-button";
import { NavTabs } from "./nav-tabs";
import { TextLink } from "@/components/ui/text-link";

/** Wordmark left, five tabs right, one hairline under both. */
export function SiteHeader() {
  return (
    <header className="border-rule flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b-[length:var(--border)] pb-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-[var(--highlight)] focus:px-3 focus:py-2">
        Skip to content
      </a>
      <span className="flex items-center gap-3">
        <Link href="/" aria-label="Home" className="no-underline">
          <Logo size={40} />
        </Link>
        <TextLink href="/" className="text-meta font-mono tracking-[var(--track-name)] uppercase">
          François Massanes
        </TextLink>
      </span>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <NavTabs />
        <AskShortcut />
      </div>
    </header>
  );
}
