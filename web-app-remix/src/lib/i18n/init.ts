import { RouteData } from "@remix-run/router/dist/utils";
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { RemixI18nConfig } from "./types";

const getLanguageFromRouteData = (routeData?: RouteData) => {
  return routeData?.root?.lang;
};

export const remixI18nInit = async (
  config: RemixI18nConfig,
  routeData?: RouteData,
) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const instance = i18next.createInstance();
  const lng = getLanguageFromRouteData(routeData) || config.defaultLanguage;

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
      lng: lng,
      defaultNS: config.defaultNamespace,
      ns: config.namespaces,
      preload: config.languages,
    });

  return instance;
};
