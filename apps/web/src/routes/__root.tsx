import "../index.css";

import type { FC } from "react";

import {
  createRootRoute,
  HeadContent,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { getLocale, shouldRedirect } from "@/paraglide/runtime";

import { themeConfig } from "../constants/theme";
import { ThemeProvider } from "../lib/theme/provider";

export const Root: FC = () => {
  return (
    <ThemeProvider config={themeConfig}>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools position={"bottom-right"} />
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    document.documentElement.setAttribute("lang", getLocale());

    const decision = await shouldRedirect({ url: location.href });

    if (decision.redirectUrl) {
      throw redirect({ href: decision.redirectUrl.href });
    }
  },
  component: Root,
});
