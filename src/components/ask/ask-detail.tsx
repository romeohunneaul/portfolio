import { Chip } from "@/components/ui/chip";
import { LogoSquare } from "@/components/ui/logo-square";
import { resolve, type AskContext } from "@/lib/ask/context";

/** The top of the panel: what the row could not show — missions, approach, stack. */
export function AskDetail({ context }: { context: AskContext }) {
  const r = resolve(context);
  if (!r) return null;

  if (r.kind === "experience") {
    const x = r.data;
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <LogoSquare name={x.company} src={x.logo} size={40} />
          <div className="flex flex-col">
            <span className="text-soft text-meta font-mono tabular-nums">
              {x.start} – {x.end}
              {x.location ? `, ${x.location}` : ""}
            </span>
          </div>
        </div>
        <p className="m-0">{x.summary}</p>
        {x.bullets && (
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
            {x.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {x.url && (
          <a href={x.url} rel="noreferrer" className="text-meta self-start">
            {new URL(x.url).hostname.replace("www.", "")}
          </a>
        )}
      </div>
    );
  }

  const p = r.data;
  return (
    <div className="flex flex-col gap-4">
      <span className="text-soft text-meta font-mono">
        {p.year}, {p.role.toLowerCase()}, {p.status}
      </span>
      <p className="m-0">{p.context}</p>
      <p className="m-0">{p.problem}</p>
      <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
        {p.approach.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2">
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
  );
}
