import js from "@eslint/js";
import importX from "eslint-plugin-import-x";
import prettier from "eslint-plugin-prettier/recommended";
import ts from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"] },
  js.configs.recommended,
  ...ts.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  prettier,
  {
    rules: {
      "import-x/no-unresolved": "off",
      "import-x/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },
];
