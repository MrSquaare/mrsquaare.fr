import { createContext, useContext } from "react";

export type ThemeConfig<Themes extends readonly string[] = readonly string[]> =
  {
    defaultDark: Themes[number];
    defaultLight: Themes[number];
    themes: Themes;
  };

export type ThemeContextType = {
  config: ThemeConfig;
  preferredTheme?: string;
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
  theme?: string;
};

const listeners = new Set<() => void>();

export const localStorageStore = {
  getServerSnapshot: (): string => "",
  getSnapshot: (): string => {
    if (typeof window === "undefined") return "";

    return localStorage.getItem("theme") ?? "";
  },
  subscribe: (cb: () => void) => {
    if (typeof window === "undefined") return () => {};

    window.addEventListener("storage", cb);
    listeners.add(cb);

    return () => {
      window.removeEventListener("storage", cb);
      listeners.delete(cb);
    };
  },
};

export function setStoredTheme(theme: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem("theme", theme);
  listeners.forEach((cb) => cb());
}

export const mediaStore = {
  getServerSnapshot: (): boolean => false,
  getSnapshot: (): boolean => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
  subscribe: (cb: () => void) => {
    if (typeof window === "undefined") return () => {};

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", cb);

    return () => mediaQuery.removeEventListener("change", cb);
  },
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
