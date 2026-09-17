import { LogoSquare } from "@/components/ui/logo-square";
import { education, experience } from "@/data/profile";

type TimelineProps = {
  /** `compact` hides bullets; `full` unfolds them under a native disclosure. */
  variant?: "compact" | "full";
};

const dates = (start: string, end: string) => `${start} – ${end === "now" ? "now" : end}`;

/** The LinkedIn part: one hairline row per position, a small square mark, dates in mono. */
export function Timeline({ variant = "compact" }: TimelineProps) {
  return (
    <ol className="m-0 list-none p-0">
      {experience.map((x) => {
        const head = (
          <span className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 px-2 py-[13px] sm:grid-cols-[auto_1fr_auto]">
            <LogoSquare name={x.company} src={x.logo} />
            <span className="text-[length:var(--size-row)]">
              <span className="font-medium">{x.company}</span>
              <span className="text-soft"> — {x.role}</span>
            </span>
            <span className="text-soft col-start-2 font-mono text-[length:var(--size-meta)] tabular-nums sm:col-start-auto">
              {dates(x.start, x.end)}
            </span>
            {variant === "compact" && (
              <span className="text-soft col-start-2 text-[length:var(--size-body)] sm:col-span-2">{x.summary}</span>
            )}
          </span>
        );

        return (
          <li key={x.company + x.start} className="border-rule border-b">
            {variant === "full" && x.bullets ? (
              <details className="group">
                <summary className="cursor-pointer list-none marker:hidden hover:bg-[var(--accent-tint)] [&::-webkit-details-marker]:hidden">
                  {head}
                </summary>
                <div className="flex flex-col gap-2 px-2 pb-4 pl-[60px] text-[length:var(--size-body)]">
                  <p className="m-0">{x.summary}</p>
                  <ul className="text-soft m-0 flex list-disc flex-col gap-1 pl-4">
                    {x.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {x.location && <span className="text-soft font-mono text-[length:var(--size-caption)]">{x.location}</span>}
                </div>
              </details>
            ) : variant === "full" ? (
              <div>
                {head}
                <p className="text-soft m-0 px-2 pb-4 pl-[60px] text-[length:var(--size-body)]">{x.summary}</p>
              </div>
            ) : (
              head
            )}
          </li>
        );
      })}
      {variant === "full" &&
        education.map((e) => (
          <li key={e.school} className="border-rule border-b">
            <span className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 px-2 py-[13px] sm:grid-cols-[auto_1fr_auto]">
              <LogoSquare name={e.school} />
              <span className="text-[length:var(--size-row)]">
                <span className="font-medium">{e.school}</span>
                <span className="text-soft"> — {e.degree}</span>
              </span>
              <span className="text-soft col-start-2 font-mono text-[length:var(--size-meta)] tabular-nums sm:col-start-auto">
                {dates(e.start, e.end)}
              </span>
            </span>
          </li>
        ))}
    </ol>
  );
}
