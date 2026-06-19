import { getBlogPost, getBlogPosts } from "@/data/blog-posts";
import { getBlogPostContent } from "@/lib/blog-content";
import { BlogPost } from "@/components/blog/BlogPost";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { buildMetadata, absoluteImage } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { isLocale } from "../../../../../i18n.config";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const locales = ['en', 'pt'];
  
  const params = [];
  for (const post of posts) {
    for (const locale of locales) {
      params.push({
        slug: post.slug,
        locale,
      });
    }
  }
  
  return params;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post || !isLocale(locale)) {
    notFound();
  }

  const content = getBlogPostContent(slug, locale);
  const publishedTime = new Date(post.date).toISOString();

  // Article structured data: powers Google's article rich results, which the
  // page-level OpenGraph/Twitter meta alone do not provide.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    image: absoluteImage(post.banner),
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${locale}/blog/${slug}`,
    },
    inLanguage: locale,
    keywords: post.tags.join(", "),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <BlogPost post={post} content={content} />
      <Footer />
    </main>
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Renan Rambul",
      description: "The requested blog post could not be found.",
    };
  }

  const typedLocale = isLocale(locale) ? locale : "en";
  const publishedTime = new Date(post.date).toISOString();

  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    type: "article",
    title: `${post.title[typedLocale]} | Renan Rambul`,
    description: post.excerpt[typedLocale],
    keywords: post.tags.join(", "),
    authors: [{ name: post.author.name }],
    article: {
      publishedTime,
      modifiedTime: publishedTime,
      authors: [post.author.name],
      tags: post.tags,
    },
    other: {
      "article:author": post.author.name,
      "article:published_time": publishedTime,
      "article:modified_time": publishedTime,
      "article:section": "Technology",
      "article:tag": post.tags.join(","),
    },
  });
} 