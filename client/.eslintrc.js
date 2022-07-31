module.exports = {
  extends: [
    "../.eslintrc.js",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "plugin:tailwindcss/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-curly-brace-presence": ["warn", { props: "always" }],
    "react/jsx-sort-props": ["warn"],
    "tailwindcss/no-custom-classname": ["off"],
  },
};
