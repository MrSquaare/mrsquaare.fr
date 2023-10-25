/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import i18next, { KeyPrefix, Namespace } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
import {
  FallbackNs,
  UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOg,
} from "react-i18next";

import { languages } from "../constants/i18n";
import { LanguageType } from "../types/i18n";

import { getOptions } from "./settings";

const runsOnServerSide = typeof window === "undefined";

// on client side the normal singleton is ok
// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation<
  Ns extends Namespace | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: LanguageType, ns: Ns, options?: UseTranslationOptions<KPrefix>) {
  const ret = useTranslationOg<Ns, KPrefix>(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;

      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);

    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;

      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }

  return ret;
}

export { i18next };
