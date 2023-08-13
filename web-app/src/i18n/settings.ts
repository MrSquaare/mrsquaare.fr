import { Namespace } from "i18next";

import { fallbackLng, languages } from "../constants/i18n";
import { LanguageType } from "../types/i18n";

export const defaultNS = "common";

export function getOptions<Ns extends Namespace | undefined = undefined>(
  lng: LanguageType = fallbackLng,
  ns: Ns = defaultNS as Ns,
) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
