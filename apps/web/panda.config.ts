import { defineConfig } from "@pandacss/dev";
import sandwichUIPlugin from "@sandwich-ui/core/plugin";
import sandwichUIPreset from "@sandwich-ui/core/preset";

export default defineConfig({
  importMap: "@sandwich-ui/styled-system",
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  plugins: [sandwichUIPlugin],
  prefix: "sw",
  preflight: true,
  presets: ["@pandacss/dev/presets", sandwichUIPreset],
  staticCss: {
    recipes: "*",
  },
});
