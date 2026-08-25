"use client";

import { BlogPostMetadata } from "@/types/blog";
import { m } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { isLocale } from "../../../i18n.config";

interface BlogCardProps {
  post: BlogPostMetadata;
  index: number;
}

/** One post as an editorial list row: meta line, title, excerpt, byline. */
export function BlogCard({ post, index }: BlogCardProps) {
  const rawLocale = useLocale();
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = useTranslations("blog");

  return (
    <m.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group py-8 first:pt-0 last:pb-0"
    >
      <Link href={`/${locale}/blog/${post.slug}`} className="block">
        {/* Meta */}
        <div className="flex items-center justify-between font-accent-mono text-xs text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.date}>
            {t("publishedOn")}{" "}
            {new Date(post.date).toLocaleDateString(
              locale === "pt" ? "pt-BR" : "en-US"
            )}
          </time>
          <span>{post.readTime} min</span>
        </div>

        {/* Title */}
        {/* h2: the blog index h1 is the page title, so rows are the next level */}
        <h2 className="mt-2 text-xl font-bold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
          {post.title[locale]}
        </h2>

        {/* Excerpt */}
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {post.excerpt[locale]}
        </p>

        {/* Author & Read More */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {post.author.name}
          </span>
          <span className="font-accent-mono text-xs text-emerald-700 group-hover:underline dark:text-emerald-400">
            {t("readMore")} →
          </span>
        </div>
      </Link>
    </m.article>
  );
}
