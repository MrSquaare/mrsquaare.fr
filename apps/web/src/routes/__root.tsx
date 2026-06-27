import "../index.css";

import type { FC } from "react";

import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { getLocale, shouldRedirect } from "@/paraglide/runtime";

import { themeConfig } from "../constants/theme";
import { ThemeProvider } from "../lib/theme/provider";

export const Root: FC = () => {
  return (
    <ThemeProvider config={themeConfig}>
      <Outlet />
      <TanStackRouterDevtools position={"bottom-right"} />
    </ThemeProvider>
  );
};

export const Route = createRootRoute({
  beforeLoad: async () => {
    document.documentElement.setAttribute("lang", getLocale());

    const decision = await shouldRedirect({ url: window.location.href });

    if (decision.redirectUrl) {
      throw redirect({ href: decision.redirectUrl.href });
    }
  },
  component: Root,
});
