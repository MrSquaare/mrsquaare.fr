import { RouteData } from "@remix-run/router/dist/utils";
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { RemixI18nConfig } from "./types";

export const getLanguageFromRouteData = (routeData?: RouteData): string => {
  return routeData?.root?.lang;
};

export const remixI18nInit = async (config: RemixI18nConfig, lang?: string) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const instance = i18next.createInstance();
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
