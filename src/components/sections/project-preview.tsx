"use client";

import { useEffect, useRef } from "react";

type ProjectPreviewProps = { src: string; poster: string };

/**
 * A muted excerpt of a project's demo, inside its card. It plays while the mouse is over the card
 * or the keyboard is on it, and goes back to the poster when it leaves. Touch screens and
 * reduced motion keep the poster. Nothing loads before the first play.
 */
export function ProjectPreview({ src, poster }: ProjectPreviewProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const row = video?.closest<HTMLElement>("[data-ask-id]");
    if (!video || !row) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const play = () => {
      if (!calm.matches) video.play().catch(() => {});
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") play();
    };
    // load() rewinds and shows the poster again, not the last frame played.
    const stop = () => video.load();

    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("pointerleave", stop);
    row.addEventListener("focus", play);
    row.addEventListener("blur", stop);
    return () => {
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("pointerleave", stop);
      row.removeEventListener("focus", play);
      row.removeEventListener("blur", stop);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="block h-full w-full object-cover"
    />
  );
}
