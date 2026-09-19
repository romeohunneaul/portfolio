import { AskRow } from "@/components/ask/ask-row";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { LogoSquare } from "@/components/ui/logo-square";
import { education, experience, type Experience } from "@/data/profile";
import { experienceId } from "@/lib/ask/context";

type TimelineProps = {
  /** `full` adds education under the positions. */
  variant?: "compact" | "full";
};

const dates = (start: string, end: string) => `${start} – ${end}`;

function Head({ x, summary }: { x: Pick<Experience, "company" | "role" | "logo" | "start" | "end">; summary?: string }) {
  return (
    <span className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 sm:grid-cols-[auto_1fr_auto]">
      <LogoSquare name={x.company} src={x.logo} />
      <span className="text-row">
        <span className="hd"><span><span className="font-semibold">{x.company}</span> — {x.role}</span><DrawnMark /></span>
      </span>
      <span className="text-soft text-meta col-start-2 font-mono tabular-nums sm:col-start-auto sm:pt-1">{dates(x.start, x.end)}</span>
      {summary && <span className="col-start-2 max-w-[var(--measure)] sm:col-span-2">{summary}</span>}
    </span>
  );
}

/** The LinkedIn part: one row per position. A row opens the side panel with the detail and the questions. */
export function Timeline({ variant = "compact" }: TimelineProps) {
  return (
    <ol className="m-0 list-none p-0">
      {experience.map((x) => (
        <li key={x.company + x.start}>
          <AskRow context={{ kind: "experience", id: experienceId(x) }}>
            <Head x={x} summary={x.summary} />
          </AskRow>
          {/* Without JavaScript the panel cannot open: the missions stay readable here. */}
          {x.bullets && (
            <noscript>
              <ul className="m-0 flex max-w-[var(--measure)] list-disc flex-col gap-2 py-4 pl-16">
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </noscript>
          )}
        </li>
      ))}
      {variant === "full" &&
        education.map((e) => (
          <li key={e.school} className="border-rule border-b py-5">
            <Head x={{ company: e.school, role: e.degree, start: e.start, end: e.end }} />
          </li>
        ))}
    </ol>
  );
}
