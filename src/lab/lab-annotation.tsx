"use client";

import { lazy, Suspense } from "react";

// Dev-only: the annotation toolbar never ships to production. Agentation turns a click on any
// element into a markdown block (selector + component + styles) to paste into Claude Code.
const Agentation = lazy(() => import("agentation").then((m) => ({ default: m.Agentation })));

export function LabAnnotation() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <Suspense fallback={null}>
      <Agentation />
    </Suspense>
  );
}
