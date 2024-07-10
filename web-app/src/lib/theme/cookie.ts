import { createCookie } from "@remix-run/node";

export const remixThemeCookie = createCookie("theme", {
  sameSite: "lax",
  path: "/",
});
