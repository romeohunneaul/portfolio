---
name: gitbook-authoring
description: Référence de syntaxe et bonnes pratiques pour écrire/éditer de la documentation GitBook en dehors de l'interface GitBook (repo Git-synced, éditeur markdown, IDE). À utiliser dès qu'on rédige ou corrige une page destinée à GitBook : blocs spécifiques GitBook (hint, tabs, cards, expandable, stepper, embeds, fichiers), `SUMMARY.md` (sommaire), `.gitbook.yaml` (config), `.gitbook/assets` (images), variables/includes réutilisables, front matter de page, ou quand un rendu GitBook ne s'affiche pas comme prévu. Déclencher sur "GitBook", "syntaxe doc", "SUMMARY.md", "hint/tabs/cards GitBook", "bloc GitBook", "la page de doc ne s'affiche pas".
---

# GitBook authoring

Aide à produire du markdown **valide pour GitBook** quand on édite la doc en dehors de l'interface (Git Sync, IDE, CLI) — là où la syntaxe enrichie de GitBook (hint, tabs, cards…) ne s'invente pas.

## Quand l'utiliser

- Rédiger ou corriger une page publiée sur GitBook (Git Sync).
- Ajouter un bloc GitBook (hint, tabs, cards, expandable, stepper, embed, fichier).
- Toucher au `SUMMARY.md` (sommaire), `.gitbook.yaml` (config), `.gitbook/assets` (images), aux variables (`vars.yaml`) ou aux includes.
- Diagnostiquer un rendu GitBook qui ne s'affiche pas comme prévu.

Cette skill **complète** `create-product-doc` (qui rédige la page) et `publish-product-doc` (qui commit + push) : elle fournit la **syntaxe GitBook exacte** que ces deux-là appliquent.

## Comment l'utiliser

Le **contexte projet** (outil de doc, emplacement des docs et des images, catégories, langue/ton) se lit dans le `CLAUDE.md` du projet — sections `## Documentation` et `## Conventions`. Cette skill reste **générique** : elle ne contient pas de chemins ni de conventions propres à un projet.

Pour toute question de syntaxe ou de configuration GitBook, lire la référence complète :

→ **[`references/gitbook-syntax.md`](references/gitbook-syntax.md)** — structure des fichiers, `SUMMARY.md`, blocs GitBook, `.gitbook.yaml`, variables, includes, images, bonnes pratiques.

## Garde-fous

- **Images en chemins relatifs** vers `.gitbook/assets/` (jamais d'URL CDN externe).
- Toute **nouvelle page** doit être ajoutée au `SUMMARY.md`.
- **Ne pas inventer de syntaxe** : vérifier dans la référence avant d'utiliser un bloc GitBook.
