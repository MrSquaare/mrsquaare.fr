import type { FC } from "react";

import { useThemeContext } from "./useThemeContext";

declare global {
  interface Window {
    __theme: string;
  }
}

export const ThemeScript: FC = () => {
  const { theme, config } = useThemeContext();

  const __html = `(function(theme, config) {
    window.__theme = theme;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const preferredTheme = prefersDark ? config.defaultDark : config.defaultLight;
    const classList = document.documentElement.classList;

    if (!theme) {
      classList.add(preferredTheme);
    }
  })(${JSON.stringify(theme)}, ${JSON.stringify(config)})`;

  return <script dangerouslySetInnerHTML={{ __html }} />;
};
