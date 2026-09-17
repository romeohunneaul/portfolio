"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

/**
 * Animation d'entrée. Le contenu est visible par défaut : GSAP anime *depuis*
 * un état masqué (`from`), pour qu'un échec du JS laisse la page lisible.
 * `matchMedia` respecte prefers-reduced-motion sans test manuel.
 */
export function Reveal({ children, delay = 0 }: RevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(container.current, {
          opacity: 0,
          y: 16,
          duration: 0.7,
          delay,
          ease: "power2.out",
        });
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [delay] },
  );

  return <div ref={container}>{children}</div>;
}
