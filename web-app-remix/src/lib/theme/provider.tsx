import { FC, PropsWithChildren, createContext, useState } from "react";

export type RemixThemeContextType = {
  theme?: string;
  setTheme: (theme: string) => void;
};

export const RemixThemeContext = createContext<
  RemixThemeContextType | undefined
>(undefined);

export type RemixThemeProviderProps = PropsWithChildren & {
  initialTheme: string;
};

export const RemixThemeProvider: FC<RemixThemeProviderProps> = ({
  initialTheme,
  children,
}) => {
  const [theme, setTheme] = useState(initialTheme);

  return (
    <RemixThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </RemixThemeContext.Provider>
  );
};
