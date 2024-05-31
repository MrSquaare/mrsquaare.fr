import { ActionFunctionArgs, Cookie } from "@remix-run/node";

export const remixThemeAction = async (
  remixThemeCookie: Cookie,
  args: ActionFunctionArgs,
) => {
  const formData = await args.request.formData();
  const theme = formData.get("theme");
  const cookie = await remixThemeCookie.serialize(theme);

  return {
    data: { theme },
    init: {
      headers: {
        "Set-Cookie": cookie,
      },
    },
  };
};
