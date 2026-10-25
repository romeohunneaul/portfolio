# Plan — La note protolab

Brief : `portfolio-os/solution/protolab-showcase/brief.md` · Comportement de référence : le
tag `protolab-showcase/v1` de `portfolio-protos` (section « For integration » de son
`context.md`) · Seams retenus le 2026-10-25 (mode one-shot, tâche cadrée par la session
racine du Product OS)

## Seams

| Seam | Commande | Ce qu'on y observe |
|---|---|---|
| La page `/sandbox/protolab` servie | `npm run test:e2e` | le rendu réel, desktop et mobile : la grille ou les blocs, les points qui s'ouvrent |
| Les stories des pièces copiées de Notebook | `npm test` | chaque état visible, et l'a11y en mode `error` |
| Le navigateur à 375, 800 et 1024 px | à la main, une fois | les comportements de « What the proto shows, to keep » |

## Tranches

### 1 — Les pièces de Notebook qui manquent au site
**Bloqué par :** aucune
**Livre :** `Pin`, `DrawnBox` et `Tag` dans la copie du design system du site, à l'identique
de Notebook `main`, avec leurs stories.
**Seam :** les stories
- [ ] chaque état des trois pièces a sa story, et les stories passent l'a11y

### 2 — La note lisible, en brouillon
**Bloqué par :** aucune
**Livre :** une note `draft: true` qu'on ouvre à `/sandbox/protolab` hors de la production,
absente de la page d'accueil et de l'assistant. Le récit (intro, besoin du PM, conclusion,
lien vers le repo) se lit sans JavaScript.
**Seam :** la page servie
- [ ] la note répond à son URL en dev et en preview, 404 en production
- [ ] la page d'accueil ne la liste pas

### 3 — Le parcours en grille
**Bloqué par :** 2
**Livre :** la grille critères × outils, protolab en dernière colonne.
**Seam :** la page servie
- [ ] la grille se remplit colonne par colonne une fois visible ; sans JS, elle est visible d'emblée
- [ ] quand la grille défile, protolab reste épinglé à droite
- [ ] sous `sm`, un bloc par outil, avec seulement les critères qu'il manque

### 4 — Ce que ça garde, ce que ça ajoute
**Bloqué par :** 1, 2
**Livre :** la page annotée et sa légende, avec la visite à partir de `lg` et l'accordéon en dessous.
**Seam :** la page servie
- [ ] à partir de `lg` : la page à côté de la légende, avec les repères ; la visite ne joue qu'une fois, seulement visible, jamais en mouvement réduit, et s'arrête au premier clic
- [ ] sous `lg` : un accordéon, la page s'ouvre dans l'item qu'elle illustre, sans repères, et l'item ouvert remonte en haut ; le point des versions montre les deux pages à mi-taille
- [ ] chaque point estompe le reste de la page et encadre sa région ; la liste garde une hauteur fixe
- [ ] le point des scénarios charge le pire cas, le quitter remet les données typiques
- [ ] le point du designer montre les lignes en données typiques, sans les sélecteurs Version et Data, et rend le choix du visiteur en sortant ; ses notes sont masquées sous `sm`
