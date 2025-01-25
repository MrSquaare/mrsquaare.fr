import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

import { i18nConfig } from "./constants/i18n";
import { themeConfig } from "./constants/theme";
import { i18nInit } from "./lib/i18n/init";
import { I18nProvider } from "./lib/i18n/provider";
import { ThemeProvider } from "./lib/theme/provider";

async function hydrate() {
  const initialLanguage = window.__language;
  const instance = await i18nInit(i18nConfig, initialLanguage);
  const initialTheme = window.__theme;

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <I18nProvider instance={instance}>
          <ThemeProvider config={themeConfig} initialTheme={initialTheme}>
            <HydratedRouter />
          </ThemeProvider>
        </I18nProvider>
      </StrictMode>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  setTimeout(hydrate, 1);
}
