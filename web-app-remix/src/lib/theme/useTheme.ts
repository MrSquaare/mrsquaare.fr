import { useFetcher } from "@remix-run/react";
import { useCallback } from "react";

import { useThemeContext } from "./useThemeContext";

export const useTheme = () => {
  const context = useThemeContext();
  const fetcher = useFetcher();

  const theme = context.theme;
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

  return { theme, setTheme };
};
