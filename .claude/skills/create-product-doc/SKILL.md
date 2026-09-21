---
name: create-product-doc
description: Crée ou met à jour la documentation produit d'une feature, en markdown, dans le repo. Recherche l'implémentation dans le codebase, génère une doc orientée utilisateur (overview, capacités, how-it-works, configuration, cas d'usage, FAQ) et insère les captures via chemins relatifs. Déclenchement manuel uniquement — l'utilisateur décide quand une feature mérite une doc.
disable-model-invocation: true
---

# Create product documentation

Génère une doc produit professionnelle, orientée utilisateur, en markdown, prête à être
publiée par la skill `publish-product-doc`.

## Avant de commencer

Lire le `CLAUDE.md` du projet pour récupérer la section `## Documentation` : outil de doc,
emplacement des docs (`Emplacement des docs`), emplacement des images, catégories — ainsi
que la langue et le ton dans `## Conventions`.

Si l'outil de doc est **GitBook**, s'appuyer sur la skill **`gitbook-authoring`** pour la
syntaxe (blocs hint/tabs/cards, `SUMMARY.md`, images dans `.gitbook/assets/`) — voir sa
référence `references/gitbook-syntax.md`. Ne pas inventer de syntaxe GitBook.
Si ces sections manquent dans `CLAUDE.md`, demander à l'utilisateur de les renseigner
(s'appuyer sur `CLAUDE.example.md` de la bibliothèque de skills comme gabarit).

## Entrées attendues
1. **Nom de la feature** (ex. "Dashboards")
2. **Catégorie** (selon les catégories déclarées dans `CLAUDE.md`)
3. **Captures** (optionnel) : chemins des images déjà dans le repo
4. **Contexte optionnel** : audience cible, aspects à couvrir

## Process

### 1. Rechercher l'implémentation
Utiliser le sous-agent `Explore` pour comprendre la feature côté utilisateur :
fonctionnalité principale, parcours utilisateur, options de configuration, permissions,
points d'intégration. Se concentrer sur le user-facing, pas l'implémentation interne.

**Le code fait foi sur ce qui existe.** C'est lui, jamais le brief, qui dit ce qui a été
livré : entre le cadrage et la mise en ligne, le périmètre fonctionnel bouge presque toujours.

### 1 bis. Récupérer l'intention, et relever l'écart
Lire le **brief** de la feature s'il existe (`briefs/` du brain, section `## Brain` du
`CLAUDE.md`). Il fait foi sur ce que le code ne dit pas : pourquoi la feature existe, le job
utilisateur qu'elle couvre, le vocabulaire métier à employer. Reconstruire ce « pourquoi »
depuis l'implémentation, c'est le deviner.

Deux sources, deux autorités :

| Question | Source |
|---|---|
| Qu'est-ce qui existe, et comment on s'en sert ? | le code |
| Pourquoi ça existe, et comment ça s'appelle ? | le brief |

**Là où les deux divergent, la doc suit le code, et l'écart se signale.** À la fin, lister à
l'utilisateur — dans le chat, jamais dans la page publiée — les écarts constatés :

```
Écarts brief ↔ livré :
- prévu et absent : <X>
- livré et non prévu : <Y>
- livré autrement : <Z> (le brief disait A, le code fait B)
```

C'est à lui de décider si le brief doit être corrigé ou si l'écart était voulu. La skill
signale, elle n'arbitre pas.

### 2. Plan de la doc (structure standard)
Adapter selon la feature ; toutes les sections ne s'appliquent pas toujours.

```markdown
# [Feature]
## Overview            — 2-3 phrases, bénéfices, pour qui
## Capacités clés      — liste des capacités principales
## Comment ça marche   — étapes + captures aux bons endroits
## Configuration       — setup, options (table), bonnes pratiques
## Cas d'usage         — scénarios concrets
## FAQ                 — questions fréquentes
## Besoin d'aide ?     — contact support
```

### 3. Rédiger
- **Langue et ton** : selon `## Conventions` de `CLAUDE.md` (par défaut FR, orienté utilisateur).
- **Commencer en H1** (`#`), titre = nom de la feature. (GitBook gère le titre par le H1.)
- **Orienté utilisateur** : "Tu peux personnaliser ton tableau de bord en…", pas
  "Le composant Dashboard implémente…".
- **Concis** : paragraphes de 2-4 phrases, listes, voix active.
- **Captures** : si le projet a des tests e2e (Playwright, Cypress), générer les images
  depuis eux plutôt qu'à la main — la capture et le comportement vérifié ne peuvent alors
  plus diverger. Sinon, utiliser les chemins fournis par l'utilisateur.
- **Captures en chemin relatif** au repo (pas d'URL CDN — GitBook héberge l'asset) :
  ```markdown
  ![Vue d'ensemble du dashboard](.gitbook/assets/dashboard-overview.png)
  ```
- **URL de l'app** si pertinent (depuis `## Produit` de `CLAUDE.md`).
- Éviter : détails d'implémentation, jargon interne, blabla marketing, infos périmées.

### 4. Enregistrer
Au bon endroit selon `CLAUDE.md`, en `kebab-case` :
```
<Emplacement des docs>/<catégorie>/<feature-slug>.md
# ex. docs/features/dashboards.md
```
Si l'outil de doc a un sommaire (GitBook : `SUMMARY.md`), ajouter une entrée pour la nouvelle page.

### 5. Vérifier
- Structure logique, sections présentes.
- Contenu clair, juste, sans jargon.
- Captures aux bons endroits, alt text fourni, chemins valides.
- Markdown valide, pas de lien cassé.

### 6. Résumer
Donner : fichier créé, catégorie, nb de mots ~, nb de captures, sections couvertes,
et l'étape suivante (publier via `publish-product-doc`).

## Longueurs indicatives
- Feature : 150-250 lignes · Intégration : 150-200 · Getting started : 100-150.
