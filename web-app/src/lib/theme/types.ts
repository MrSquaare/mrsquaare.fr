export type RemixThemeConfig<
  Themes extends readonly string[] = readonly string[],
> = {
  themes: Themes;
  defaultLight: Themes[number];
  defaultDark: Themes[number];
};

export type RemixThemeActionData = {
  theme: string;
};

export type RemixThemeLoaderData = {
  theme: string;
};
