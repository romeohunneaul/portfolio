import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { DrawnBox } from "@/components/ui/drawn-box";
import { EntryRow } from "@/components/ui/entry-row";
import { LogoSquare } from "@/components/ui/logo-square";
import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";
import { Tag } from "@/components/ui/tag";
import { layouts, orderLink, orders, volumes, type Layout, type Order, type Volume } from "@/data/protolab";

// The specimen the points mark up: the orders page of a shop's back office, in a browser frame,
// with protolab's panel at the bottom. Each point brings its region forward, draws a box around it
// and pins what it is about on it; the rest of the page steps back. Rendered by ProtolabKeepsAdds.

type Region = "url" | "nav" | "header" | "filters" | "list" | "version" | "data";
const all: Region[] = ["url", "nav", "header", "filters", "list", "version", "data"];

/** What each point keeps in focus, and the region it draws a box around. */
const focusOf: Record<string, { show: Region[]; box?: Region }> = {
  ds: { show: ["nav", "header", "filters", "list"] },
  data: { show: ["list"], box: "list" },
  versions: { show: all, box: "version" },
  scenarios: { show: ["list", "data"], box: "data" },
  link: { show: ["url"], box: "url" },
  skills: { show: all },
};

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" });
const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/** A row of quiet toggles, the current one holding its drawn mark (as the site's tabs do). */
function Toggle<T extends string>({ label, options, value, onChange }: { label: string; options: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-soft text-meta font-mono">{label}</span>
      {options.map((o) => (
        <Button key={o.id} variant="quiet" onClick={() => onChange(o.id)} aria-pressed={o.id === value} data-current={o.id === value ? "true" : undefined}>
          {o.label}
        </Button>
      ))}
    </span>
  );
}

function Area({ id, point, pin, className = "", children }: { id: Region; point: string | null; pin?: ReactNode; className?: string; children: ReactNode }) {
  const focus = point ? focusOf[point] : null;
  const dim = focus && !focus.show.includes(id);
  return (
    <div className={`relative ${className}`}>
      <div className={`transition-opacity duration-500 ease-[var(--swipe-ease)] ${dim ? "opacity-20" : ""}`}>{children}</div>
      <DrawnBox on={focus?.box === id} />
      {pin}
    </div>
  );
}

/** A value of the first row; when the data point is on, its field name shows above it. */
function Field({ name, on, delay, children }: { name: string; on: boolean; delay: string; children: ReactNode }) {
  return (
    <span className="relative">
      {children}
      <Tag on={on} delay={delay} className="-top-6 left-0">
        {name}
      </Tag>
    </span>
  );
}

/**
 * A designer's note: a framed card in the pen colour, and an arrow that points at what it is about. `point` says
 * which side the target is on, so the arrow can sit on that side and aim at it.
 */
function Note({ on, delay, point, className, children }: { on: boolean; delay: string; point: "left" | "right"; className: string; children: ReactNode }) {
  return (
    <span
      aria-hidden={!on}
      className={`pointer-events-none absolute z-20 items-center gap-1 transition-[opacity,translate] duration-500 ease-[var(--swipe-ease)] motion-reduce:translate-y-0 ${point === "left" ? "flex-row-reverse" : ""} ${delay} ${
        on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      } ${className}`}
    >
      <span className="text-meta border-accent-strong bg-card text-ink w-max max-w-[9.5rem] border-[length:var(--border)] px-2 py-1 font-mono shadow-[var(--shadow-rest)]">
        {children}
      </span>
      <Mark name="arrow" className={`text-accent-strong shrink-0 ${point === "left" ? "-scale-x-100" : ""}`} />
    </span>
  );
}

function Rows({ rows, fields }: { rows: Order[]; fields: boolean }) {
  return (
    <div>
      {rows.map((o, i) => {
        const on = fields && i === 0;
        return (
          <EntryRow
            key={o.customer}
            title={<Field name="customer" on={on} delay="delay-0">{o.customer}</Field>}
            mark={<Field name="status" on={on} delay="delay-100"><Chip>{o.status}</Chip></Field>}
            meta={
              <>
                <Field name="total" on={on} delay="delay-200">{money.format(o.total)}</Field>
                <Field name="date" on={on} delay="delay-300">{day.format(new Date(o.date))}</Field>
              </>
            }
          />
        );
      })}
    </div>
  );
}

function Cards({ rows }: { rows: Order[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {rows.map((o) => (
        <div key={o.customer} className="border-rule bg-card flex flex-col gap-2 border-[length:var(--border)] p-3">
          <span className="font-semibold break-words">{o.customer}</span>
          <span className="flex items-baseline justify-between gap-2">
            <Chip>{o.status}</Chip>
            <span className="text-meta font-mono tabular-nums">{money.format(o.total)}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

type ProtolabSheetProps = {
  layout: Layout;
  volume: Volume;
  point?: string | null;
  /** Given on the front sheet only: it carries the pins. */
  pick?: (id: string, n: number) => ReactNode;
  onLayout?: (l: Layout) => void;
  onVolume?: (v: Volume) => void;
};

export function ProtolabSheet({ layout, volume, point = null, pick, onLayout, onVolume }: ProtolabSheetProps) {
  const on = (id: string) => point === id;
  // The designer's notes are placed on the rows layout with typical data: that point shows it, without the toggles.
  const notes = on("skills");
  if (notes) [layout, volume] = ["rows", "typical"];
  const { total, rows } = orders[volume];
  const shown = rows.slice(0, 4);
  const more = total - shown.length;

  return (
    <div className="border-ink bg-paper relative flex flex-col border-[length:var(--border)] shadow-[var(--shadow-rest)]">
      <Area id="url" point={point} pin={pick?.("link", 5)} className="border-rule border-b [&>button]:-top-3 [&>button]:right-3">
        <p className="text-soft text-meta m-0 truncate px-3 py-2 font-mono">{orderLink(layout, volume)}</p>
        <span
          className={`absolute -top-5 right-12 z-30 transition-[opacity,scale] duration-[var(--swipe-duration)] ease-[var(--swipe-ease)] ${
            on("link") ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <Sticker rotate={-4}>Link copied</Sticker>
        </span>
      </Area>

      <div className="grid sm:grid-cols-[8.5rem_1fr]">
        <Area id="nav" point={point} className="border-rule hidden border-r p-4 sm:block">
          <span className="flex items-center gap-2">
            <LogoSquare name="Acme Shop" size={28} />
            <span className="text-meta font-mono">Acme</span>
          </span>
          <span className="mt-5 flex flex-col items-start gap-2">
            <Button variant="quiet" data-current="true">Orders</Button>
            <Button variant="quiet">Customers</Button>
            <Button variant="quiet">Products</Button>
          </span>
          <Tag on={on("ds")} delay="delay-300" className="top-[10.5rem] left-4">Button quiet</Tag>
        </Area>

        <div className="relative flex min-w-0 flex-col gap-4 p-4 sm:p-5">
          <Area id="header" point={point} pin={pick?.("ds", 1)} className="[&>button]:-top-3 [&>button]:-right-3">
            <span className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-baseline gap-2">
                <span className="text-title font-semibold">Orders</span>
                <span className="text-soft text-meta font-mono tabular-nums">{total.toLocaleString("en-GB")}</span>
              </span>
              <Button>New order</Button>
            </span>
            <Tag on={on("ds")} className="top-2 right-[7.5rem]">Button</Tag>
            <Note on={on("skills")} delay="delay-0" point="right" className="top-0 right-[6.75rem] hidden sm:flex">
              One primary action per page
            </Note>
          </Area>

          <Area id="filters" point={point}>
            <span className="flex flex-wrap gap-2">
              <Chip state="selected">All</Chip>
              <Chip>Paid</Chip>
              <Chip>Shipped</Chip>
              <Chip>Refunded</Chip>
            </span>
            <Tag on={on("ds")} delay="delay-100" className="top-0 right-0">Chip</Tag>
          </Area>

          <Area id="list" point={point} pin={pick?.("data", 2)} className="[&>button]:-bottom-2 [&>button]:right-0 sm:[&>button]:top-10 sm:[&>button]:right-auto sm:[&>button]:bottom-auto sm:[&>button]:-left-9">
            {/* One height whatever the data, so nothing below the sheet moves when the scenario changes. */}
            <div className="h-[15.5rem] overflow-hidden">
              {total === 0 ? (
                <p className="text-soft m-0 py-6">No orders yet.</p>
              ) : layout === "rows" ? (
                <Rows rows={shown} fields={on("data")} />
              ) : (
                <Cards rows={shown} />
              )}
            </div>
            <p className="text-soft text-meta m-0 pt-3 font-mono">
              <span className="relative">
                {more > 0 ? `+ ${more.toLocaleString("en-GB")} more ${more === 1 ? "order" : "orders"}` : " "}
                <Note on={on("skills") && more > 0} delay="delay-500" point="left" className="top-1/2 left-full ml-1 -mt-6 hidden sm:flex">
                  Say how many are left
                </Note>
              </span>
            </p>
            <Tag on={on("ds")} delay="delay-200" className="top-[3.1rem] right-0">{layout === "rows" ? "EntryRow" : "Chip"}</Tag>
          </Area>
        </div>
      </div>
      <Note on={on("skills")} delay="delay-300" point="right" className="top-[15rem] left-3 hidden sm:flex">Long names must wrap: test the worst case</Note>

      <div className="border-rule bg-card relative flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t px-4 py-3">
        {pick && <span className="absolute -top-3 right-4">{pick("skills", 6)}</span>}
        <span className="text-meta font-mono font-semibold">protolab</span>
        <Area id="version" point={point} pin={pick?.("versions", 3)} className="[&>button]:-top-8 [&>button]:-left-2">
          <span className={notes ? "invisible" : ""}>
            <Toggle label="Version" options={layouts} value={layout} onChange={(l) => onLayout?.(l)} />
          </span>
        </Area>
        <Area id="data" point={point} pin={pick?.("scenarios", 4)} className="[&>button]:-top-8 [&>button]:-left-2 max-sm:[&>button]:top-0 max-sm:[&>button]:left-auto max-sm:[&>button]:-right-9">
          <span className={notes ? "invisible" : ""}>
            <Toggle label="Data" options={volumes} value={volume} onChange={(v) => onVolume?.(v)} />
          </span>
        </Area>
      </div>
    </div>
  );
}
