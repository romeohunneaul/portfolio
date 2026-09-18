"use client";

import { useEffect } from "react";

/** Landing on /work#slug opens the matching <details> so the anchor is not a closed row. */
export function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const el = document.getElementById(location.hash.slice(1));
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView();
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
