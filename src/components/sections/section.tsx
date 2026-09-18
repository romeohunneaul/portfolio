import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

type SectionProps = {
  id: string;
  label: string;
  aside?: ReactNode;
  /** One sentence under the heading. */
  lede?: string;
  /** Link to the full tab; `aside` becomes its text. */
  more?: string;
  children: ReactNode;
};

export function Section({ id, label, aside, lede, more, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="flex scroll-mt-8 flex-col gap-6">
      <SectionHeading id={`${id}-label`} lede={lede} aside={more ? <Link href={more}>{aside ?? "See all"}</Link> : aside}>
        {label}
      </SectionHeading>
      {children}
    </section>
  );
}
