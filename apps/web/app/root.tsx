import { type FC, type ReactNode } from "react";
import {
  type LinksFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import styles from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg" },
  { rel: "stylesheet", href: styles },
];

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang={"en"} suppressHydrationWarning>
      <head>
        <meta charSet={"utf-8"} />
        <meta
          content={"width=device-width, initial-scale=1"}
          name={"viewport"}
        />
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
};

const App: FC = () => {
  return <Outlet />;
};

export default App;
