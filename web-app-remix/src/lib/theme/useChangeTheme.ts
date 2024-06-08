import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { RemixThemeLoaderData } from "./types";
import { useThemeContext } from "./useThemeContext";

export const useChangeTheme = () => {
  const context = useThemeContext();
  const data = useLoaderData<RemixThemeLoaderData>();

  useEffect(() => {
    if (data.theme === context.theme) return;

    context.setTheme(data.theme);
  }, [context, data.theme]);
};
