import { Cookie, LoaderFunctionArgs } from "@remix-run/node";

import { RemixThemeLoaderData } from "./types";

export const remixThemeLoader = async (
  remixThemeCookie: Cookie,
  args: LoaderFunctionArgs,
): Promise<RemixThemeLoaderData> => {
  const cookie = args.request.headers.get("Cookie");
  const theme = await remixThemeCookie.parse(cookie);

  return { theme };
};
