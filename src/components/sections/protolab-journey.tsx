import { Highlight } from "@/components/ui/highlight";
import { InView } from "@/components/ui/in-view";
import { attempts, criteria, fit, lab, type Fit } from "@/data/protolab";

// The journey, kept from the prototype (grid): what each tool gave, then protolab as the conclusion.
// The columns fill tool by tool and protolab last; when the table scrolls, protolab stays pinned on
// the right. Below `sm`, one block per tool lists only what it misses.

const columns = [...attempts, lab];

/** One delay per column, from Tailwind's scale: the columns fill left to right, protolab last. */
const delays = ["delay-0", "delay-150", "delay-300", "delay-500", "delay-700", "delay-1000"];

const fitLabel: Record<Fit, string> = { yes: "yes", partly: "partly", no: "no" };

/** Full, half or empty disc, drawn in ink. */
function FitMark({ fit }: { fit: Fit }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="inline-block shrink-0">
      <circle cx="6" cy="6" r="5" fill={fit === "yes" ? "var(--ink)" : "none"} stroke="var(--ink)" strokeWidth="1.2" />
      {fit === "partly" && <path d="M6 1a5 5 0 0 1 0 10z" fill="var(--ink)" />}
    </svg>
  );
}

const name = (id: string, tool: string) => (id === lab.id ? <Highlight punch>{tool}</Highlight> : tool);

/** Below `sm`: each tool and only the criteria it misses. */
function Blocks() {
  return (
    <div className="flex flex-col sm:hidden">
      {columns.map((col) => {
        const misses = criteria.filter((cr) => fit[col.id][cr.id] !== "yes");
        return (
          <div key={col.id} className={`border-rule flex flex-col gap-2 border-b py-4 ${col.id === lab.id ? "bg-card px-3" : ""}`}>
            <p className="m-0 font-semibold">{name(col.id, col.tool)}</p>
            <ul className="text-meta m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
              {misses.map((cr) => (
                <li key={cr.id} className="flex items-center gap-2">
                  <FitMark fit={fit[col.id][cr.id]} />
                  {cr.label}
                  <span className="sr-only">: {fitLabel[fit[col.id][cr.id]]}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function ProtolabJourney() {
  // Visible by default: the cells only hide once JS has mounted and the table is not yet in view.
  const cell = (c: number) =>
    `transition-opacity duration-500 ease-[var(--swipe-ease)] ${delays[c]} group-data-[in-view=false]/in-view:opacity-0`;
  const pinned = (id: string) => (id === lab.id ? "bg-card border-rule sticky right-0 z-10 border-l" : "");

  return (
    <section aria-label="What I used before" className="flex flex-col gap-6 pb-4">
      <Blocks />

      <InView threshold={0.4} className="hidden overflow-x-auto sm:block lg:w-[48rem]">
        <table className="text-meta w-full border-collapse">
          <thead>
            <tr>
              <th className="border-ink bg-paper sticky left-0 z-10 border-b py-3 pr-4 text-left font-normal">
                <span className="sr-only">Criterion</span>
              </th>
              {columns.map((col, c) => (
                <th
                  key={col.id}
                  scope="col"
                  className={`border-ink border-b px-2 py-3 text-left align-bottom font-semibold ${pinned(col.id)} ${cell(c)}`}
                >
                  {name(col.id, col.tool)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((cr) => (
              <tr key={cr.id}>
                <th scope="row" className="border-rule text-soft bg-paper sticky left-0 z-10 border-b py-3 pr-4 text-left font-normal whitespace-nowrap">
                  {cr.label}
                </th>
                {columns.map((col, c) => {
                  const f = fit[col.id][cr.id];
                  return (
                    <td key={col.id} className={`border-rule border-b px-2 py-3 ${pinned(col.id)} ${cell(c)}`}>
                      <FitMark fit={f} />
                      <span className="sr-only">{fitLabel[f]}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </InView>

      <p className="text-soft text-meta m-0 hidden flex-wrap gap-x-5 gap-y-1 sm:flex">
        {(["yes", "partly", "no"] as const).map((f) => (
          <span key={f} className="flex items-center gap-2">
            <FitMark fit={f} /> {fitLabel[f]}
          </span>
        ))}
      </p>
    </section>
  );
}
