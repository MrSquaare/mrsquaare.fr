import { RemixThemeConfig } from "./types";

export const remixThemeScript = <Config extends RemixThemeConfig>(
  config: Config,
) => {
  const fn = (defaultLight: string, defaultDark: string) => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const preferredTheme = prefersDark ? defaultDark : defaultLight;
    const classList = document.documentElement.classList;

    if (!classList.length) {
      classList.add(preferredTheme);
    }
  };

  return `(${fn.toString()})(
    ${JSON.stringify(config.defaultLight)},
    ${JSON.stringify(config.defaultDark)}
  )`;
};
