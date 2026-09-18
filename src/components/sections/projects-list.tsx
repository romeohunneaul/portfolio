import { Chip } from "@/components/ui/chip";
import { Disclosure } from "@/components/ui/disclosure";
import { EntryRow } from "@/components/ui/entry-row";
import { OpenOnHash } from "@/components/ui/open-on-hash";
import { projects, type Project } from "@/data/projects";

const statusTone: Record<Project["status"], "accent" | "strong" | "highlight" | "none"> = {
  shipped: "accent",
  "in progress": "highlight",
  prototype: "none",
  "open source": "strong",
};

type ProjectsListProps = { variant?: "compact" | "full"; limit?: number };

/** Compact: hairline rows linking to /work. Full: each project unfolds. */
export function ProjectsList({ variant = "compact", limit }: ProjectsListProps) {
  const list = limit ? projects.slice(0, limit) : projects;

  if (variant === "compact") {
    return (
      <div>
        {list.map((p) => (
          <EntryRow key={p.slug} href={`/work#${p.slug}`} title={p.title} mark={<Chip tone={statusTone[p.status]}>{p.status}</Chip>} meta={p.year} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <OpenOnHash />
      {list.map((p) => (
        <Disclosure
          key={p.slug}
          id={p.slug}
          summary={
            <>
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-row font-semibold">{p.title}</span>
                <Chip tone={statusTone[p.status]}>{p.status}</Chip>
              </span>
              <span className="text-soft text-meta font-mono tabular-nums">{p.year}</span>
              <span className="col-span-2 max-w-[var(--measure)]">{p.context}</span>
            </>
          }
        >
          <div className="flex max-w-[var(--measure)] flex-col gap-4">
            <p className="m-0">{p.problem}</p>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
              {p.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-soft text-meta font-mono">{p.role}</span>
              {p.stack.map((s) => (
                <Chip key={s} tone="none">
                  {s}
                </Chip>
              ))}
              {p.links?.map((l) => (
                <a key={l.url} href={l.url} rel="noreferrer" className="text-meta">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </Disclosure>
      ))}
    </div>
  );
}
