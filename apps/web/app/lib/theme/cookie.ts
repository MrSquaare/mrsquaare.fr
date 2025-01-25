import { createCookie } from "react-router";

export const themeCookie = createCookie("theme", {
  sameSite: "lax",
  path: "/",
});
