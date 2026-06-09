import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const BASE_URL = siteConfig.url;
const SITE_NAME = `${siteConfig.name} Portfolio`;

/** Map an app locale to an OpenGraph locale code. */
export function ogLocale(locale: string): string {
  return locale === "pt" ? "pt_BR" : "en_US";
}

/** Resolve a site-relative or absolute image path to an absolute URL. */
function absoluteImage(image: string): string {
  return image.startsWith("http") ? image : `${BASE_URL}${image}`;
}

export interface BuildMetadataOptions {
  locale: string;
  title: string;
  description: string;
  /** Path after the locale segment, e.g. "" for home, "/blog", "/blog/slug". */
  path?: string;
  /** OG/Twitter image (site-relative or absolute). Defaults to the site OG image. */
  image?: string;
  type?: "website" | "article";
  keywords?: string | string[];
  authors?: { name: string }[];
  /** Article-specific OpenGraph fields. */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  /** Extra `<meta>` tags (e.g. article:* properties). */
  other?: Record<string, string>;
}

/**
 * Build a consistent Metadata object — handles the OpenGraph, Twitter, and
 * hreflang/canonical boilerplate that every page would otherwise repeat.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = "",
  image = siteConfig.ogImage,
  type = "website",
  keywords,
  authors,
  article,
  other,
}: BuildMetadataOptions): Metadata {
  const url = (l: string) => `${BASE_URL}/${l}${path}`;
  const imageUrl = absoluteImage(image);

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(authors ? { authors } : {}),
    openGraph: {
      title,
      description,
      type,
      locale: ogLocale(locale),
      url: url(locale),
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.links.twitter,
    },
    alternates: {
      canonical: url(locale),
      languages: {
        en: url("en"),
        pt: url("pt"),
      },
    },
    ...(other ? { other } : {}),
  };
}
