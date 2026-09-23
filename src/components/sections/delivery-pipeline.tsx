import { Chip } from "@/components/ui/chip";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { LogoSquare } from "@/components/ui/logo-square";
import { OpenOnHash } from "@/components/ui/open-on-hash";
import { brandMarks } from "@/data/brand-marks";
import { deliveryLab, labStack, type LabSkill, type LabStatus } from "@/data/delivery-lab";

const statusLabel: Record<LabStatus, string> = {
  validated: "validated",
  wip: "work in progress",
  thinking: "still thinking",
};

const sourceLabel: Record<LabSkill["source"], string> = {
  mine: "",
  "matt-pocock": "Matt Pocock",
};

/** The classic "opens elsewhere" glyph: a square with an arrow leaving it. */
function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

/** Dotted leader filling the space to a trailing redirect icon. */
const leader = <span aria-hidden="true" className="border-rule mx-2 mb-[3px] min-w-6 flex-1 self-end border-b border-dotted" />;

/** A plain labelled row: name · · · · ↗ (used for a step whose only link is the repo). */
function LeaderRow({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a href={href} rel="noreferrer" style={{ textDecoration: "none" }} className="draws text-meta flex items-baseline font-mono">
        <span className="hd">
          <span>{label}</span>
          <DrawnMark />
        </span>
        {leader}
        <ExternalIcon />
      </a>
    </li>
  );
}

/** A skill row: name (source) · · · · ↗ when public, name · · · · private when kept back. */
function SkillRow({ skill }: { skill: LabSkill }) {
  const source = sourceLabel[skill.source];
  if (!skill.href) {
    return (
      <li className="text-soft text-meta flex items-baseline font-mono">
        <span>{skill.name}</span>
        {leader}
        <span className="shrink-0">private</span>
      </li>
    );
  }
  return (
    <li>
      <a href={skill.href} rel="noreferrer" style={{ textDecoration: "none" }} className="draws text-meta flex items-baseline font-mono">
        <span className="hd">
          <span>{skill.name}</span>
          <DrawnMark />
        </span>
        {source && <span className="text-soft ml-2 shrink-0">{source}</span>}
        {leader}
        <ExternalIcon />
      </a>
    </li>
  );
}

/**
 * The pipeline, phase by phase. Each row unfolds a native <details>; the drawn
 * mark under the title is the affordance and stays drawn while open — the three
 * moves, no +/− glyph, no colour on hover. Works without JavaScript.
 */
export function DeliveryPipeline() {
  const stepNumber = new Map(deliveryLab.flatMap((p) => p.steps).map((s, i) => [s.slug, i + 1] as const));
  return (
    <div className="flex flex-col gap-8">
      <OpenOnHash />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {labStack.map((t) => (
          <span key={t.name} className="flex items-center gap-2" title={t.name}>
            {t.mark ? (
              <span
                className="border-rule bg-card text-soft inline-flex shrink-0 items-center justify-center border-[length:var(--border)]"
                style={{ width: 28, height: 28 }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                  <path d={brandMarks[t.mark]} />
                </svg>
              </span>
            ) : (
              <LogoSquare name={t.name} size={28} />
            )}
            <span className="text-soft text-meta font-mono">{t.name}</span>
          </span>
        ))}
      </div>

      {deliveryLab.map((phase) => (
        <section key={phase.title} aria-label={phase.title}>
          <p className="text-soft text-meta m-0 pb-1 font-mono">{phase.title}</p>
          {phase.steps.map((s) => {
            return (
              <details key={s.slug} id={s.slug} className="group scroll-mt-8">
                <summary className="draws border-rule grid cursor-pointer list-none grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b py-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="hd text-row font-semibold">
                      <span>{s.title}</span>
                      <DrawnMark />
                    </span>
                    <Chip>{statusLabel[s.status]}</Chip>
                  </span>
                  <span className="text-soft text-meta font-mono tabular-nums">{String(stepNumber.get(s.slug) ?? 0).padStart(2, "0")}</span>
                  <span className="col-span-2 max-w-[var(--measure)]">{s.does}</span>
                </summary>

                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-5">
                  <dt className="text-soft text-meta font-mono">In → out</dt>
                  <dd className="m-0">{s.replay}</dd>

                  {s.skills.length > 0 && (
                    <>
                      <dt className="text-soft text-meta font-mono">Skills</dt>
                      <dd className="m-0">
                        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                          {s.skills.map((sk) => (
                            <SkillRow key={sk.name} skill={sk} />
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}

                  {s.skills.length === 0 && s.links && (
                    <>
                      <dt className="text-soft text-meta font-mono">Repo</dt>
                      <dd className="m-0">
                        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                          {s.links.map((l) => (
                            <LeaderRow key={l.url} href={l.url} label={l.label} />
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}

                  {s.tools.length > 0 && (
                    <>
                      <dt className="text-soft text-meta font-mono">Tools</dt>
                      <dd className="m-0 flex flex-wrap gap-x-3 gap-y-1">
                        {s.tools.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </dd>
                    </>
                  )}
                </dl>
              </details>
            );
          })}
        </section>
      ))}
    </div>
  );
}
