import { FC } from "react";

import { useThemeContext } from "./useThemeContext";

export const RemixThemeScript: FC = () => {
  const context = useThemeContext();

  const __html = `(function(config) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const preferredTheme = prefersDark ? config.defaultDark : config.defaultLight;
    const classList = document.documentElement.classList;

    if (!classList.length) {
      classList.add(preferredTheme);
    }
  })(${JSON.stringify(context.config)})`;

  return <script dangerouslySetInnerHTML={{ __html }} />;
};
