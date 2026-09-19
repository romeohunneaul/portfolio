import { TextLink } from "@/components/ui/text-link";
import { skills, stack, type Tech } from "@/data/profile";

const groups: Tech["group"][] = ["AI", "Web", "Data", "Ops"];

/** Skills as plain lists; tools as rows that say where they were used — visible, not on hover. */
export function StackGrid({ withSkills = false }: { withSkills?: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      {withSkills && (
        <dl className="m-0 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {skills.map((g) => (
            <div key={g.name} className="flex flex-col gap-2">
              <dt className="font-semibold">{g.name}</dt>
              {g.items.map((s) => (
                <dd key={s} className="m-0">
                  {s}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      )}
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {groups.map((g) => (
          <dl key={g} className="m-0 flex flex-col gap-3">
            <dt className="font-semibold">{g}</dt>
            {stack
              .filter((t) => t.group === g)
              .map((t) => (
                <dd key={t.name} className="m-0 flex flex-col">
                  <TextLink href={t.url}>{t.name}</TextLink>
                  <span className="text-soft text-meta">{t.used}</span>
                </dd>
              ))}
          </dl>
        ))}
      </div>
    </div>
  );
}
