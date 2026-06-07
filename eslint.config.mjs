import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier/recommended";
import * as ts from "typescript-eslint";

const VARIABLE_SELECTOR = {
  selector:
    ":is(VariableDeclaration, ExpressionStatement[expression.type='AssignmentExpression'])",
};
const CALL_SELECTOR = {
  selector: "ExpressionStatement[expression.type='CallExpression']",
};
const CONTROL_FLOW_SELECTOR = {
  selector:
    ":is(BreakStatement, ContinueStatement, ReturnStatement, ThrowStatement)",
};

export default defineConfig(
  { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"] },
  js.configs.recommended,
  ts.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  prettier,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    settings: {
      "import/resolver": {
        node: true,
        typescript: true,
      },
    },
    rules: {
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", next: "*", prev: "import" },
        { blankLine: "always", next: "export", prev: "*" },
        { blankLine: "always", next: "*", prev: "export" },
        { blankLine: "always", next: "block-like", prev: "*" },
        { blankLine: "always", next: "*", prev: "block-like" },
        { blankLine: "always", next: CONTROL_FLOW_SELECTOR, prev: "*" },
        { blankLine: "always", next: CALL_SELECTOR, prev: VARIABLE_SELECTOR },
        { blankLine: "always", next: VARIABLE_SELECTOR, prev: CALL_SELECTOR },
        { blankLine: "any", next: "import", prev: "import" },
        { blankLine: "any", next: "export", prev: "export" },
        { blankLine: "any", next: VARIABLE_SELECTOR, prev: VARIABLE_SELECTOR },
        { blankLine: "any", next: CALL_SELECTOR, prev: CALL_SELECTOR },
      ],
    },
  },
);
