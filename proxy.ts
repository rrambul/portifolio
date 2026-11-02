import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n/config";

// Locale negotiation and the `/{locale}` prefix on every page route. Next 16
// calls this file `proxy.ts`; it is what used to be `middleware.ts`.
export default createMiddleware({
  locales,
  defaultLocale,
  // Always prefix, so `/` redirects to `/en` and every page has one URL.
  localePrefix: "always",
});

export const config = {
  // Skip API routes, Next internals and anything with a file extension. The
  // literal is mirrored in src/__tests__/middleware-matcher.test.ts.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
