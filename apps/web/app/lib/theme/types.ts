export type ThemeConfig<Themes extends readonly string[] = readonly string[]> =
  {
    themes: Themes;
    defaultLight: Themes[number];
    defaultDark: Themes[number];
  };
