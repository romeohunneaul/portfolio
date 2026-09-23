---
name: protolab-create
description: Crée un prototype dans le lab du portfolio (src/lab/protos/<slug>) et l'enregistre au manifest. À utiliser quand l'utilisateur dit "nouveau proto", "prototype la feature X", "crée un proto pour…", ou veut essayer une idée d'écran/interaction en réutilisant les vrais composants du site. Génère un composant fidèle au DS, jamais une maquette HTML statique.
---

# protolab — créer un prototype

Objectif : passer d'une intention de feature à un écran qui tourne à `/lab/p/<slug>`, en
**réutilisant les composants du site**. La métrique qui compte est le temps entre « j'ai une
idée » et « je la vois à l'écran » — pas la cérémonie.

> **Principe (AgiProto).** Toute règle est payée par Claude, pas par l'utilisateur. Ne bloque
> jamais sur un défaut que tu peux corriger seul. Au moindre arbitrage produit → `AskUserQuestion`.

## Étape 0 — Contexte de la feature

Avant de coder, réunis le contexte, dans cet ordre :
1. **Ce que l'utilisateur décrit** — l'intention. Reformule en 1–2 phrases + les états visibles
   attendus. Note les ambiguïtés, ne les devine pas.
2. **L'existant du site** — si la feature touche une zone déjà codée (ex. le flow Ask,
   `src/components/ask/`), lis-la : le proto doit ressembler à l'existant, pas partir de zéro.
3. **Le DS** — lance `protolab-ds-context` pour savoir quels composants tu as le droit d'employer.

Si l'intention est trop vague pour un écran (whole dimensions manquantes) → `AskUserQuestion`
avec des défauts proposés, jamais un blocage sec.

## Étape 1 — Scaffolder

Un proto = un dossier + une entrée manifest. Pas de script : tu écris les deux fichiers.

1. Crée `src/lab/protos/<slug>/index.tsx` :
   - `"use client"` en tête **si** le proto lit un axe (`useAxis`) ou a de l'interactivité.
   - `export default function <ClassName>()`.
   - Importe les composants réels via `@/components/ui/*` — jamais recopier leur style.
   - Copy en **anglais** (le site est en anglais), même si l'échange est en français.
2. Ajoute l'entrée dans `src/lab/manifest.ts` (`PROTOS`) : `slug`, `name`, `author`,
   `description`, `axes` (voir `protolab-variant`), et `load: () => import("./protos/<slug>")`.
   - `slug` en kebab-case.

## Étape 2 — Vérifier

- Le code compile : `npx tsc --noEmit` (ou le check du projet).
- **Ne pas** lancer l'app pour juger le rendu à la place de l'utilisateur : la vérif visuelle
  se fait dans le navigateur (hot reload), c'est son travail. Toi tu garantis que ça compile et
  que le DS est respecté.
- Donne l'URL : `/lab/p/<slug>`.

## Règles

- **Livrable = composant React standalone** réutilisant le DS. Un `.html` statique n'est jamais
  valide.
- **Jamais inventer** un composant, une prop, une classe : vérifie via `protolab-ds-context`.
- **CSS custom = dernier recours**, en classes/tokens du site uniquement, et après validation.
- Le proto est **jetable et hors prod** (`/lab` est noindex) : pas de test, pas de a11y
  exhaustive exigés — sauf si l'utilisateur le demande.
