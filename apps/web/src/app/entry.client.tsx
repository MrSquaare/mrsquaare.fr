/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { remixI18nConfig } from "../constants/i18n";
import { remixThemeConfig } from "../constants/theme";
import { remixI18nInit } from "../lib/i18n/init";
import { RemixI18nProvider } from "../lib/i18n/provider";
import { RemixThemeProvider } from "../lib/theme/provider";

async function hydrate() {
  const initialLanguage = window.__remixLanguage;
  const instance = await remixI18nInit(remixI18nConfig, initialLanguage);
  const initialTheme = window.__remixTheme;

  startTransition(() => {
    hydrateRoot(
      document,
      <RemixI18nProvider instance={instance}>
        <RemixThemeProvider
          config={remixThemeConfig}
          initialTheme={initialTheme}
        >
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </RemixThemeProvider>
      </RemixI18nProvider>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  setTimeout(hydrate, 1);
}
