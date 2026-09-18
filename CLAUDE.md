@AGENTS.md

# Portfolio — site perso & sandbox publique

Site vitrine de mes projets (focus **IA appliquée**) et sandbox publique où je
publie réflexions et trouvailles.

**Thème éditorial :** comment l'IA résout des problèmes concrets et offre de
nouvelles formes d'expériences et d'interactions au travail. Tout arbitrage de
contenu se tranche avec cette question.

## Brain

Le savoir *sur* ce projet (plan d'action, problématiques des case studies, notes de
cadrage) vit hors de ce dépôt.

- **Dossier du projet dans le brain** : `~/Desktop/Projects/_brain/projects/portfolio/`
- **Synthèses terrain** : `syntheses/` · **Briefs** : `briefs/` · **Notes** : `notes/`

Le flow de dev (quelle skill lancer quand) : `~/Desktop/Projects/_brain/skills-manager/FLOW.md`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP ·
MDX via content-collections · Storybook 10 (`@storybook/nextjs-vite`) ·
Vitest · Playwright · `mcp-handler` (serveur MCP sur `/api/mcp`) · déploiement Vercel.

## Architecture du contenu

| Où | Quoi |
|---|---|
| `src/data/profile.ts` | bio, liens, parcours, formation, compétences, outils |
| `src/data/projects.ts` | problèmes traités (clients en coulisse, jamais de chiffres clients) |
| `src/data/trail.ts` | traces trail + ski (`public/gpx/<slug>.gpx` ⇄ une entrée `routes`, photos dans `public/photos/<slug>/`), courses et index UTMB (MCP seulement) |
| `src/data/reading.ts` | livres et articles marquants + intro |
| `src/data/music.ts` | playlist Spotify du moment (id → embed)
| `content/notes/*.mdx` | notes du labo |
| `src/styles/tokens/*.css` | design system « Notebook » (source : projet Claude Design, cf. brain) |

Ces fichiers alimentent **les pages et le serveur MCP**. Ajouter une trace =
déposer le `.gpx` + une ligne dans `routes`. Ajouter un article = une ligne.

⚠️ **Next.js 16 diffère des données d'entraînement des modèles.** Lire
`node_modules/next/dist/docs/` avant d'écrire du code Next spécifique
(cf. bloc `nextjs-agent-rules` dans `AGENTS.md`).

## Commandes

```bash
npm run dev         # serveur de dev
npm run build       # build de prod (compile aussi le contenu MDX)
npm run typecheck   # next typegen && tsc --noEmit
npm run lint        # eslint
npm test            # vitest : unitaires (jsdom) + stories (Chromium headless, a11y)
npm run test:e2e    # playwright (desktop + mobile)
npm run storybook   # design system sur :6006

```

## Règles permanentes

- **Ne jamais commiter sans que `npm test` et `npm run typecheck` passent.**
- Le site doit rester utilisable sans JavaScript pour son contenu textuel :
  le motion enrichit, il ne conditionne pas la lecture.
- Mobile-first. Le responsive se vérifie par le projet Playwright `mobile`,
  pas à l'œil.
- Pas de dépendance ajoutée sans raison explicite : ce dépôt est aussi un
  terrain d'apprentissage, chaque brique doit être justifiable.

## Conventions détaillées

Elles vivent dans `.claude/rules/`, scopées par chemin — chargées seulement
quand les fichiers concernés sont touchés :

| Fichier | Portée |
|---|---|
| `react.md` | `src/**/*.{ts,tsx}` — composants, Server/Client, composition |
| `motion.md` | `src/**/*.tsx`, `*.css` — GSAP, performance, accessibilité |
| `testing.md` | tests unitaires et e2e |
| `content.md` | `content/**/*.mdx` — notes, schéma, thème éditorial |
