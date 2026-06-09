import { getBlogPost, getBlogPosts } from "@/data/blog-posts";
import { BlogPost } from "@/components/blog/BlogPost";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

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
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Navigation />
      <BlogPost post={post} />
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

  const typedLocale = locale as "en" | "pt";
  const publishedTime = new Date(post.date).toISOString();

  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    type: "article",
    image: post.banner,
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