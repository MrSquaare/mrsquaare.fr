import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { Language } from "../types";

export const useLanguage = (languages: Language[]) => {
  const { locale, pathname, query, push } = useRouter();

  const language = useMemo(
    () => languages.find((language) => language.id === locale),
    [languages, locale],
  );

  const setLanguage = useCallback(
    (languageId: string) => {
      push({ pathname, query }, undefined, {
        locale: languageId,
      }).catch((e) => {
        console.error("Failed to set language", e);
      });
    },
    [pathname, query, push],
  );

  return { language, setLanguage };
};
