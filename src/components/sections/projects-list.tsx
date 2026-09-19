import { AskRow } from "@/components/ask/ask-row";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { Chip } from "@/components/ui/chip";
import { projects } from "@/data/projects";

/** One row per problem worked on. A row opens the side panel: problem, approach, stack, questions. */
export function ProjectsList({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <ul className="m-0 list-none p-0">
      {list.map((p) => (
        <li key={p.slug} id={p.slug} className="scroll-mt-8">
          <AskRow context={{ kind: "project", id: p.slug }}>
            <span className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="hd text-row font-semibold"><span>{p.title}</span><DrawnMark /></span>
                <Chip>{p.status}</Chip>
              </span>
              <span className="text-soft text-meta font-mono tabular-nums">{p.year}</span>
              <span className="col-span-2 max-w-[var(--measure)]">{p.context}</span>
            </span>
          </AskRow>
          <noscript>
            <p className="m-0 max-w-[var(--measure)] py-4">{p.problem}</p>
          </noscript>
        </li>
      ))}
    </ul>
  );
}
