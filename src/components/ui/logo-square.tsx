import Image from "next/image";

type LogoSquareProps = {
  name: string;
  /** Path under /public. Rendered monochrome so it sits on the paper. */
  src?: string;
  size?: number;
};

/** A company mark in a hairline square. Falls back to initials. */
export function LogoSquare({ name, src, size = 32 }: LogoSquareProps) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className="border-rule bg-card text-meta inline-flex shrink-0 items-center justify-center overflow-hidden border-[length:var(--border)] font-mono"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {src ? (
        <Image src={src} alt="" width={size - 8} height={size - 8} className="opacity-80 mix-blend-multiply grayscale contrast-125" />
      ) : (
        initials
      )}
    </span>
  );
}
