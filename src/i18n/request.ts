import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "../../i18n.config";

export default getRequestConfig(async ({ locale }) => {
  // Use defaultLocale if locale is undefined
  const resolvedLocale = locale || defaultLocale;

  const messages = (await import(`../messages/${resolvedLocale}/index.json`))
    .default;

  return {
    locale: resolvedLocale,
    messages,
  };
});
