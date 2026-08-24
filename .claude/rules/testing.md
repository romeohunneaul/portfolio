---
paths:
  - "src/**/*.{test,spec}.{ts,tsx}"
  - "e2e/**/*.ts"
  - "vitest.config.mts"
  - "playwright.config.ts"
---

# Conventions de test

## Principe

Les tests décrivent le **comportement observable**, jamais l'implémentation.
Un test qui casse lors d'un refactor sans changement de comportement est un
mauvais test.

## Unitaires (Vitest + Testing Library)

- Requêtes par rôle et par texte accessible (`getByRole`, `getByLabelText`).
  Éviter `querySelector`, les classes CSS et les `data-testid` sauf dernier recours.
- Un `describe` par composant, un `it` par comportement, formulé en français
  comme une phrase : `it("n'affiche pas de liste de tags quand il n'y en a pas")`.
- Tester aussi les cas vides et les absences (`queryBy...` + `not.toBeInTheDocument()`).

## End-to-end (Playwright)

- Les specs vivent dans `e2e/`, jamais dans `src/`.
- Tout parcours utilisateur significatif a un test e2e.
- Les deux projets `desktop` et `mobile` doivent passer : le responsive n'est
  pas vérifié à l'œil, il est testé.
- Utiliser les locators auto-attendants (`expect(locator).toBeVisible()`),
  jamais de `waitForTimeout`.

## Avant de commiter

`npm test && npm run typecheck` au minimum. La CI lance en plus lint et e2e.
