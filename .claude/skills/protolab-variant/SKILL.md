---
name: protolab-variant
description: Ajoute une variante (un axe) à un prototype existant du lab — un état (rest/loading/erreur/vide), un layout, un thème, une densité. À utiliser quand l'utilisateur dit "ajoute un état", "fais une variante", "montre aussi le cas vide", "crée un axe". Chaque axe est orthogonal et pilotable depuis le switcher + l'URL.
---

# protolab — ajouter une variante (axe)

Un proto modélise ses variations comme des **axes orthogonaux** : n'importe quelle combinaison
de valeurs est valide et testable, sans dupliquer le composant en N×M copies. Repris du modèle
« axes » d'AgiProto.

## Le modèle

Un axe (`src/lab/variants.tsx`, type `Axis`) : `{ key, label, values: [{id, label}], default? }`.
La valeur courante est dans l'URL (`?a.<key>=<id>`) → un lien restaure la combinaison exacte.

Deux usages, par convention :
- **Signal** — un état lu dans le composant : `const state = useAxis("state")`. Le composant
  branche son rendu dessus (`state === "loading" ? … : …`).
- **Layout** — une bascule de structure plus large, lue de la même façon.

## Ajouter un axe

1. Dans `src/lab/manifest.ts`, sur l'entrée du proto, ajoute (ou complète) `axes`. Exemple :
   ```ts
   axes: [
     { key: "state", label: "State", values: [
       { id: "rest", label: "Rest" },
       { id: "empty", label: "Empty" },
       { id: "error", label: "Error" },
     ] },
   ],
   ```
2. Dans `src/lab/protos/<slug>/index.tsx`, lis l'axe et branche le rendu :
   ```ts
   const state = useAxis("state"); // Signal<string> de la valeur courante
   ```
   Le composant doit être `"use client"` (useAxis est un hook client).

Le switcher (`VariantSwitcher`) affiche la dropdown automatiquement — rien à câbler dans l'UI.

## Règles

- **Orthogonalité** : les valeurs d'un axe ne présument pas d'un autre axe. Si deux dimensions
  se contraignent l'une l'autre, ce sont deux axes, pas un axe combiné.
- **Défaut explicite** quand le premier `values[0]` n'est pas l'état de repos voulu (`default`).
- Ne pas encoder de la **donnée** dans un axe (une ligne de tableau ≠ un axe). Un axe = un mode
  de l'écran. La data réaliste viendra d'une autre brique (scénarios), plus tard.
