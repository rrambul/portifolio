import { getRequestConfig } from "next-intl/server";
import { toLocale } from "@/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  // Narrow here, once, so no caller can load messages for an arbitrary path
  // segment. proxy.ts skips paths with a dot, so `/wp-login.php` reaches the
  // `[locale]` routes with that string as the locale; the layout 404s it, but
  // `generateMetadata` runs too and would otherwise try to import it.
  const locale = toLocale((await requestLocale) ?? "");

  const messages = (await import(`../messages/${locale}/index.json`)).default;

  return {
    locale,
    messages,
  };
});
