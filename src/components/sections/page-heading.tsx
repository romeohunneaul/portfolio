type PageHeadingProps = { children: string; lede?: string };

/** Every page starts with a visible title: 24px, weight 600, then an optional one-sentence lede. */
export function PageHeading({ children, lede }: PageHeadingProps) {
  return (
    <div className="flex max-w-[var(--measure)] flex-col gap-3">
      <h1 className="text-lede m-0 font-semibold text-balance">{children}</h1>
      {lede && <p className="text-title m-0">{lede}</p>}
    </div>
  );
}
