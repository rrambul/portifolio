import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ogLocale } from "@/i18n/config";

/** Resolve a site-relative or absolute image path to an absolute URL. */
export function absoluteImage(image: string): string {
  return image.startsWith("http") ? image : `${siteConfig.url}${image}`;
}

export interface BuildMetadataOptions {
  locale: string;
  /** The full document title. It is emitted as-is; no layout template is applied. */
  title: string;
  description: string;
  /** Path after the locale segment, e.g. "" for home, "/blog", "/blog/slug". */
  path?: string;
  /**
   * Explicit OG/Twitter image (site-relative or absolute). When omitted, no
   * image fields are emitted so the route's `opengraph-image` file convention
   * (src/app/.../opengraph-image.tsx) supplies the image instead.
   */
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
 * Build a consistent Metadata object: the OpenGraph, Twitter, and
 * hreflang/canonical boilerplate that every page would otherwise repeat.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = "",
  image,
  type = "website",
  keywords,
  authors,
  article,
  other,
}: BuildMetadataOptions): Metadata {
  const url = (l: string) => `${siteConfig.url}/${l}${path}`;
  const imageUrl = image ? absoluteImage(image) : undefined;

  return {
    // Absolute on purpose: a plain string would go through the layout's
    // `%s | name` template on nested routes and print the name twice.
    title: { absolute: title },
    description,
    ...(keywords ? { keywords } : {}),
    ...(authors ? { authors } : {}),
    openGraph: {
      title,
      description,
      type,
      locale: ogLocale(locale),
      url: url(locale),
      siteName: siteConfig.siteName,
      ...(imageUrl
        ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] }
        : {}),
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
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
