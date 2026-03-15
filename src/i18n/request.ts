import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "../../i18n.config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || defaultLocale;

  const messages = (await import(`../messages/${locale}/index.json`)).default;

  return {
    locale,
    messages,
  };
});
