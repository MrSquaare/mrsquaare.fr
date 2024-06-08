import { ActionFunction, json } from "@remix-run/node";

import { remixThemeAction, remixThemeCookie } from "../../lib/theme/server";

export const action: ActionFunction = async (args) => {
  const { data, init } = await remixThemeAction(remixThemeCookie, args);

  return json(data, init);
};
