import config from "@mrsquaare-fr/eslint-config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores(["apps/", "packages/"]), ...config]);
