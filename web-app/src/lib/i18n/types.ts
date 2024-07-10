export type RemixI18nConfig<
  Languages extends readonly string[] = readonly string[],
  Namespaces extends readonly string[] = readonly string[],
> = {
  languages: Languages;
  defaultLanguage: Languages[number];
  namespaces: Namespaces;
  defaultNamespace: Namespaces[number];
};

export type RemixI18nLoaderData = {
  lang: string;
};
