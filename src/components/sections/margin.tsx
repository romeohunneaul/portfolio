import { Logo } from "@/components/ui/logo";

/** The 272px margin column: the mountain drawing itself on grid paper, and a word of welcome. */
export function Margin() {
  return (
    <aside className="hidden flex-col gap-6 pt-2 lg:flex" aria-label="Margin">
      <div
        className="border-rule bg-card text-ink flex h-[210px] items-center justify-center border-[length:var(--border)]"
        style={{ backgroundImage: "var(--paper-grid-fine)" }}
      >
        <Logo size={160} animate />
      </div>
      <p className="m-0 max-w-[26ch]">Welcome. Have a look around, the kettle is on.</p>
    </aside>
  );
}
