import { useContext } from "react";

import { RemixThemeContext } from "./provider";

export const useThemeContext = () => {
  const context = useContext(RemixThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
