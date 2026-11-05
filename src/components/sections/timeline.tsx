import { AskRow } from "@/components/ask/ask-row";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { LogoSquare } from "@/components/ui/logo-square";
import { education, experience, type Experience } from "@/data/profile";
import { experienceId } from "@/lib/ask/context";

type TimelineProps = {
  /** `full` adds education under the positions. */
  variant?: "compact" | "full";
  /** Home teaser: show only the N most recent positions. */
  limit?: number;
};

const dates = (start: string, end: string) => `${start} – ${end}`;

type HeadProps = {
  x: Pick<Experience, "company" | "role" | "logo" | "start" | "end">;
  summary?: string;
  /** Inside an AskRow: on a phone the first line leaves room for its arrow. */
  trigger?: boolean;
};

function Head({ x, summary, trigger = false }: HeadProps) {
  return (
    // Phone: no logo (only two of five have one), the company one step up with the dates against it,
    // the role on its own line in soft ink (it describes the entry, like the dates), a gap, then the summary
    // in full; both run the whole width. From `sm`: logo, "Company — Role", dates.
    <span className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 sm:grid-cols-[auto_1fr_auto] sm:items-start">
      <span className="hidden sm:block">
        <LogoSquare name={x.company} src={x.logo} />
      </span>
      <span className="text-title sm:text-row">
        <span className="hd">
          <span>
            <span className="font-semibold">{x.company}</span>
            <span className="hidden sm:inline"> — {x.role}</span>
          </span>
          <DrawnMark />
        </span>
      </span>
      <span className={`text-soft text-meta font-mono whitespace-nowrap tabular-nums sm:mr-0 sm:pt-1 ${trigger ? "mr-10" : ""}`}>{dates(x.start, x.end)}</span>
      <span className="text-soft col-span-2 sm:hidden">{x.role}</span>
      {summary && <span className="col-span-2 max-w-[var(--measure)] pt-3 sm:col-start-2 sm:pt-0">{summary}</span>}
    </span>
  );
}

/** The LinkedIn part: one row per position. A row opens the side panel with the detail and the questions. */
export function Timeline({ variant = "compact", limit }: TimelineProps) {
  const positions = limit ? experience.slice(0, limit) : experience;
  return (
    <ol className="m-0 list-none p-0">
      {positions.map((x) => (
        <li key={x.company + x.start}>
          <AskRow context={{ kind: "experience", id: experienceId(x) }}>
            <Head x={x} summary={x.summary} trigger />
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
