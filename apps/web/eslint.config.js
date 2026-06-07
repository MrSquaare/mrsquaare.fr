import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import rootConfig from "../../eslint.config.mjs";

export default defineConfig(
  { ignores: ["build", ".react-router", "styled-system"] },
  rootConfig,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/jsx-curly-brace-presence": ["error", { props: "always" }],
      "react/jsx-sort-props": ["error"],
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["meta", "links", "headers", "loader", "action"] },
      ],
    },
  },
);
