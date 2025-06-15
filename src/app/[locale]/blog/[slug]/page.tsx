import { getBlogPost, getBlogPosts } from "@/data/blog-posts";
import { BlogPost } from "@/components/blog/BlogPost";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

  const title = `${post.title[locale as 'en' | 'pt']} | Renan Rambul`;
  const description = post.excerpt[locale as 'en' | 'pt'];
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.date).toISOString();

  return {
    title,
    description,
    authors: [{ name: post.author.name }],
    keywords: post.tags.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `https://renanrambul.com/${locale}/blog/${slug}`,
      siteName: 'Renan Rambul Portfolio',
      publishedTime,
      modifiedTime,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.banner.startsWith('http') ? post.banner : `https://renanrambul.com${post.banner}`,
          width: 1200,
          height: 630,
          alt: post.title[locale as 'en' | 'pt'],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.banner.startsWith('http') ? post.banner : `https://renanrambul.com${post.banner}`],
      creator: '@renanrambul',
    },
    alternates: {
      canonical: `https://renanrambul.com/${locale}/blog/${slug}`,
      languages: {
        'en': `https://renanrambul.com/en/blog/${slug}`,
        'pt': `https://renanrambul.com/pt/blog/${slug}`,
      },
    },
    other: {
      'article:author': post.author.name,
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:section': 'Technology',
      'article:tag': post.tags.join(','),
    },
  };
} 