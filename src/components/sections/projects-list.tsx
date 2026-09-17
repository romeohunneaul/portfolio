import { Chip } from "@/components/ui/chip";
import { EntryRow } from "@/components/ui/entry-row";
import { projects, type Project } from "@/data/projects";

const statusTone: Record<Project["status"], "accent" | "strong" | "highlight" | "none"> = {
  shipped: "accent",
  "in progress": "highlight",
  prototype: "none",
  "open source": "strong",
};

type ProjectsListProps = { variant?: "compact" | "full"; limit?: number };

/** Compact: hairline rows linking to /work. Full: each project unfolds on click. */
export function ProjectsList({ variant = "compact", limit }: ProjectsListProps) {
  const list = limit ? projects.slice(0, limit) : projects;

  if (variant === "compact") {
    return (
      <div>
        {list.map((p) => (
          <EntryRow
            key={p.slug}
            href={`/work#${p.slug}`}
            title={p.title}
            mark={<Chip tone={statusTone[p.status]}>{p.status}</Chip>}
            meta={p.year}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      {list.map((p) => (
        <details key={p.slug} id={p.slug} className="border-rule group border-b scroll-mt-6">
          <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 px-2 py-[13px] text-[length:var(--size-row)] hover:bg-[var(--accent-tint)] [&::-webkit-details-marker]:hidden">
            <span className="flex flex-wrap items-center gap-3">
              <span>{p.title}</span>
              <Chip tone={statusTone[p.status]}>{p.status}</Chip>
            </span>
            <span className="text-soft font-mono text-[length:var(--size-meta)] tabular-nums">{p.year}</span>
            <span className="text-soft col-span-2 text-[length:var(--size-body)]">{p.context}</span>
          </summary>
          <div className="flex flex-col gap-3 px-2 pt-1 pb-5 text-[length:var(--size-body)]">
            <p className="m-0 max-w-[var(--measure)]">{p.problem}</p>
            <ul className="text-soft m-0 flex max-w-[var(--measure)] list-disc flex-col gap-1 pl-4">
              {p.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-soft font-mono text-[length:var(--size-caption)]">{p.role} ·</span>
              {p.stack.map((s) => (
                <Chip key={s} tone="none">
                  {s}
                </Chip>
              ))}
              {p.links?.map((l) => (
                <a key={l.url} href={l.url} rel="noreferrer" className="font-mono text-[length:var(--size-caption)]">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
