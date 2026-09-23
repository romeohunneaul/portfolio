"use client";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { EntryRow } from "@/components/ui/entry-row";
import { useAxis } from "@/lab/variants";

// What "scanning an existing source" surfaces, per source kind. Fictional but plausible.
const SOURCES = {
  url: {
    label: "URL",
    placeholder: "https://arthurmonnet.com/some-analysis",
    signals: [
      { title: "Readable article", meta: "1,240 words" },
      { title: "2 data tables", meta: "chart-able" },
      { title: "1 embedded chart", meta: "reusable" },
    ],
    recommends: "analysis",
  },
  repo: {
    label: "Repo",
    placeholder: "github.com/org/repo",
    signals: [
      { title: "18 UI components", meta: "src/components/ui" },
      { title: "3 API routes", meta: "app/api" },
      { title: "Types for 6 models", meta: "typed" },
    ],
    recommends: "explorable",
  },
  database: {
    label: "Database / API",
    placeholder: "postgres://…  or  an OpenAPI URL",
    signals: [
      { title: "8 tables", meta: "schema read" },
      { title: "revenue", meta: "time series" },
      { title: "3 categorical dimensions", meta: "group-by" },
    ],
    recommends: "chart",
  },
  dataset: {
    label: "Dataset",
    placeholder: "data.csv  /  data.json",
    signals: [
      { title: "4,200 rows", meta: "sampled" },
      { title: "6 numeric columns", meta: "measures" },
      { title: "2 date columns", meta: "axes" },
    ],
    recommends: "chart",
  },
} as const;

const TYPES = {
  chart: "Chart",
  diagram: "Diagram",
  analysis: "Analysis",
  explorable: "Explorable",
} as const;

type SourceKey = keyof typeof SOURCES;
type TypeKey = keyof typeof TYPES;

function Preview({ type }: { type: TypeKey }) {
  if (type === "chart") {
    const bars = [40, 68, 52, 88, 34, 72];
    return (
      <svg viewBox="0 0 220 90" className="w-full max-w-[280px]" role="img" aria-label="Bar chart preview">
        {bars.map((h, i) => (
          <rect key={i} x={12 + i * 34} y={90 - h} width={20} height={h} className="fill-ink" opacity={0.85} />
        ))}
      </svg>
    );
  }
  if (type === "diagram") {
    return (
      <svg viewBox="0 0 220 90" className="w-full max-w-[280px]" role="img" aria-label="Diagram preview">
        <g className="fill-none stroke-ink" strokeWidth={1.5}>
          <rect x={8} y={34} width={54} height={24} rx={4} />
          <rect x={92} y={12} width={54} height={24} rx={4} />
          <rect x={92} y={56} width={54} height={24} rx={4} />
          <path d="M62 46 H80 M80 46 V24 H92 M80 46 V68 H92" />
        </g>
      </svg>
    );
  }
  if (type === "explorable") {
    return (
      <div className="w-full max-w-[280px]">
        <input type="range" defaultValue={62} className="w-full accent-black" aria-label="Parameter" />
        <p className="text-meta mt-1 font-mono text-neutral-500">rate = 0.62 → output 18.4</p>
      </div>
    );
  }
  return (
    <div className="max-w-[var(--measure)]">
      <p className="font-semibold">Why the Q3 dip is seasonal, not structural</p>
      <p className="text-meta text-neutral-600">Three signals point the same way, and the cited table backs each one…</p>
      <span className="mt-1 inline-block"><Chip>cites 2 tables</Chip></span>
    </div>
  );
}

export default function McpAppBuilder() {
  const source = (useAxis("source") || "url") as SourceKey;
  const state = useAxis("state") || "input";
  const type = (useAxis("appType") || "chart") as TypeKey;
  const src = SOURCES[source];

  return (
    <section className="py-8">
      <SectionHeading lede="Point it at something that already exists — a page, a repo, a database, a dataset — and it drafts an MCP app that renders it.">
        MCP App Builder
      </SectionHeading>

      {/* Source picker — reflects the `source` axis */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(Object.keys(SOURCES) as SourceKey[]).map((k) => (
          <Chip key={k} state={k === source ? "selected" : "rest"}>{SOURCES[k].label}</Chip>
        ))}
      </div>

      {/* Source input */}
      <div className="mt-3 flex items-center gap-2">
        <input
          defaultValue={src.placeholder}
          className="draws border-rule flex-1 rounded-md border px-3 py-2 font-mono text-sm"
          disabled={state !== "input"}
        />
        <Button>{state === "scanning" ? "Scanning…" : "Scan"}</Button>
      </div>

      {state === "scanning" && <p className="text-meta mt-4 font-mono text-neutral-500">Reading {src.label.toLowerCase()} → detecting what an MCP app could render…</p>}

      {state === "result" && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-meta mb-2 font-mono uppercase tracking-wide text-neutral-400">Detected</h3>
            {src.signals.map((s) => (
              <EntryRow key={s.title} title={s.title} meta={s.meta} />
            ))}

            <h3 className="text-meta mt-6 mb-2 font-mono uppercase tracking-wide text-neutral-400">App type</h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TYPES) as TypeKey[]).map((k) => (
                <Chip key={k} state={k === type ? "selected" : "rest"}>
                  {TYPES[k]}{k === src.recommends ? " · recommended" : ""}
                </Chip>
              ))}
            </div>
          </div>

          <div className="draws border-rule rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold">Preview · {TYPES[type]} MCP app</span>
              <Chip>text/html;profile=mcp-app</Chip>
            </div>
            <Preview type={type} />
            <pre className="mt-4 overflow-x-auto rounded-md bg-[#1c1c1c] p-3 font-mono text-[11px] leading-relaxed text-neutral-200">{`server.tool("render_${type}", schema, async (args) => ({
  content: [{ type: "text", text: "…" }],
  _meta: { "mcp-app/html": renderFrom(${source}) },
}))`}</pre>
          </div>
        </div>
      )}
    </section>
  );
}
