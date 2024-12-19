import { createContext } from "react";

import { RemixThemeConfig } from "./types";

export type RemixThemeContextType = {
  config: RemixThemeConfig;
  theme?: string;
  preferredTheme?: string;
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
};

export const RemixThemeContext = createContext<
  RemixThemeContextType | undefined
>(undefined);
