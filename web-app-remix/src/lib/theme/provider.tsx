import { FC, PropsWithChildren, createContext, useState } from "react";

export type RemixThemeContextType = {
  theme?: string;
  setTheme: (theme: string) => void;
};

export const RemixThemeContext = createContext<
  RemixThemeContextType | undefined
>(undefined);

export type RemixThemeProviderProps = PropsWithChildren;

export const RemixThemeProvider: FC<RemixThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string | undefined>();

  return (
    <RemixThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </RemixThemeContext.Provider>
  );
};
