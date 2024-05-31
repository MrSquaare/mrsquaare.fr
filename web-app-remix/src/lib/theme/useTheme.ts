import { useFetcher } from "@remix-run/react";
import { useCallback, useContext } from "react";

import { RemixThemeContext } from "./provider";

export const useTheme = () => {
  const context = useContext(RemixThemeContext);
  const fetcher = useFetcher();

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const theme = context.theme;
  const setTheme = useCallback(
    (theme: string) => {
      fetcher.submit({ theme }, { action: "action/set-theme", method: "post" });
      context.setTheme(theme);
    },
    [context, fetcher],
  );

  return { theme, setTheme };
};
