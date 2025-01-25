import {
  type LinksFunction,
  type LoaderFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { i18nConfig } from "./constants/i18n";
import styles from "./index.css?url";
import { i18nLoader } from "./lib/i18n/loader";
import { I18nScript } from "./lib/i18n/script";
import { useI18n } from "./lib/i18n/useI18n";
import { themeCookie } from "./lib/theme/cookie";
import { themeLoader } from "./lib/theme/loader";
import { ThemeScript } from "./lib/theme/script";
import { useTheme } from "./lib/theme/useTheme";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg" },
  { rel: "stylesheet", href: styles },
];

export const loader: LoaderFunction = async (args) => {
  const i18nData = await i18nLoader(i18nConfig, args);
  const themeData = await themeLoader(themeCookie, args);

  return Response.json({
    ...i18nData,
    ...themeData,
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, dir } = useI18n();
  const { resolvedTheme } = useTheme();

  return (
    <html className={resolvedTheme} dir={dir} lang={language}>
      <head>
        <meta charSet={"utf-8"} />
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
        <Meta />
        <Links />
        <I18nScript />
        <ThemeScript />
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
