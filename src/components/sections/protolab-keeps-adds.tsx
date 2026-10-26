"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Pin } from "@/components/ui/pin";
import { groupLabel, points, type Layout, type Volume } from "@/data/protolab";
import { ProtolabSheet } from "./protolab-specimen";

// What it keeps, what it adds: one page in protolab, marked up like a printout. Each number brings its part of
// the page forward and draws a box around it. From lg up, the page sits beside the legend, carries the pins, and a
// tour plays once in view; below lg, the page opens inside the legend item it illustrates (an accordion), so the
// picture never sits away from its words.

const stepMs = 4500;
const wide = "(min-width: 1024px)";
/** The tour is for the wide layout only, and never with reduced motion. */
const tourable = `${wide} and (prefers-reduced-motion: no-preference)`;

/** Whether a media query matches; false on the server, so the first render never tours. */
function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True while the section is on screen, false again once it leaves: the tour only plays in view. */
function useVisible<T extends Element>(threshold: number) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

const num = (id: string) => points.findIndex((p) => p.id === id) + 1;
const other = (l: Layout): Layout => (l === "rows" ? "cards" : "rows");

type Controls = { onLayout: (l: Layout) => void; onVolume: (v: Volume) => void };

/**
 * The page, and in the versions state its second layout beside it. Wide, the box keeps one height in every state
 * and the sheets shrink in place; `compact` (inside an accordion item) lays the two versions out at half size, with
 * no empty band around them.
 */
function Stage({ active, layout, volume, pins, controls, compact = false }: { active: string; layout: Layout; volume: Volume; pins?: (id: string, n: number) => ReactNode; controls: Controls; compact?: boolean }) {
  const versions = active === "versions";
  if (compact && versions) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[layout, other(layout)].map((l, i) => (
          <div key={l} inert={i === 1} className="flex min-w-0 flex-col gap-2">
            <p className="text-meta text-soft m-0 font-mono">{`Version ${i === 0 ? "A" : "B"} · ${l}`}</p>
            <div className="[zoom:0.49]">
              <ProtolabSheet layout={l} volume={volume} point={i === 0 ? active : null} {...(i === 0 ? controls : {})} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  const motion = "transition-[scale,translate,opacity] duration-700 ease-[var(--swipe-ease)] motion-reduce:transition-opacity";
  const caption = `text-row absolute -top-12 left-0 font-mono transition-opacity duration-500 ${versions ? "opacity-100" : "opacity-0"}`;
  return (
    <div className="relative">
      <div className={`${motion} ${versions ? "-translate-x-[25.5%] scale-[0.49]" : ""}`}>
        <p className={caption}>Version A · {layout}</p>
        <ProtolabSheet layout={layout} volume={volume} point={active} pick={pins} {...controls} />
      </div>
      <div inert className={`absolute inset-x-0 top-0 ${motion} ${versions ? "translate-x-[25.5%] scale-[0.49] opacity-100" : "scale-[0.49] opacity-0"}`}>
        <p className={caption}>Version B · {other(layout)}</p>
        <ProtolabSheet layout={other(layout)} volume={volume} />
      </div>
    </div>
  );
}

export function ProtolabKeepsAdds() {
  const [ref, inView] = useVisible<HTMLElement>(0.4);
  const [active, setActive] = useState("ds");
  const [layout, setLayout] = useState<Layout>("rows");
  const [volume, setVolume] = useState<Volume>("typical");
  const [wantsTour, setTouring] = useState(true);
  const touring = useMedia(tourable) && wantsTour;

  /** Scenarios show the worst case on arrival; leaving them puts the typical data back. */
  const go = (id: string) => {
    if (id === "scenarios") setVolume("many");
    else if (active === "scenarios") setVolume("typical");
    setActive(id);
  };
  const pick = (id: string) => {
    setTouring(false);
    go(id);
    // Below lg the item above may close as this one opens: bring the opened one back to the top.
    if (!window.matchMedia(wide).matches) {
      requestAnimationFrame(() => document.getElementById(`point-${id}`)?.scrollIntoView({ block: "start", behavior: "smooth" }));
    }
  };

  useEffect(() => {
    if (!inView || !touring) return;
    const last = num(active) === points.length;
    const t = setTimeout(() => (last ? setTouring(false) : go(points[num(active)].id)), stepMs);
    return () => clearTimeout(t);
  });

  const controls: Controls = {
    onLayout: (l) => {
      setTouring(false);
      setLayout(l);
    },
    onVolume: (v) => {
      setTouring(false);
      setVolume(v);
    },
  };

  return (
    <section ref={ref} aria-label="What it keeps and what it adds" className="lg:w-[min(60rem,calc(100vw-12rem))]">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_16rem]">
        <div className="hidden min-w-0 lg:block">
          <Stage
            active={active}
            layout={layout}
            volume={volume}
            pins={(id, n) => <Pin n={n} on={active === id} onClick={() => pick(id)} label={points[n - 1].title} />}
            controls={controls}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          {(["keeps", "adds"] as const).map((g) => (
            <div key={g} className="flex flex-col gap-1">
              <p className="text-soft text-meta m-0 font-mono">{groupLabel[g]}</p>
              <ol className="m-0 flex list-none flex-col p-0">
                {points
                  .filter((p) => p.group === g)
                  .map((p) => {
                    const on = active === p.id;
                    return (
                      <li key={p.id} id={`point-${p.id}`} className="border-rule scroll-mt-6 border-b">
                        <button
                          type="button"
                          onClick={() => pick(p.id)}
                          aria-pressed={on}
                          className={`flex w-full items-start gap-3 py-3 text-left transition-colors duration-[var(--swipe-duration)] ${on ? "" : "text-soft hover:text-ink"}`}
                        >
                          <span
                            className={`text-meta border-ink flex size-6 shrink-0 items-center justify-center border-[length:var(--border)] font-mono tabular-nums transition-colors duration-[var(--swipe-duration)] ${
                              on ? "bg-ink text-paper" : ""
                            }`}
                          >
                            {num(p.id)}
                          </span>
                          <span className="font-semibold">{on ? <Highlight punch>{p.title}</Highlight> : p.title}</span>
                        </button>
                        {on && (
                          <div className="flex flex-col gap-10 pb-5 pl-9 transition-[opacity,translate] duration-500 ease-[var(--swipe-ease)] starting:translate-y-1 starting:opacity-0 motion-reduce:starting:translate-y-0 lg:pb-3">
                            <p className="m-0">{p.body}</p>
                            <div className="-ml-9 lg:hidden">
                              <Stage active={active} layout={layout} volume={volume} controls={controls} compact />
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ol>
            </div>
          ))}
          <span className="hidden lg:inline">
            <Button variant="quiet" onClick={() => setTouring((t) => !t)}>
              {touring ? "Stop the tour" : "Play the tour"}
            </Button>
          </span>
        </div>
      </div>
    </section>
  );
}
