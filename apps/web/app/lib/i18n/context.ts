import type { i18n } from "i18next";
import { createContext } from "react";

export type I18nContextType = {
  instance: i18n;
};

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined,
);
