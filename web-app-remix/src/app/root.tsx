import { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";

import { remixI18nConfig } from "../constants/i18n";
import { remixI18nLoader } from "../lib/i18n/loader";
import { useChangeI18n } from "../lib/i18n/useChangeI18n";
import { useI18n } from "../lib/i18n/useI18n";
import { remixThemeCookie } from "../lib/theme/cookie";
import { remixThemeLoader } from "../lib/theme/loader";
import { RemixThemeScript } from "../lib/theme/script";
import { useChangeTheme } from "../lib/theme/useChangeTheme";
import { useTheme } from "../lib/theme/useTheme";

import styles from "./index.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async (args) => {
  const i18nData = await remixI18nLoader(remixI18nConfig, args);
  const themeData = await remixThemeLoader(remixThemeCookie, args);

  return json({
    ...i18nData,
    ...themeData,
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, dir } = useI18n();
  const { resolvedTheme } = useTheme();

  useChangeTheme();
  useChangeI18n();

  return (
    <html className={resolvedTheme} dir={dir} lang={language}>
      <head>
        <meta charSet={"utf-8"} />
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
        <RemixThemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
