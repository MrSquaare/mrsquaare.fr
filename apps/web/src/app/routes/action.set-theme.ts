import { ActionFunction } from "@remix-run/node";

import { remixThemeAction } from "../../lib/theme/action";
import { remixThemeCookie } from "../../lib/theme/cookie";

export const action: ActionFunction = async (args) => {
  const { data, init } = await remixThemeAction(remixThemeCookie, args);

  return Response.json(data, init);
};
