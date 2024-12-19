import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import { RemixThemeContext } from "./context";
import { RemixThemeConfig } from "./types";

export type RemixThemeProviderProps = PropsWithChildren & {
  config: RemixThemeConfig;
  initialTheme?: string;
};

export const RemixThemeProvider: FC<RemixThemeProviderProps> = ({
  initialTheme,
  config,
  children,
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const [preferredTheme, setPreferredTheme] = useState<string | undefined>();
  const resolvedTheme = theme || preferredTheme;
  const value = { config, theme, preferredTheme, resolvedTheme, setTheme };

  const handleMediaQueryChange = useCallback(
    (event: MediaQueryList | MediaQueryListEvent) => {
      setPreferredTheme(
        event.matches ? config.defaultDark : config.defaultLight,
      );
    },
    [config.defaultDark, config.defaultLight],
  );

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    handleMediaQueryChange(prefersDark);

    prefersDark.addEventListener("change", handleMediaQueryChange);

    return () => {
      prefersDark.removeEventListener("change", handleMediaQueryChange);
    };
  }, [handleMediaQueryChange]);

  return (
    <RemixThemeContext.Provider value={value}>
      {children}
    </RemixThemeContext.Provider>
  );
};
