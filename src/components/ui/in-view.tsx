"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type InViewProps = { children: ReactNode; threshold?: number; className?: string };

/**
 * Marks a `group/in-view` with `data-in-view`: "false" once mounted, "true" once it has entered the
 * viewport, never back. Before hydration, or without JS, the attribute is absent, so children styled
 * with `group-data-[in-view=false]/in-view:` stay visible.
 */
export function InView({ children, threshold = 0.3, className = "" }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setShown(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-in-view={shown ?? undefined} className={`group/in-view ${className}`}>
      {children}
    </div>
  );
}
