/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  env: {
    es2022: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": "off",
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
  },
  overrides: [
    {
      files: ["{.*rc,*.config}.{js,cjs,mjs,ts}"],
      env: {
        node: true,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-commonjs": "off",
        "import/no-nodejs-modules": "off",
      },
    },
  ],
};
