import { useParams } from "@remix-run/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useChangeI18n = () => {
  const { i18n } = useTranslation();
  const params = useParams();

  const language = i18n.language;

  useEffect(() => {
    if (params.lang === language) return;

    i18n.changeLanguage(params.lang);
  }, [i18n, language, params.lang]);
};
