import acceptLanguage from "accept-language";
import { type LoaderFunctionArgs, redirect } from "react-router";

import type { I18nConfig } from "./types";

const getLanguageFromPath = (config: I18nConfig, request: Request) => {
  const url = new URL(request.url);

  for (const lang of config.languages) {
    if (url.pathname.startsWith(`/${lang}`)) {
      return lang;
    }
  }
};

const getPreferredLanguage = (config: I18nConfig, request: Request) => {
  const parser = acceptLanguage.create();

  parser.languages([...config.languages]);

  return parser.get(request.headers.get("Accept-Language"));
};

export type I18nLoaderData = {
  lang: string;
};

export const i18nLoader = async (
  config: I18nConfig,
  args: LoaderFunctionArgs,
): Promise<I18nLoaderData> => {
  const lang =
    getLanguageFromPath(config, args.request) ||
    getPreferredLanguage(config, args.request) ||
    config.defaultLanguage;

  if (args.params.lang !== lang) {
    const url = new URL(args.request.url);

    const newPath =
      url.pathname.replace(`/${args.params.lang ?? ""}`, `/${lang}`) +
      url.search +
      url.hash;

    throw redirect(newPath);
  }

  return { lang };
};
