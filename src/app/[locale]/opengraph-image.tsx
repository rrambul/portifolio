import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { siteConfig } from "@/config/site";
import { locales } from "../../../i18n.config";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${siteConfig.name} - Software Engineer`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderOgImage({
    eyebrow: siteConfig.url.replace(/^https?:\/\//, ""),
    title: siteConfig.name,
    subtitle: locale === "pt" ? "Engenheiro de Software" : "Software Engineer",
    footer: "6+ years building web products end to end",
  });
}
