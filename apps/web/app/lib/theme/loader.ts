import type { Cookie, LoaderFunctionArgs } from "react-router";

export type ThemeLoaderData = {
  theme: string;
};

export const themeLoader = async (
  cookie: Cookie,
  args: LoaderFunctionArgs,
): Promise<ThemeLoaderData> => {
  const serializedTheme = args.request.headers.get("Cookie");
  const theme = await cookie.parse(serializedTheme);

  return { theme };
};
