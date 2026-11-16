import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** outlined: a rounded hairline box. quiet: bare type that underlines under the pointer. */
  variant?: "outlined" | "quiet";
  children: ReactNode;
};

/** None of them fill with colour. The icon control is AskRow's arrow, not a Button. */
export function Button({ variant = "outlined", children, className = "", ...rest }: ButtonProps) {
  if (variant === "quiet") {
    return (
      <button type="button" {...rest} className={`hd draws text-meta px-0.5 py-1 ${className}`}>
        {children}
      </button>
    );
  }
  return (
    <button type="button" {...rest} className={`btn text-meta ${className}`}>
      {children}
    </button>
  );
}
