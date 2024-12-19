import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { RemixThemeLoaderData } from "./types";
import { useThemeContext } from "./useThemeContext";

export const useChangeTheme = () => {
  const { setTheme } = useThemeContext();
  const data = useLoaderData<RemixThemeLoaderData>();

  useEffect(() => {
    setTheme(data.theme);
  }, [data.theme, setTheme]);
};
