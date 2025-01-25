import type { FC } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    __language: string;
  }
}

export const I18nScript: FC = () => {
  const { i18n } = useTranslation();

  const __html = `(function(language) {
    window.__language = language;
  })(${JSON.stringify(i18n.language)})`;

  return <script dangerouslySetInnerHTML={{ __html }} />;
};
