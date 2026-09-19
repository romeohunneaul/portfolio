---
name: publish-brain
description: >
  Publie du contenu du brain vers le corpus du chat du portfolio (Ask / ⌘K),
  avec revue de confidentialité, allowlist, denylist et diff à valider.
  Utiliser quand François dit « publie cette note vers le chat », « expose X
  au chat / au corpus », « ajoute cette synthèse à Ask », « brain sync », ou
  donne un fichier du brain à rendre interrogeable sur le site.
---

# Publier du contenu du brain vers le chat du portfolio

Règle d'or : **tout ce qui entre dans le corpus est public** (prompt du chat
+ repo GitHub public). Le pipeline bloque, il ne masque jamais en silence.

Chemins :
- Brain (privé) : `~/Desktop/Projects/_brain/`
- Allowlist (publique) : `scripts/brain-allowlist.json` — chemins relatifs au brain
- Denylist (CONFIDENTIELLE) : `~/Desktop/Projects/_brain/projects/portfolio/brain-denylist.json`
- Sortie commitée : `src/data/brain-extract.json` → injectée dans le prompt par `src/lib/ask/instructions.ts`

## Déroulé

1. **Lire le fichier candidat en entier.** Jamais de publication d'un fichier non lu.

2. **Revue de confidentialité**, ligne par ligne, contre cette checklist :
   - noms de personnes (interviewés, salariés, contacts) — les initiales comptent
   - clients ou prospects non annoncés publiquement par François
   - montants, budgets, marges, MRR/ARR, effectifs précis
   - verbatims d'entretiens, même anonymisés (recoupables)
   - URLs internes (Notion, Drive), noms de repos privés, e-mails, téléphones
   - roadmaps, arbitrages ou incidents propres à un client
   Signaler chaque occurrence avec fichier:ligne et proposer : reformuler,
   entourer de `<!-- private --> … <!-- /private -->`, ou renoncer.

3. **Compléter la denylist** : tout nouveau nom/motif sensible rencontré est
   ajouté à `brain-denylist.json` (dans le brain, jamais dans le repo public),
   même si le fichier n'est finalement pas publié.

4. **Attendre la validation explicite de François** sur la version à publier.
   Pas de publication sur un « ok » donné avant la revue.

5. Ajouter le chemin (relatif au brain) dans `scripts/brain-allowlist.json`,
   puis lancer :
   ```bash
   npm run brain:sync
   ```
   - Échec = occurrence sensible : retourner à l'étape 2, ne pas affaiblir la
     denylist pour « faire passer ».
   - Succès : `src/data/brain-extract.json` réécrit.

6. **Montrer `git diff src/data/brain-extract.json`** à François — c'est la
   dernière relecture avant publication.

7. Commit (message `content: expose <sujet> to the chat corpus`), push, PR.
   La preview Vercel permet de tester la question dans ⌘K avant merge.

## Retirer un contenu publié

Retirer la ligne de l'allowlist → `npm run brain:sync` → diff (suppression) →
commit + push. Rappeler que ce qui a été en ligne a pu être archivé par des tiers.
