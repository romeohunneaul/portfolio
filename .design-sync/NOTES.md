# design-sync notes — Notebook (portfolio)

The DS is not a package: it is `src/components/ui/` inside the Next.js app. Everything below exists to make
an app folder look like a DS package to the converter.

## Setup (why the odd pieces exist)
- [GENERAL] No dist -> `.design-sync/entry.ts` is the entry (barrel of `src/components/ui/*`, set as `cfg.entry`).
  Regenerate it when a component is added to `ui/`.
- [GENERAL] The storybook shape reads public exports from a `.d.ts` tree via `package.json` `types`.
  `cfg.buildCmd` (`tsc -p .design-sync/tsconfig.types.json`) emits it into `dist/types/` (gitignored);
  `package.json` `"types"` points at `dist/types/.design-sync/entry.d.ts`. Run buildCmd before every build.
- [GENERAL] Bundle threw `process is not defined` at load -> next/link and next/image read `process.env.__NEXT_*`,
  the converter only defines NODE_ENV -> `.design-sync/process-shim.ts`, imported FIRST in entry.ts.
- [GENERAL] Labels rendered sans instead of Space Mono in both Storybook and previews (compare can't see it) ->
  `--font-mono: var(--font-space-mono), ...` voids itself when next/font's var is absent -> tokens now use
  `var(--font-space-mono, "Space Mono")` (same for --font-sans). Fonts come from Google Fonts (preview-head.html).
- `.storybook/preview` decorators don't bundle (`@import "tailwindcss"` in globals.css). Harmless: they only paint the
  paper background and set `data-theme`; previews render on white. Framing difference, not a mismatch.
- `Sections/*` stories are page assemblies, excluded via `titleMap: null`.

## Known warnings (triaged)
- [TOKENS_MISSING] --sdm-tbg, --streamdown-caret (Ask chat, not a DS component), --tw (Tailwind internal),
  --font-schibsted / --font-space-mono (next/font, app-only; tokens fall back to the family names).
- [CSS_ASSETS] ../grain.svg (paper grain) 404s after upload: designs get flat paper, no grain.

## Owned previews
- ThemeToggle: Night is themed by a Storybook toolbar global previews can't read -> owned preview sets
  `html[data-theme=dark]` in a layout effect (restored on unmount); `cardMode: "single"`, primaryStory Day, so
  the dark attribute never bleeds onto the Day cell in the product card.
- LogoSquare: stories use `/logos/*.png` from `public/`, which Storybook serves and Claude Design doesn't ->
  owned preview imports the pngs as data URLs (`storyImports.loaders: {".png": "dataurl"}`); next/image skips its
  loader for data: sources. In designs, prefer initials (no src) - `/logos/*` paths won't resolve there.
- [RENDER_THIN] Logo: SVG-only, no text - the heuristic flags it; graded `match` visually on all 5 stories.
- Storybook reference is built with `npx storybook build -c .storybook -o .design-sync/sb-reference` - rebuild it with
  the DS whenever tokens/components/stories change (`[REFERENCE_STALE?]` means you forgot).
- Desktop is iCloud-synced: iCloud sometimes duplicates generated dirs (`ds-bundle/components 2`). Delete `* 2` dirs in
  ds-bundle/ before any upload - they are conflict copies, never real output.

## Re-sync risks
- `entry.ts` is a hand-kept barrel: a new `src/components/ui/<x>.tsx` is invisible to the sync until added there
  (then re-run buildCmd).
- `process-shim.ts` papers over next/link + next/image expecting Next's env. A Next upgrade that reads new
  `process.*` fields at load could break the bundle again (symptom: `[BUNDLE_EXPORT]` 14/14 + `process is not defined`).
- Owned previews tied to story content: ThemeToggle (mirrors Day/Night), LogoSquare (hard-codes taster/artefact pngs).
  Edit them if those stories change.
- Tailwind CSS is scraped from the Storybook build (`[CSS_FROM_STORYBOOK]`): only classes used somewhere in the repo
  exist. conventions.md tells the design agent so; keep its example classes verified against `_ds_bundle.css`.
- Night palette lives in `src/styles/tokens/colors.css` (`:root[data-theme="dark"]`); only root-level theming works.
- Fonts come from Google Fonts at runtime (`[FONT_REMOTE]`), not shipped files.
