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
