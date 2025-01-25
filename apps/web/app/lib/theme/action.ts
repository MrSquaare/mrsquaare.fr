import type { ActionFunctionArgs, Cookie } from "react-router";

export const themeAction = async (cookie: Cookie, args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const theme = formData.get("theme");
  const serializedTheme = await cookie.serialize(theme);

  return {
    data: { theme },
    init: {
      headers: {
        "Set-Cookie": serializedTheme,
      },
    },
  };
};
