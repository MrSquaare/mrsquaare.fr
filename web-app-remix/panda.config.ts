import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@mrsquaare/sandwich-ui/panda-preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  importMap: "styled-system",
  outdir: "./src/styled-system",
});
