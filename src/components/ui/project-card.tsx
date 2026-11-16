import Image from "next/image";
import { DrawnMark } from "./drawn-mark";

type ProjectCardProps = {
  title: string;
  stack?: string[];
  /** 16:10, inset at the top of the card. Without one, a flat paper panel holds the place. */
  image?: { src: string; alt: string };
  /** The invitation at the end of the card, e.g. "See the project →". */
  more: string;
};

const STACK_SHOWN = 2;

/**
 * A problem worked on, as a card: the photo first, a short title, two technologies, an invitation to
 * open it. One type family throughout: the stack is plain text, not mono chips. Spans only, so it can
 * sit inside the button that opens the panel.
 */
export function ProjectCard({ title, stack = [], image, more }: ProjectCardProps) {
  const shown = stack.slice(0, STACK_SHOWN);
  return (
    <span className="flex h-full flex-col gap-3 p-2">
      <span className="border-rule/50 bg-paper relative block aspect-[16/10] shrink-0 overflow-hidden border">
        {image && (
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
        )}
      </span>
      <span className="flex-1 px-2 leading-[var(--leading-tight)] font-semibold">
        <span className="hd">
          <span>{title}</span>
          <DrawnMark />
        </span>
      </span>
      <span className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2">
        {shown.length > 0 && (
          <span className="flex flex-wrap items-center gap-1.5">
            {shown.map((s) => (
              <span key={s} className="border-rule/50 bg-paper text-soft text-meta border px-1.5 whitespace-nowrap">
                {s}
              </span>
            ))}
            {stack.length > shown.length && <span className="text-soft text-meta">…</span>}
          </span>
        )}
        <span className="text-meta font-semibold whitespace-nowrap">{more}</span>
      </span>
    </span>
  );
}
