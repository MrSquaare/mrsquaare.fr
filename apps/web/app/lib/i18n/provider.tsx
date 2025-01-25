import type { i18n } from "i18next";
import type { FC, PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

import { I18nContext } from "./context";

export type I18nProviderProps = PropsWithChildren<{
  instance: i18n;
}>;

export const I18nProvider: FC<I18nProviderProps> = ({ instance, children }) => {
  return (
    <I18nContext.Provider value={{ instance }}>
      <I18nextProvider i18n={instance}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
};
