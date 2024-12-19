import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

import rootConfig from "../../eslint.config.mjs";

export default [
  { ignores: ["build"] },
  ...rootConfig,
  jsxA11y.flatConfigs.recommended,
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
      "react/jsx-sort-props": ["warn"],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["meta", "links", "headers", "loader", "action"] },
      ],
    },
  },
];
