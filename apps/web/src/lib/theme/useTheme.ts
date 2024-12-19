import { useFetcher } from "@remix-run/react";
import { useCallback } from "react";

import { useThemeContext } from "./useThemeContext";

export const useTheme = () => {
  const context = useThemeContext();
  const fetcher = useFetcher();

  const config = context.config;
  const theme = context.theme;
  const preferredTheme = context.preferredTheme;
  const resolvedTheme = context.resolvedTheme;
  const setTheme = useCallback(
    (theme: string) => {
      fetcher.submit(
        { theme },
        { action: "/action/set-theme", method: "post" },
      );
      context.setTheme(theme);
    },
    [context, fetcher],
  );

  return { config, theme, preferredTheme, resolvedTheme, setTheme };
};
