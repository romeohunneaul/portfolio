"use client";

// A prototype reuses the SITE's real components — that is the whole point of hosting the lab here.
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useAxis } from "@/lab/variants";

export default function AskInline() {
  const state = useAxis("state");
  const compact = useAxis("density") === "compact";

  return (
    <section className={compact ? "py-4" : "py-10"}>
      <h1 className="text-title mb-1">Ask, inline</h1>
      <p className="text-meta mb-6 text-neutral-500">Reads two axes: state (rest/loading/answered) and density.</p>

      <div className={`draws border-rule rounded-lg border p-4 ${compact ? "text-meta" : ""}`}>
        <div className="mb-3 flex items-center gap-2">
          <span className="font-semibold">A catalogue you can talk to</span>
          <Chip>{state === "answered" ? "answered" : "in progress"}</Chip>
        </div>

        {state === "answered" ? (
          <p className="text-neutral-700">Yes — the catalogue answers in natural language and cites the shelf it pulled from.</p>
        ) : (
          <div className="flex items-center gap-2">
            <input
              placeholder="Ask the catalogue…"
              className="draws border-rule flex-1 rounded-md border px-3 py-2 font-mono text-sm"
              disabled={state === "loading"}
            />
            <Button>{state === "loading" ? "…" : "Ask"}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
