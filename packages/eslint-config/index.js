/* eslint-disable import-x/no-named-as-default */
/* eslint-disable import-x/no-named-as-default-member */
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importX from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import ts from "typescript-eslint";

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
  js.configs.recommended,
  ts.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  perfectionist.configs["recommended-natural"],
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
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
