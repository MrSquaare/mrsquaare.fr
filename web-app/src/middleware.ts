import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

import { fallbackLng, languages } from "./constants/i18n";

acceptLanguage.languages([...languages]);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)",
  ],
};

const cookieName = "i18next";

export function middleware(request: NextRequest) {
  let lng;

  const lngCookie = request.cookies.get(cookieName);

  if (lngCookie) lng = acceptLanguage.get(lngCookie.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${request.nextUrl.pathname}`, request.url),
    );
  }

  const referer = request.headers.get("referer");

  if (referer) {
    const refererUrl = new URL(referer);
    const lngInReferer = languages.find((loc) =>
      refererUrl.pathname.startsWith(`/${loc}`),
    );
    const response = NextResponse.next();

    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);

    return response;
  }

  return NextResponse.next();
}
