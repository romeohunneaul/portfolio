---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# Motion (GSAP)

Le motion est un élément central de l'identité du site, pas une décoration
ajoutée après coup. Il se traite avec le même soin que le reste.

- **Toujours via `useGSAP()`** de `@gsap/react` — il nettoie les animations au
  démontage. Jamais de `gsap.to()` dans un `useEffect` nu (fuites, doublons en
  Strict Mode).
- Scoper les sélecteurs : `useGSAP(() => {...}, { scope: container })`.
- **Respecter `prefers-reduced-motion`** sur toute animation non essentielle.
  Utiliser `gsap.matchMedia()` plutôt qu'un test manuel.
- Animer en priorité `transform` et `opacity` (composés par le GPU). Éviter
  d'animer `width`, `height`, `top`, `left` — ils déclenchent des reflows.
- Une animation d'entrée ne doit jamais laisser un contenu invisible si le JS
  échoue : l'état par défaut en CSS est l'état *visible*, GSAP anime *depuis*
  un état masqué (`gsap.from()`), pas l'inverse.
