import { LoaderFunctionArgs } from "@remix-run/node";
import acceptLanguage from "accept-language";

import { RemixI18nConfig } from "./types";

const getLanguageFromPath = (config: RemixI18nConfig, request: Request) => {
  const url = new URL(request.url);

  for (const lang of config.languages) {
    if (url.pathname.startsWith(`/${lang}`)) {
      return lang;
    }
  }
};

const getPreferredLanguage = (config: RemixI18nConfig, request: Request) => {
  const parser = acceptLanguage.create();

  parser.languages([...config.languages]);

  return parser.get(request.headers.get("Accept-Language"));
};

export const remixI18nLoader = (
  config: RemixI18nConfig,
  args: LoaderFunctionArgs,
) => {
  const lang =
    getLanguageFromPath(config, args.request) ||
    getPreferredLanguage(config, args.request) ||
    config.defaultLanguage;

  return { lang };
};
