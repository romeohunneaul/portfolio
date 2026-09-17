import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";

/** The 272px margin column. One drawing (placeholder until it exists), one sticker. */
export function Margin() {
  return (
    <aside className="hidden flex-col gap-5 pt-1 lg:flex" aria-label="Margin">
      <div
        className="border-rule bg-card flex h-[210px] items-end border-[length:var(--border)] p-2"
        style={{ backgroundImage: "var(--paper-grid-fine)" }}
      >
        <span className="text-soft bg-card font-mono text-[length:var(--size-caption)]">
          sketch — ridgeline + runner, pencil on grid
        </span>
      </div>
      <p className="text-soft m-0 text-[length:var(--size-meta)] leading-[var(--leading-loose)]">
        one drawing on the page, in the margin. everything else is type.
      </p>
      <div className="flex items-center gap-2">
        <Mark name="arrow" />
        <Sticker>
          no resume here <s>sorry</s>
        </Sticker>
      </div>
    </aside>
  );
}
