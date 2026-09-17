/** Every page has one heading level 1; the design gives it no visual weight. */
export function PageTitle({ children }: { children: string }) {
  return <h1 className="sr-only">{children}</h1>;
}
