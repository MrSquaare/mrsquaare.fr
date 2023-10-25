"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// eslint-disable-next-line import/no-unresolved
import { type ThemeProviderProps } from "next-themes/dist/types";
import { FC } from "react";

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
