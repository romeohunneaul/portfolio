---
name: plan
description: Découpe un brief, une conversation ou une demande en tranches verticales implémentables, chacune avec son seam de test et ses critères d'acceptation, dans `.claude/specs/<feature>/plan.md`. À utiliser avant d'attaquer le code sur un travail qui dépasse un aller-retour, quand l'utilisateur dit "fais le plan", "découpe cette feature", "prépare l'implémentation", ou quand un brief validé doit devenir du code.
---

# Plan

Transforme une intention validée en **tranches verticales** : des morceaux de travail qui
traversent toutes les couches, se démontrent seuls, et tiennent chacun dans une fenêtre de
contexte fraîche.

Le plan est **jetable**. Il est consommé par l'implémentation et périmé dès qu'elle apprend
quelque chose. Ce qui doit durer vit ailleurs : l'intention dans le brief, les décisions
d'architecture coûteuses à défaire dans un ADR.

## Étape 1 — Rassembler

- Le **brief** s'il existe (section `## Brain` du `CLAUDE.md`), ou la conversation en cours.
- Le **repo** : `CLAUDE.md`, `AGENTS.md`, `.claude/rules/`, `CONTEXT.md` et ADR s'ils
  existent. Le vocabulaire du plan est celui du projet.
- Le **code de la zone touchée**, pour connaître son état réel plutôt que supposé.

Chercher au passage les occasions de **préfacturer** : rendre le changement facile, puis
faire le changement facile. Un préfactoring devient la première tranche.

## Étape 2 — Choisir les seams

Un **seam** est la frontière publique où l'on observe un comportement sans atteindre l'intérieur.
C'est là que vivent les tests, et c'est le contrat que le refactor ne devra pas casser.

- **Prendre le seam le plus haut possible**, celui qui observe ce que l'utilisateur vit.
- **En avoir le moins possible.** L'idéal est un pour l'ensemble du changement : chaque seam
  supplémentaire est une chose de plus à réécrire quand le code bouge alors que le
  comportement, lui, n'a pas changé.
- Descendre d'un cran seulement pour de la logique pure dont l'erreur est invisible d'en haut.
- Si aucun seam haut n'observe le comportement, c'est le découpage du code qui est en cause,
  pas le test : le dire, et proposer le préfactoring qui ouvre le seam.

Les commandes viennent du projet (`package.json`, `AGENTS.md`) — les lire, pas les inventer.

## Étape 3 — Découper, puis faire valider

Découper en tranches **verticales** :

- une tranche traverse toutes les couches nécessaires et livre un comportement complet ;
- une tranche terminée se démontre ou se vérifie seule ;
- une tranche tient dans une fenêtre de contexte fraîche ;
- chaque tranche déclare ce qui la **bloque** : les tranches qui doivent être finies avant.

**Exception : le refactor large.** Un changement mécanique dont le rayon d'impact traverse
tout le code (renommer un champ partagé, retyper un symbole central) ne rentre pas dans une
tranche verticale. Le séquencer en *expand → migrate → contract* : ajouter la nouvelle forme
à côté de l'ancienne, migrer les appelants par lots, supprimer l'ancienne quand plus personne
ne l'appelle. Chaque étape reste verte.

Présenter ensuite à l'utilisateur, avant d'écrire quoi que ce soit :

1. les **seams** retenus et ce qu'on y observe ;
2. la liste numérotée des tranches, avec pour chacune ce qu'elle livre et ce qui la bloque.

Demander : la granularité est-elle juste, les dépendances sont-elles réelles, faut-il fusionner
ou couper. Itérer jusqu'à l'accord. **Les seams validés ici font foi** : `tdd` n'écrit un test
qu'à un seam validé, et `code-review` relit le diff contre ce plan.

## Étape 4 — Écrire

Deux fichiers dans `.claude/specs/<feature-slug>/` :

```markdown
# Plan — <Feature>

Brief : <chemin ou lien> · Seams validés le <date>

## Seams

| Seam | Commande | Ce qu'on y observe |
|---|---|---|
| La page `/notes` servie | `npm run test:e2e` | le rendu réel, desktop et mobile |

## Tranches

### 1 — <titre court>
**Bloqué par :** aucune
**Livre :** le comportement bout-en-bout, du point de vue de l'utilisateur. Pas une liste de
couches à empiler.
**Seam :** <lequel, parmi ceux du tableau>
- [ ] critère d'acceptation vérifiable
- [ ] critère d'acceptation vérifiable

### 2 — <titre court>
**Bloqué par :** 1
…
```

```markdown
# Action requise — <Feature>

Les étapes que seul un humain peut faire, et pourquoi.

- [ ] **<action>** — <raison>   (compte tiers, clé d'API, variable d'env, DNS, accès…)
```

Quand il n'y en a aucune, l'écrire : `Aucune action humaine requise.`

## Garde-fous

- **Pas de chemins de fichiers ni d'extraits de code** dans le plan : ils périment en
  quelques heures. Exception : un extrait qui encode une décision plus précisément que la
  prose ne le ferait (machine à états, schéma, forme d'un type) — réduit à ce qui décide.
- **Pas de checklist de couches** (« backend : … / frontend : … »). Les conventions de stack
  sont dans `AGENTS.md` et `.claude/rules/`, qui sont la source de vérité ; les recopier ici,
  c'est en créer une deuxième, qui se désynchronise.
- **Pas de phases horizontales** (« phase 1 : le schéma, phase 2 : l'API, phase 3 : l'UI »).
  Rien n'est démontrable avant la fin, et les tests écrits en phase 1 vérifient un
  comportement imaginé.
- **Pas de tâches de test énumérées.** Le seam et les critères d'acceptation de la tranche
  disent où et quoi vérifier ; `tdd` fait le reste.

## Passer la main

Dire où le plan a été écrit, ce que contient `action-required.md`, et la suite : implémenter
**une tranche à la fois**, en repartant d'un contexte vierge entre chacune, puis relire le
diff contre ce plan avant de commiter.
