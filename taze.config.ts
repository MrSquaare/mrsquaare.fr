import { defineConfig } from "taze";

export default defineConfig({
  recursive: true,
  ignorePaths: ["./apps/mobile"],
  exclude: ["@sandwich-ui/styled-system"],
});
