import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import { useI18n } from "../../lib/i18n/client";
import { useTheme } from "../../lib/theme/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t } = useTranslation("home");
  const { language, setLanguage } = useI18n();
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <ul>
        <li>Current language: {language}</li>
        <li>
          <button onClick={() => setLanguage("en")}>English</button>
        </li>
        <li>
          <button onClick={() => setLanguage("fr")}>Français</button>
        </li>
        <li>Current theme: {theme}</li>
        <li>
          <button onClick={() => setTheme("light")}>Light</button>
        </li>
        <li>
          <button onClick={() => setTheme("dark")}>Dark</button>
        </li>
      </ul>
      <h1>
        {t("title")} MrSquaare, {t("subtitle")}
      </h1>
    </div>
  );
}
