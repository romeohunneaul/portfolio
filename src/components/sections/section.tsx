import Link from "next/link";
import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/section-label";

type SectionProps = {
  id: string;
  label: string;
  aside?: ReactNode;
  /** "more" link to the full tab. */
  more?: string;
  children: ReactNode;
};

export function Section({ id, label, aside, more, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="flex scroll-mt-6 flex-col gap-4">
      <SectionLabel
        id={`${id}-label`}
        aside={
          more ? (
            <Link href={more} className="no-underline hover:underline">
              {aside ?? "more"} →
            </Link>
          ) : (
            aside
          )
        }
      >
        {label}
      </SectionLabel>
      {children}
    </section>
  );
}
