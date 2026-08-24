@AGENTS.md

# Portfolio — site perso & sandbox publique

Site vitrine de mes projets (focus **IA appliquée**) et sandbox publique où je
publie réflexions et trouvailles.

**Thème éditorial :** comment l'IA résout des problèmes concrets et offre de
nouvelles formes d'expériences et d'interactions au travail. Tout arbitrage de
contenu se tranche avec cette question.

Le savoir *sur* ce projet (notes, plan d'action, problématiques des case
studies) vit dans le brain : `~/Desktop/Projects/_brain/projects/portfolio/`.
Ce repo ne contient que le site.

## Stack

| Brique | Choix |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (tokens en CSS variables) |
| Motion | GSAP + `@gsap/react` (`useGSAP`) |
| Contenu | MDX via content-collections (`content/notes/`) |
| Tests unitaires | Vitest + Testing Library |
| Tests e2e | Playwright (projets `desktop` + `mobile`) |
| Déploiement | Vercel (preview par PR, prod sur `main`) |

⚠️ **Next.js 16 diffère des données d'entraînement des modèles.** Lire
`node_modules/next/dist/docs/` avant d'écrire du code Next spécifique
(cf. bloc `nextjs-agent-rules` dans `AGENTS.md`).

## Commandes

```bash
npm run dev         # serveur de dev
npm run build       # build de prod (compile aussi le contenu MDX)
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # vitest (unitaires)
npm run test:e2e    # playwright (desktop + mobile)
```

## Conventions

- **Composants** : `src/components/`, fichiers en `kebab-case`, export nommé
  (pas de `default`). Le test vit à côté : `note-card.tsx` + `note-card.test.tsx`.
- **Server Components par défaut.** `"use client"` seulement quand c'est
  nécessaire (GSAP, interactivité) — et le plus bas possible dans l'arbre.
- **GSAP** : toujours via `useGSAP()` de `@gsap/react` (nettoyage automatique),
  jamais de `gsap.to()` dans un `useEffect` nu. Respecter
  `prefers-reduced-motion` sur toute animation non essentielle.
- **Contenu** : une note = un `.mdx` dans `content/notes/`, frontmatter validé
  par le schéma Zod de `content-collections.ts`. Un frontmatter invalide casse
  le build — c'est voulu. Éditable depuis Obsidian, publié par `git push`.
- **Tests** : tout composant avec de la logique a un test unitaire. Tout
  parcours utilisateur a un test e2e. Les tests décrivent le comportement
  observable, pas l'implémentation.
- **Responsive** : mobile-first, vérifié par le projet Playwright `mobile`.

## Skills

- `react-best-practices`, `web-design-guidelines`, `composition-patterns`
  (vercel-labs) — à installer dans `.claude/skills/` et à appliquer sur tout
  code React/UI.
- Skills de workflow (mattpocock) : installées en plugin, invoquées à la main.
