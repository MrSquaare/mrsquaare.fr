module.exports = {
  extends: [
    "../.eslintrc.js",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/core-web-vitals",
    "plugin:tailwindcss/recommended",
  ],
  root: true,
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
    "react/jsx-sort-props": ["warn"],
    "react/prop-types": ["off"],
    "tailwindcss/no-custom-classname": ["off"],
  },
};
