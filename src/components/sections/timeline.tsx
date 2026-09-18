import { AskButton } from "@/components/ask/ask-button";
import { Disclosure } from "@/components/ui/disclosure";
import { LogoSquare } from "@/components/ui/logo-square";
import { education, experience, type Experience } from "@/data/profile";
import { experienceId } from "@/lib/ask/context";

type TimelineProps = {
  /** `compact`: one summary line. `full`: bullets under a disclosure. */
  variant?: "compact" | "full";
};

const dates = (start: string, end: string) => `${start} – ${end}`;

function Head({ x, summary, askId }: { x: Pick<Experience, "company" | "role" | "logo" | "start" | "end">; summary?: string; askId?: string }) {
  return (
    <span className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 sm:grid-cols-[auto_1fr_auto]">
      <LogoSquare name={x.company} src={x.logo} />
      <span className="text-row">
        <span className="font-semibold">{x.company}</span>
        <span> — {x.role}</span>
      </span>
      <span className="text-soft text-meta col-start-2 font-mono tabular-nums sm:col-start-auto sm:pt-1">{dates(x.start, x.end)}</span>
      {summary && <span className="col-start-2 max-w-[var(--measure)] sm:col-span-2">{summary}</span>}
      {askId && (
        <span className="col-start-2 sm:col-span-2">
          <AskButton context={{ kind: "experience", id: askId }}>Want to know more? Ask</AskButton>
        </span>
      )}
    </span>
  );
}

/** The LinkedIn part: one row per position, a small square mark, dates in mono. */
export function Timeline({ variant = "compact" }: TimelineProps) {
  return (
    <ol className="m-0 list-none p-0">
      {experience.map((x) => (
        <li key={x.company + x.start} data-ask-kind="experience" data-ask-id={experienceId(x)}>
          {variant === "compact" ? (
            <div className="border-rule border-b py-4">
              <Head x={x} summary={x.summary} askId={experienceId(x)} />
            </div>
          ) : (
            <Disclosure summary={<Head x={x} summary={x.summary} />}>
              <div className="flex flex-col gap-3 pl-12">
                {x.bullets && (
                  <ul className="m-0 flex max-w-[var(--measure)] list-disc flex-col gap-2 pl-5">
                    {x.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {x.location && <span className="text-soft text-meta font-mono">{x.location}</span>}
                <AskButton context={{ kind: "experience", id: experienceId(x) }} className="self-start">
                  Want to know more? Ask
                </AskButton>
              </div>
            </Disclosure>
          )}
        </li>
      ))}
      {variant === "full" &&
        education.map((e) => (
          <li key={e.school} className="border-rule border-b py-4">
            <Head x={{ company: e.school, role: e.degree, start: e.start, end: e.end }} />
          </li>
        ))}
    </ol>
  );
}
