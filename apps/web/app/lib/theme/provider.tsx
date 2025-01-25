import type { FC, PropsWithChildren } from "react";
import { useCallback, useEffect, useState } from "react";

import { ThemeContext } from "./context";
import type { ThemeConfig } from "./types";

export type ThemeProviderProps = PropsWithChildren & {
  config: ThemeConfig;
  initialTheme?: string;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  config,
  initialTheme,
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
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
