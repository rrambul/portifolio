import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { siteConfig } from "@/config/site";
import { getBlogPost, getBlogPosts } from "@/data/blog-posts";
import { isLocale } from "../../../../../i18n.config";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog post";

export function generateStaticParams() {
  return getBlogPosts().flatMap((post) => [
    { locale: "en", slug: post.slug },
    { locale: "pt", slug: post.slug },
  ]);
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  const lang = isLocale(locale) ? locale : "en";

  return renderOgImage({
    eyebrow: `${siteConfig.url.replace(/^https?:\/\//, "")}/blog`,
    title: post ? post.title[lang] : siteConfig.name,
    subtitle: siteConfig.name,
    footer: post ? `${post.readTime} min read` : "",
  });
}
