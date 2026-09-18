import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { AskShortcut } from "@/components/ask/ask-button";
import { NavTabs } from "./nav-tabs";

/** Wordmark left, five tabs right, one hairline under both. */
export function SiteHeader() {
  return (
    <header className="border-rule flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b-[length:var(--border)] pb-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-[var(--highlight)] focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Link href="/" className="flex items-center gap-3 no-underline">
        <Logo size={40} />
        <span className="text-meta font-mono tracking-[var(--track-name)] uppercase">François Massanes</span>
      </Link>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <NavTabs />
        <AskShortcut />
      </div>
    </header>
  );
}
