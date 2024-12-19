import { RemixThemeConfig } from "../lib/theme/types";

export const defaultLight = "light" as const;
export const defaultDark = "dark" as const;
export const themes = [defaultLight, defaultDark] as const;

export const remixThemeConfig: RemixThemeConfig = {
  themes,
  defaultLight,
  defaultDark,
};
