import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://renanrambul.com';
  const blogPosts = getBlogPosts();
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pt/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Blog post pages
  const blogPages = blogPosts.flatMap((post) => [
    {
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pt/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  return [...staticPages, ...blogPages];
} 