import { Logo } from "@/components/ui/logo";
import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";

/** The 272px margin column: the mark on grid paper (an animation will replace it), one sticker. */
export function Margin() {
  return (
    <aside className="hidden flex-col gap-6 pt-2 lg:flex" aria-label="Margin">
      <div
        className="border-rule bg-card flex h-[210px] items-center justify-center border-[length:var(--border)]"
        style={{ backgroundImage: "var(--paper-grid-fine)" }}
      >
        <Logo size={150} />
      </div>
      <div className="flex items-center gap-2">
        <Mark name="arrow" />
        <Sticker>have a look around, the kettle is on</Sticker>
      </div>
    </aside>
  );
}
