// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Code généré par content-collections au build : pas à linter.
    ".content-collections/**",
    // design-sync (Claude Design) : scripts copiés, sorties de build, référence Storybook.
    ".ds-sync/**",
    "ds-bundle/**",
    "dist/**",
    ".design-sync/sb-reference/**",
    ".design-sync/.cache/**",
  ]),
  ...storybook.configs["flat/recommended"]
]);

export default eslintConfig;
