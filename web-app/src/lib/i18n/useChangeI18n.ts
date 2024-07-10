import { useParams } from "@remix-run/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useChangeI18n = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();
  const params = useParams();

  useEffect(() => {
    changeLanguage(params.lang);
  }, [changeLanguage, params.lang]);
};
