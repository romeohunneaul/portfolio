---
paths:
  - "content/**/*.mdx"
  - "content-collections.ts"
  - "src/app/sandbox/**"
---

# Contenu (MDX / content-collections)

## Modèle

Le dépôt git tient lieu de base de données : un fichier `.mdx` dans
`content/notes/` = une note. Le schéma Zod de `content-collections.ts` joue le
rôle des contraintes de colonnes, vérifiées **au build**.

## Règles

- Tout champ du frontmatter doit exister dans le schéma Zod. Un frontmatter
  invalide **casse le build** — c'est voulu, ne jamais assouplir le schéma pour
  faire passer une note malformée : corriger la note.
- Ajouter un champ = modifier le schéma **et** vérifier les notes existantes
  (un champ requis sans `.default()` invalide tout le contenu déjà écrit).
- Les fichiers sont édités depuis Obsidian : garder le Markdown lisible à la
  main, pas de HTML inutile, pas de composant là où du Markdown suffit.
- Nom de fichier en `kebab-case`, il sert de slug d'URL.
- `draft: true` exclut une note de la publication — l'utiliser plutôt que de
  garder un brouillon hors du dépôt.

## Thème éditorial

Le site parle de **l'IA appliquée à des problèmes concrets et aux nouvelles
formes d'interaction au travail**. Toute note ou case study se rattache à ce fil.
