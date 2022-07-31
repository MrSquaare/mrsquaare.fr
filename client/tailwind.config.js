const commonTheme = {
  primary: "#3B82F6",
  "primary-content": "#FAFAFA",
  secondary: "#D6D3D1",
  "secondary-content": "#FAFAFA",
  accent: "#10B981",
  "accent-content": "#FAFAFA",
  info: "#3ABFF8",
  "info-content": "#FAFAFA",
  success: "#22C55E",
  "success-content": "#FAFAFA",
  warning: "#EAB308",
  "warning-content": "#FAFAFA",
  error: "#EF4444",
  "error-content": "#FAFAFA",
  "--animation-btn": "0",
};

module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /./,
    },
  ],
  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        dark: "var(--dark)",
      },
    },
  },
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          ...commonTheme,
          neutral: "#171717",
          "neutral-content": "#FAFAFA",
          "base-100": "#FAFAFA",
          "base-200": "#eeeeee",
          "base-300": "#e1e1e1",
          "base-content": "#171717",
          "--dark": "#171717",
        },
        dark: {
          ...commonTheme,
          neutral: "#FAFAFA",
          "neutral-content": "#171717",
          "base-100": "#171717",
          "base-200": "#262626",
          "base-300": "#404040",
          "base-content": "#FAFAFA",
          "--dark": "#262626",
        },
      },
    ],
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
};
