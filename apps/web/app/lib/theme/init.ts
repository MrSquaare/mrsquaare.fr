import type { RouterState } from "react-router";

export const getThemeFromRouteData = (
  routeData?: RouterState["loaderData"],
): string | undefined => {
  return routeData?.root?.theme;
};
