/* eslint-disable import-x/no-named-as-default */
import config from "@mrsquaare-fr/eslint-config";
import tanstackRouter from "@tanstack/eslint-plugin-router";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig(
  globalIgnores([
    "dist/",
    "styled-system/",
    "src/routeTree.gen.ts",
    "src/paraglide/",
  ]),
  config,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.recommended,
  tanstackRouter.configs["flat/recommended"],
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "import-x/namespace": [
        "error",
        {
          allowComputed: true,
        },
      ],
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["Route"] },
      ],
      "react/jsx-curly-brace-presence": ["error", { props: "always" }],
      "react/jsx-sort-props": ["error"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
);
