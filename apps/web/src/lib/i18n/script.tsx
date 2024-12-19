import { FC } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    __remixLanguage: string;
  }
}

export const RemixI18nScript: FC = () => {
  const { i18n } = useTranslation();

  const __html = `(function(language) {
    window.__remixLanguage = language;
  })(${JSON.stringify(i18n.language)})`;

  return <script dangerouslySetInnerHTML={{ __html }} />;
};
