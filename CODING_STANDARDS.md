# Standards de code

La source de vérité des conventions de ce dépôt est le dossier
[`.claude/rules/`](.claude/rules/). Chaque fichier y couvre un domaine et
déclare les chemins auxquels il s'applique :

| Règle | Portée |
|---|---|
| [`react.md`](.claude/rules/react.md) | Composants, frontière Server/Client, composition |
| [`motion.md`](.claude/rules/motion.md) | GSAP : cycle de vie, performance, `prefers-reduced-motion` |
| [`testing.md`](.claude/rules/testing.md) | Tests unitaires (Vitest) et end-to-end (Playwright) |
| [`content.md`](.claude/rules/content.md) | Notes MDX, schéma de contenu, thème éditorial |

Les règles toujours valables (quel que soit le fichier touché) sont dans
[`CLAUDE.md`](CLAUDE.md).

**Pourquoi ce fichier existe alors qu'il ne contient rien.** Les outils de
review — humains comme agents — cherchent par convention un
`CODING_STANDARDS.md` à la racine. Il sert de point d'entrée et pointe vers le
contenu réel, plutôt que de le dupliquer : deux copies de standards divergent
toujours, et on ne sait plus laquelle fait foi.
