import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import type { RouterState } from "react-router";

import type { I18nConfig } from "./types";

export const getLanguageFromRouteData = (
  routeData?: RouterState["loaderData"],
): string | undefined => {
  return routeData?.root?.lang;
};

export const i18nInit = async (config: I18nConfig, lang?: string) => {
  const instance = createInstance();
  const language = lang || config.defaultLanguage;

  await instance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return import(`../../locales/${language}/${namespace}.json`);
      }),
    )
    .init({
      supportedLngs: config.languages,
      fallbackLng: config.defaultLanguage,
      lng: language,
      defaultNS: config.defaultNamespace,
      ns: config.namespaces,
      preload: config.languages,
    });

  return instance;
};
