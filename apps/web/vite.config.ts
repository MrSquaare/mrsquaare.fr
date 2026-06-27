import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true, target: "react" }),
    viteReact(),
    paraglideVitePlugin({
      outdir: "./src/paraglide",
      project: "./project.inlang",
      strategy: ["url", "cookie"],
      urlPatterns: [
        {
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["en", "/:path(.*)?"],
          ],
          pattern: "/:path(.*)?",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      react: resolve(
        fileURLToPath(new URL("./node_modules/react", import.meta.url)),
      ),
      "react-dom": resolve(
        fileURLToPath(new URL("./node_modules/react-dom", import.meta.url)),
      ),
    },
    tsconfigPaths: true,
  },
});
