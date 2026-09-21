import type { ButtonHTMLAttributes, ReactNode } from "react";
import { DrawnMark } from "./drawn-mark";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** outlined: ink box, hard shadow on hover. quiet: bare type over a faint drawn line. */
  variant?: "outlined" | "quiet";
  children: ReactNode;
};

/** None of them fill with colour. The icon control is AskRow's arrow, not a Button. */
export function Button({ variant = "outlined", children, className = "", ...rest }: ButtonProps) {
  if (variant === "quiet") {
    return (
      <button type="button" {...rest} className={`hd draws text-meta px-0.5 py-1 font-mono ${className}`}>
        {children}
        <DrawnMark />
      </button>
    );
  }
  return (
    <button type="button" {...rest} className={`btn text-meta font-mono ${className}`}>
      {children}
    </button>
  );
}
