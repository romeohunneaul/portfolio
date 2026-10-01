"use client";

import { setTheme, useTheme } from "@/lib/theme";

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  const p = (r: number) => `${(8 + r * Math.cos(a)).toFixed(2)} ${(8 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(4.6)}L${p(6.4)}`;
});

function Glyph({ name }: { name: "sun" | "moon" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "sun" ? (
        <>
          <circle cx="8" cy="8" r="2.8" />
          {RAYS.map((d) => (
            <path key={d} d={d} />
          ))}
        </>
      ) : (
        <path d="M10.6 2.6A5.6 5.6 0 1 0 13.4 10.4 4.4 4.4 0 0 1 10.6 2.6z" />
      )}
    </svg>
  );
}

/**
 * Day / night switch for the whole site. A square knob slides over a ruled track, carrying the
 * current glyph; the other one waits, faint, on the free side. Styles: .theme-toggle in globals.css.
 */
export function ThemeToggle() {
  const dark = useTheme() === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Night mode"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="theme-toggle"
    >
      <Glyph name="sun" />
      <Glyph name="moon" />
      <span className="knob">
        <Glyph name={dark ? "moon" : "sun"} />
      </span>
    </button>
  );
}
