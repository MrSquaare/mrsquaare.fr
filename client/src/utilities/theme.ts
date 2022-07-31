import { DEFAULT_THEME } from "../constants";

const THEME_STORE_KEY = "theme";

export const getPreferredTheme = (): string => {
  const theme = localStorage.getItem(THEME_STORE_KEY);

  if (theme) {
    return theme;
  }

  return DEFAULT_THEME;
};

export const setPreferredTheme = (theme: string): void => {
  localStorage.setItem(THEME_STORE_KEY, theme);
};
