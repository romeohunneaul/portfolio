---
name: create-brief
description: Consigne un brief produit — le quoi et le pourquoi d'une feature ou d'un projet — dans le brain, à partir de décisions déjà prises. À utiliser quand l'utilisateur dit "écris le brief de X", "rédige le PRD", "on a besoin d'un doc d'alignement", ou quand une session de cadrage doit être consignée avant que le contexte se ferme. Produit un doc fonctionnel lisible par les humains comme par les agents ; le découpage technique relève de `plan`.
---

# Create Brief

Consigne ce qui a **déjà** été décidé. Le brief est un **relevé de décisions**, pas l'endroit
où l'on décide : il existe parce que les fenêtres de contexte se ferment, et il est ce qui
leur survit.

> **Toute affirmation du brief que tu ne peux pas rattacher à une réponse de l'utilisateur ou
> à un document source est un défaut.**

## Quand il se justifie

Un brief coûte une passe de synthèse. Il la rembourse quand le travail dépasse une session,
ou quand d'autres personnes doivent s'aligner dessus. Pour un changement qui tient en une
session et que l'utilisateur est seul à porter, aller directement à `plan`.

## Étape 1 — Rassembler la matière

Lire avant de demander. Trouver les **faits** est ton travail, jamais celui de l'utilisateur.

1. Le **brain du projet** (section `## Brain` du `CLAUDE.md`) : `syntheses/` (research
   terrain, entretiens, tests utilisateurs), `notes/`, briefs déjà écrits.
2. La **conversation en cours** : ce qui vient d'être décidé y est déjà.
3. Le **repo** : `CLAUDE.md`, `AGENTS.md`, et le code existant si la feature s'y greffe.

## Étape 2 — Faire trancher ce qui reste ouvert

Appeler la skill `grilling`. Amorcer son arbre avec les branches qu'un brief doit avoir
tranchées, en écartant celles que l'étape 1 a déjà réglées :

- le job utilisateur visé, et pourquoi maintenant
- les profils concernés, et ce qui les distingue
- le scope, et surtout le **hors-scope**
- les contraintes : réglementaires, techniques, organisationnelles
- la trajectoire : ce qu'on livre d'abord, ce qui vient après
- ce qui dira que ça marche

La rédaction commence quand la frontière est vide.

## Étape 3 — Écrire

**Emplacement** : le brain du projet, `briefs/<feature-slug>.md` (section `## Brain` du
`CLAUDE.md` ; si elle manque, la demander une fois). Le brief est **durable** — il survit à
la feature, contrairement au plan et aux tickets.

Les sept sections du gabarit sont **toutes attendues**. Quand l'une ne s'applique pas, écrire
`Néant` et passer : un « néant » assumé est une information, une section escamotée est un trou.

```markdown
# <Feature / sujet>

> Statut : brouillon | validé — <date> — sources : <liens>

## 1. Contexte & problème

**Utilisateurs concernés** — qui fait quoi. Distinguer les profils quand il y en a
plusieurs, et leur familiarité avec l'outil quand elle pèse.

**Situation actuelle** — ce qui se passe aujourd'hui : outils, workflow, contournements.
Noms de sites et d'utilisateurs réels, verbatims quand ils existent.

**Frictions** — les points de douleur, chacun rattaché à une observation.

## 2. Objectif & principes directeurs

**Objectif** — l'outcome utilisateur visé, pas la feature.

**Principes directeurs** — les règles que la solution doit respecter (« zéro configuration »,
« aucune saisie perdue »). Ce sont elles qui trancheront les arbitrages en aval : sans elles,
chaque décision d'implémentation remonte jusqu'à toi.

**Ce qui dira que ça marche** — chiffré si possible, qualitatif sinon.

## 3. Scope

**Dans le scope** — ce que la feature couvre.

**Hors scope** — ce qu'elle ne couvre pas alors que la question se pose. La section la plus
utile du document : ce qu'on a refusé est ce qu'on oublie le plus vite.

## 4. Approche

**Trajectoire** — ce qui est livré d'abord, ce qui suit, et les limites connues du premier
jet, documentées plutôt que découvertes.

**Axes de solution** — les grands blocs fonctionnels, quelques lignes chacun. Le quoi.

## 5. Scénarios

Trois au moins, en séquences numérotées de 5 à 10 lignes. Chacun : profil, contexte de
départ, puis les étapes. Ils servent de base commune à la tech, au design et au métier.

### Scénario A — <titre>
**Profil :** … **Contexte :** …
1. …

## 6. Points ouverts

Ce qui reste à trancher, formulé en questions précises. Écrit ici plutôt que deviné ailleurs.

## 7. Sources

Liens vers la research, les transcripts, les benchmarks, les conversations consignées.
```

## Patterns d'écriture

**Ancrage** — noms d'utilisateurs, de sites, d'outils réels. Un brief tenu par des personas
abstraits ne résiste pas à la première contestation.

**Verbatims** — quand la research en fournit, les citer :

> *« Pour localiser une paillette, les équipes utilisent la feuille de paillasse plutôt que
> le logiciel. »*

**Tableau comparatif** — quand plusieurs sites ou profils ont été observés, les comparer sur
des colonnes communes (volume, déclencheur, mode actuel, friction) fait apparaître les
patterns. Un seul profil : pas de tableau.

**Trous** — ne rien inventer pour remplir. Écrire `> ⚠️ À confirmer : <question précise>`.

**Ton** — français, direct, concret. Le vocabulaire est celui du métier de l'utilisateur.

**Longueur** — 3 à 8 pages. Au-delà, le brief a absorbé du découpage technique : il repart
vers `plan`.

## Passer la main

Dire où le brief a été écrit, et ce qui reste ouvert. Quand il est validé, la suite est
`plan`, qui le découpe en tranches implémentables.
