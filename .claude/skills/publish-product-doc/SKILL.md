---
name: publish-product-doc
description: Publie la documentation produit en markdown vers l'hébergeur de doc du projet. Par défaut GitHub + GitBook (Git Sync) : vérifie les assets, commit et push la doc sur la branche suivie par GitBook, qui se met à jour automatiquement. Utilise cette skill quand l'utilisateur dit "publie la doc", "pousse la doc en ligne", "mets à jour GitBook", "sync la doc". Déclenchement manuel uniquement : cette skill pousse sur la branche de prod.
disable-model-invocation: true
---

# Publish product documentation

Publie la doc rédigée par `create-product-doc`. Avec GitBook en mode Git Sync, "publier"
= committer et pusher le markdown : GitBook reconstruit la page automatiquement.

## Avant de commencer

Lire le `CLAUDE.md` du projet : section `## Documentation` (outil de doc, mode de
publication, emplacement des docs et des images) et `## Stack` (branche de prod).

Pour la validation de syntaxe GitBook avant publication (blocs, `SUMMARY.md`, chemins
d'images relatifs vers `.gitbook/assets/`), s'appuyer sur la skill **`gitbook-authoring`**.

## Process (GitBook + GitHub Git Sync)

### 1. Vérifier les fichiers
- Le `.md` existe et est valide.
- Les images référencées existent au bon emplacement (`Emplacement des images`).
- Les liens d'images sont des **chemins relatifs** (pas d'URL CDN externe).
- Si GitBook utilise un `SUMMARY.md`, la nouvelle page y figure.

### 2. Committer
```bash
git add <Emplacement des docs>/ <Emplacement des images>/
git commit -m "docs: <feature> — création/maj"
```

### 3. Pousser sur la branche suivie par GitBook
```bash
git push origin <branche de prod>
```
> Si la doc passe par une PR avant publication, créer la PR au lieu de pousser sur main,
> et le signaler à l'utilisateur.

### 4. Vérifier la publication
- GitBook se synchronise en quelques secondes après le push.
- Donner à l'utilisateur l'URL publique de la page (selon l'espace GitBook du projet).
- Recommander un contrôle visuel : titre correct, captures visibles, page dans la bonne section.

### 5. Résumer
Fournir : fichier publié, commit, branche, URL publique, et l'étape suivante éventuelle
(annonce / changelog).

## Autres hébergeurs
Si `Outil de doc` ≠ GitBook dans `CLAUDE.md`, adapter :
- **Docusaurus / MkDocs sur Vercel/Pages** : push déclenche le build et le déploiement.
- Dans tous les cas : le `.md` du repo est la source de vérité, la publication suit le push.

## Garde-fous
- Ne jamais pousser sur la branche de prod si le projet impose une PR.
- Vérifier que les assets sont commités **avec** la doc (sinon images cassées en ligne).
