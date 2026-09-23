---
name: protolab-ds-context
description: Récupère le design system disponible pour un prototype du lab — composants codés (src/components/ui + leurs stories Storybook) et, en amont, la source design (Claude Design / DesignSync). À utiliser AVANT d'écrire ou de modifier un proto, quand l'utilisateur dit "quels composants j'ai", "récupère le storybook", "prototype avec le DS", ou dès que protolab-create doit choisir un composant. Ne jamais inventer un composant ou une prop : ce que cette skill ne trouve pas n'existe pas.
---

# protolab — contexte design system

Un proto du lab **réutilise les vrais composants du site**. Cette skill établit ce qui est
disponible, pour ne jamais coder à partir de la mémoire.

> **Règle dure (reprise d'AgiProto).** Interdit de conclure « pas de composant pour ça » sans
> avoir cherché dans `src/components/ui/`. La donnée d'entraînement n'est jamais une source.
> Si tu n'as pas lu le fichier, tu ne sais pas.

## 1. Composants codés = source primaire

Le DS vit dans `src/components/ui/`. Chaque composant a un `.tsx` et souvent un `.stories.tsx`
qui documente ses états.

- Lister : `ls src/components/ui/*.tsx | grep -v '\.stories\.\|\.test\.'`
- Pour un composant retenu, lire **son `.tsx`** (props, variants réels) **et son `.stories.tsx`**
  (les états que le designer a jugé dignes d'être montrés — c'est le contrat d'usage).
- Les classes Tailwind maison (`draws`, `btn`, `text-meta`, `border-rule`…) sont définies dans
  `src/app/globals.css`. Les réutiliser, ne pas réinventer une couleur en dur.

Ne jamais inventer une prop ou un variant : `Button` a `variant: "outlined" | "quiet"`, rien
d'autre. Vérifie dans le `.tsx` avant d'écrire.

## 2. Source design en amont (secondaire)

Le DS *design* vit dans Claude Design / DesignSync (voir la mémoire projet
`portfolio-design-system-source`). À consulter quand une intention design existe mais n'a pas
encore d'équivalent codé — pour décider s'il faut composer avec l'existant ou signaler un manque.

## 3. Restitution

Rends une courte liste : composants pertinents pour la tâche, leurs props/états réels, et les
**trous** (ce que la feature demande et qu'aucun composant ne couvre). Le trou est un signal
produit, pas une invitation à écrire du CSS custom — le signaler, demander via `AskUserQuestion`
si un fallback est acceptable.

## Ce que cette skill ne fait pas

Elle ne code rien. Elle prépare `protolab-create` / `protolab-variant`. CSS custom = dernier
recours, jamais sans validation explicite.
