import { useLocation, useNavigate } from "@remix-run/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useI18n = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const language = i18n.language;
  const dir = i18n.dir(language);
  const setLanguage = useCallback(
    async (lang: string) => {
      const newUrl = location.pathname.replace(/^\/[a-z]{2}/, `/${lang}`);

      await i18n.changeLanguage(lang);

      navigate(newUrl);
    },
    [i18n, location, navigate],
  );

  return { language, dir, setLanguage };
};
