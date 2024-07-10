import { RouteData } from "@remix-run/router/dist/utils";

export const getThemeFromRouteData = (
  routeData?: RouteData,
): string | undefined => {
  return routeData?.root?.theme;
};
