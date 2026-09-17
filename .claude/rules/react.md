---
paths:
  - "src/**/*.{ts,tsx}"
---

# Conventions React / Next.js

## Composants

- Fichiers en `kebab-case` (`note-card.tsx`), **export nommé** — jamais de `export default`
  (sauf les fichiers spéciaux de Next : `page.tsx`, `layout.tsx`, `route.ts`).
- Le test vit à côté du composant : `note-card.tsx` + `note-card.test.tsx`.
- Props typées par un `type` local nommé `<Composant>Props`.

## Design system (Storybook)

- `src/components/ui/` = briques du design system « Notebook » (tokens dans
  `src/styles/tokens/`). **Un composant `ui/` n'existe pas sans sa story**
  (`<nom>.stories.tsx` à côté) ; une story par état visible.
- `src/components/sections/` = assemblages de page (timeline, listes…). Story
  quand le composant a des variantes ; pas obligatoire sinon.
- Les stories sont exécutées comme tests (`npm test`, projet `storybook`, Chromium
  headless + addon a11y en mode `error`). Une violation a11y casse la CI.
- Jamais de couleur, taille ou espacement en dur : `var(--…)` ou une classe
  Tailwind mappée dans `@theme` (`bg-paper`, `text-ink`, `border-rule`…).
- Le contenu vient de `src/data/*.ts` (profil, projets, trail, lectures) — même
  source pour les pages et le serveur MCP `/api/mcp`. Pas de copy en dur dans
  un composant.

## Server / Client

- **Server Component par défaut.** N'ajouter `"use client"` que si le composant a
  besoin d'état, d'un effet, d'un listener, ou de GSAP.
- Placer la frontière client **le plus bas possible** dans l'arbre : extraire le
  fragment interactif plutôt que de marquer toute la page.
- Ne jamais passer une fonction non sérialisable d'un Server à un Client Component.

## Composition

- Préférer `children` et les compound components aux props booléennes qui
  s'accumulent (`variant`, `isX`, `hasY`…). Si un composant a plus de 5 props de
  configuration, il veut probablement se décomposer.
- Pas d'état levé plus haut que nécessaire.

## Next.js 16

⚠️ Cette version diffère des données d'entraînement des modèles. Avant d'écrire
du code Next spécifique (routing, params, metadata, caching), lire la doc
correspondante dans `node_modules/next/dist/docs/`. Ne pas se fier à la mémoire.
