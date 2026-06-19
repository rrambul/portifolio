import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";
import { locales } from "../../../../i18n.config";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${siteConfig.name} - Blog`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return renderOgImage({
    eyebrow: `${siteConfig.url.replace(/^https?:\/\//, "")}/blog`,
    title: t("title"),
    subtitle: siteConfig.name,
    footer: t("subtitle"),
  });
}
