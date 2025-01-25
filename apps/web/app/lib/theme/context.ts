import { createContext } from "react";

import type { ThemeConfig } from "./types";

export type ThemeContextType = {
  config: ThemeConfig;
  theme?: string;
  preferredTheme?: string;
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
