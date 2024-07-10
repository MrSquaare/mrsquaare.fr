import { i18n } from "i18next";
import { FC, PropsWithChildren, createContext } from "react";
import { I18nextProvider } from "react-i18next";

export type RemixI18nContextType = {
  instance: i18n;
};

export const RemixI18nContext = createContext<RemixI18nContextType | undefined>(
  undefined,
);

export type RemixI18nProviderProps = PropsWithChildren<{
  instance: i18n;
}>;

export const RemixI18nProvider: FC<RemixI18nProviderProps> = ({
  instance,
  children,
}) => {
  return (
    <RemixI18nContext.Provider value={{ instance }}>
      <I18nextProvider i18n={instance}>{children}</I18nextProvider>
    </RemixI18nContext.Provider>
  );
};
