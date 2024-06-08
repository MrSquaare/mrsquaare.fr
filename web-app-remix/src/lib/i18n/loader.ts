import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/router";
import acceptLanguage from "accept-language";

import { RemixI18nConfig, RemixI18nLoaderData } from "./types";

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

export const remixI18nLoader = async (
  config: RemixI18nConfig,
  args: LoaderFunctionArgs,
): Promise<RemixI18nLoaderData> => {
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
