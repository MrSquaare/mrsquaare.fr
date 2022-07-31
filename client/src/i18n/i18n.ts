import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE } from "../constants";

import { en } from "./langs/en";
import { fr } from "./langs/fr";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  supportedLngs: ["fr", "en"],
  resources: {
    fr: fr,
    en: en,
  },
});

export { i18n };
