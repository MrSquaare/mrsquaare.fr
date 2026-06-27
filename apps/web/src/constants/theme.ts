import type { ThemeConfig } from "../lib/theme/context";

export const defaultLight = "light" as const;
export const defaultDark = "dark" as const;
export const themes = [defaultLight, defaultDark] as const;

export const themeConfig: ThemeConfig = {
  defaultDark,
  defaultLight,
  themes,
};
