import { KeyPrefix, Namespace, createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import type { FallbackNs, UseTranslationOptions } from "react-i18next";
// eslint-disable-next-line import/no-unresolved
import { initReactI18next } from "react-i18next/initReactI18next";

import { LanguageType } from "../types/i18n";

import { getOptions } from "./settings";

const initI18next = async <Ns extends Namespace | undefined = undefined>(
  lng: LanguageType,
  ns: Ns,
) => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));

  return i18nInstance;
};

export async function getTranslation<
  Ns extends Namespace | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: LanguageType, ns: Ns, options?: UseTranslationOptions<KPrefix>) {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
}
