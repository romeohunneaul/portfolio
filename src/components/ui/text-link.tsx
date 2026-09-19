import Link from "next/link";
import type { ReactNode } from "react";
import { DrawnMark } from "./drawn-mark";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  /** Keep the underline drawn (nav current page, active filter). */
  current?: boolean;
  className?: string;
};

/**
 * The one text-link treatment. A hand-drawn underline sits faint at rest
 * (ghost, 28% ink) so the link reads as clickable, then inks itself in
 * left to right on hover and focus; `current` holds it drawn. Chrome links
 * only — prose keeps the plain CSS underline. See the .hd/.draws block in
 * globals.css.
 */
export function TextLink({ href, children, current, className = "" }: TextLinkProps) {
  const external = href.startsWith("http");
  // .draws triggers the draw-in; data-current holds it. Both live on the anchor.
  const cls = `draws no-underline ${className}`;
  const body = (
    <span className="hd hd-rest">
      <span>{children}</span>
      <DrawnMark ghost />
    </span>
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
