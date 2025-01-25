import type { ActionFunction } from "react-router";

import { themeAction } from "../lib/theme/action";
import { themeCookie } from "../lib/theme/cookie";

export const action: ActionFunction = async (args) => {
  const { data, init } = await themeAction(themeCookie, args);

  return Response.json(data, init);
};
