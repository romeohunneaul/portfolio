import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";

/** The 272px margin column. One drawing (placeholder until it exists), one sticker. */
export function Margin() {
  return (
    <aside className="hidden flex-col gap-6 pt-2 lg:flex" aria-label="Margin">
      <div
        className="border-rule bg-card flex h-[210px] items-end border-[length:var(--border)] p-2"
        style={{ backgroundImage: "var(--paper-grid-fine)" }}
      >
        <span className="text-soft bg-card text-meta font-mono">sketch — ridgeline + runner, pencil on grid</span>
      </div>
      <div className="flex items-center gap-2">
        <Mark name="arrow" />
        <Sticker>have a look around, the kettle is on</Sticker>
      </div>
    </aside>
  );
}
