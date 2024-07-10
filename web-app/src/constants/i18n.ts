import { enGB as dateFnsEN, fr as dateFnsFR } from "date-fns/locale";

import { RemixI18nConfig } from "../lib/i18n/types";

export const defaultLanguage = "en" as const;
export const defaultNamespace = "common" as const;
export const languages = [defaultLanguage, "fr"] as const;
export const namespaces = [defaultNamespace, "home"] as const;

export const dateFnsLocales = {
  [languages[0]]: dateFnsEN,
  [languages[1]]: dateFnsFR,
} as const;

export const remixI18nConfig: RemixI18nConfig = {
  languages,
  defaultLanguage,
  namespaces,
  defaultNamespace,
};
