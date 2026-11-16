import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** The current page: a 2px underline and semibold (nav current page, active filter). */
  current?: boolean;
  className?: string;
};

/**
 * The one text-link treatment: nothing at rest, a plain underline on hover and focus; `current`
 * keeps a 2px one. Chrome links only — prose keeps its own underline. See .hd/.draws in globals.css.
 */
export function TextLink({ href, children, current, className = "" }: TextLinkProps) {
  const external = href.startsWith("http");
  // .draws triggers the underline; data-current holds it. Both live on the anchor.
  const cls = `draws no-underline ${className}`;
  const body = (
<span className="hd">{children}</span>
  );
  return external ? (
    <a href={href} rel="noreferrer" className={cls} data-current={current || undefined}>
      {body}
    </a>
  ) : (
    <Link href={href} aria-current={current ? "page" : undefined} className={cls} data-current={current || undefined}>
      {body}
    </Link>
  );
}
