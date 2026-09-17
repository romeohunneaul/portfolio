import { skills, stack, type Tech } from "@/data/profile";

const groups: Tech["group"][] = ["AI", "Web", "Data", "Ops"];

/** Skills as plain lists; tools as chips that say where they were used on hover. */
export function StackGrid({ withSkills = false }: { withSkills?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {withSkills && (
        <dl className="m-0 grid gap-x-8 gap-y-3 sm:grid-cols-3">
          {skills.map((g) => (
            <div key={g.name} className="flex flex-col gap-1">
              <dt className="text-soft font-mono text-[length:var(--size-caption)] tracking-[var(--track-label)] uppercase">{g.name}</dt>
              {g.items.map((s) => (
                <dd key={s} className="m-0 text-[length:var(--size-body)]">
                  {s}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      )}
      <dl className="m-0 flex flex-col gap-2">
        {groups.map((g) => (
          <div key={g} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-3">
            <dt className="text-soft font-mono text-[length:var(--size-caption)] tracking-[var(--track-label)] uppercase">{g}</dt>
            <dd className="m-0 flex flex-wrap gap-x-1 gap-y-1">
              {stack
                .filter((t) => t.group === g)
                .map((t) => (
                  <a
                    key={t.name}
                    href={t.url}
                    rel="noreferrer"
                    title={t.used}
                    className="inline-block bg-[var(--accent-tint)] px-[7px] py-[2px] font-mono text-[length:var(--size-caption)] no-underline hover:bg-[var(--highlight-tint)]"
                  >
                    {t.name}
                  </a>
                ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
