/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "../.eslintrc.js",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    formComponents: ["Form"],
    linkComponents: [
      { name: "Link", linkAttribute: "to" },
      { name: "NavLink", linkAttribute: "to" },
    ],
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
    "react/jsx-sort-props": ["warn"],
  },
  ignorePatterns: ["node_modules", "build"],
};
