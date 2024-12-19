import { i18n } from "i18next";
import { createContext } from "react";

export type RemixI18nContextType = {
  instance: i18n;
};

export const RemixI18nContext = createContext<RemixI18nContextType | undefined>(
  undefined,
);
