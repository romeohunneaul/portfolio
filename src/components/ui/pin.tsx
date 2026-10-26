type PinProps = { n: number; on: boolean; onClick: () => void; label: string; className?: string };

/**
 * A numbered square that marks a spot on a specimen, the way a printout gets marked up. Ink when
 * on, with the paper shift. Absolute: the parent is `relative`, `className` places it.
 */
export function Pin({ n, on, onClick, label, className = "" }: PinProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${n}. ${label}`}
      aria-pressed={on}
      className={`text-meta border-ink absolute z-30 flex size-7 items-center justify-center border-[length:var(--border)] font-mono tabular-nums transition-[background-color,color,box-shadow,translate] duration-[var(--swipe-duration)] ease-[var(--swipe-ease)] ${
        on ? "bg-ink text-paper -translate-px shadow-[var(--shadow-hover)]" : "bg-paper hover:shadow-[var(--shadow-hover)]"
      } ${className}`}
    >
      {n}
    </button>
  );
}
