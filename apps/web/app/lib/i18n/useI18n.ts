import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router";

export const useI18n = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const language = i18n.language;
  const dir = i18n.dir(language);
  const setLanguage = useCallback(
    async (lang: string) => {
      if (params.lang === lang) return;

      const newPath =
        location.pathname.replace(`/${params.lang ?? ""}`, `/${lang}`) +
        location.search +
        location.hash;

      navigate(newPath, {
        state: location.state,
      });
      i18n.changeLanguage(lang);
    },
    [
      i18n,
      location.hash,
      location.pathname,
      location.search,
      location.state,
      navigate,
      params.lang,
    ],
  );

  return { language, dir, setLanguage };
};
