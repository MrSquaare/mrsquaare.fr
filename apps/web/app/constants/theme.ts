import type { ThemeConfig } from "../lib/theme/types";

export const defaultLight = "light" as const;
export const defaultDark = "dark" as const;
export const themes = [defaultLight, defaultDark] as const;

export const themeConfig: ThemeConfig = {
  themes,
  defaultLight,
  defaultDark,
};
