"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type LogoProps = {
  size?: number;
  /** Play the sequence on mount and on hover: ridge, snow line, footsteps up the slope, sun. */
  animate?: boolean;
  className?: string;
};

/**
 * The only brand mark: a marker-weight mountain, a snow line, a small sun —
 * and a runner's footsteps up the ridge. Everything is visible by default;
 * GSAP animates *from* the hidden state, so a JS failure still shows the logo.
 */
export function Logo({ size = 46, animate = false, className }: LogoProps) {
  const ref = useRef<SVGSVGElement>(null);
  const maskId = useId();

  useGSAP(
    () => {
      if (!animate) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .fromTo("[data-ridge]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 })
          .fromTo("[data-snow]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4 }, "-=0.25")
          .fromTo("[data-steps]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "steps(9)" }, "-=0.1")
          .fromTo(
            "[data-sun]",
            { scale: 0, transformOrigin: "50% 50%" },
            { scale: 1, duration: 0.5, ease: "back.out(2.5)" },
            "-=0.4",
          );
        const replay = () => {
          if (!tl.isActive()) tl.restart();
        };
        const el = ref.current;
        el?.addEventListener("pointerenter", replay);
        return () => el?.removeEventListener("pointerenter", replay);
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [animate] },
  );

  return (
    <svg
      ref={ref}
      width={size}
      height={(size * 34) / 46}
      viewBox="0 0 46 34"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* The footsteps are dotted; a solid path in a mask reveals them step by step. */}
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <path data-steps d="M6.5 26.5L15.5 11" pathLength={1} strokeDasharray={1} stroke="#fff" strokeWidth={4} />
        </mask>
      </defs>
      <path data-ridge d="M3 29L16 7l9 13 4-5 11 14z" pathLength={1} strokeDasharray={1} />
      <path data-snow d="M11.5 18.5c3-2 5 1 8-1" pathLength={1} strokeDasharray={1} strokeOpacity={0.7} />
      <path
        d="M6.5 26.5L15.5 11"
        pathLength={1}
        strokeDasharray="0.035 0.075"
        strokeWidth={1.6}
        strokeOpacity={0.8}
        mask={`url(#${maskId})`}
      />
      <path data-sun d="M35 6.5a3.4 3.4 0 1 0 0.1 0" className="text-accent-strong" />
    </svg>
  );
}
