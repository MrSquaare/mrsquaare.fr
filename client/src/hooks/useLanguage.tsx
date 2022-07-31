import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { Language } from "../types";

export const useLanguage = (languages: Language[]) => {
  const { asPath, locale, pathname, query, push } = useRouter();

  const language = useMemo(
    () => languages.find((language) => language.id === locale),
    [languages, locale]
  );

  const setLanguage = useCallback(
    (languageId: string) => {
      push({ pathname, query }, asPath, {
        locale: languageId,
      });
    },
    [asPath, pathname, query, push]
  );

  return { language, setLanguage };
};
