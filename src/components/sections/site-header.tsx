import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { NavTabs } from "./nav-tabs";

/** Wordmark left, five tabs right, one hairline under both. */
export function SiteHeader() {
  return (
    <header className="border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b-[length:var(--border)] pb-3">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <Logo size={40} animate className="translate-y-[3px]" />
        <span className="font-mono text-[length:var(--size-caption)] tracking-[var(--track-name)] uppercase">
          François Massanes
        </span>
      </Link>
      <NavTabs />
    </header>
  );
}
