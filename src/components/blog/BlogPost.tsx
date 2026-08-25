"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { FiClock, FiCalendar, FiArrowLeft } from "react-icons/fi";
import { BlogPostMetadata } from "@/types/blog";
import ReactMarkdown from "react-markdown";
import { useLocale, useTranslations } from "next-intl";
import { isLocale } from "../../../i18n.config";

interface BlogPostProps {
  post: BlogPostMetadata;
  /** Markdown body for the active locale (loaded server-side). */
  content: string;
}

export function BlogPost({ post, content }: BlogPostProps) {
  const rawLocale = useLocale();
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = useTranslations("blog");

  return (
    <article className="min-h-screen">
      {/* Header Section */}
      <div className="py-16 border-b border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {/* Back Button */}
            <Link
              href={`/${locale}/blog`}
              className="mb-10 inline-flex items-center gap-2 font-accent-mono text-sm text-zinc-500 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>{t("backToBlog")}</span>
            </Link>

            {/* Header Content */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-zinc-900 dark:text-zinc-100">
                {post.title[locale]}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author.name}</span>
                </div>

                <div className="flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {t("publishedOn")} {new Date(post.date).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}
                  </time>
                </div>

                <div className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <m.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="mx-auto max-w-2xl">
          {/* Excerpt */}
          <div className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 border-l-2 border-emerald-600 pl-5 dark:border-emerald-400">
            {post.excerpt[locale]}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-emerald-700 dark:prose-a:text-emerald-400 prose-code:text-emerald-700 dark:prose-code:text-emerald-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
            {/* The page already renders the post title as the h1, so demote the
                markdown's own "# title" to h2 to keep a single h1 and a valid
                heading order. */}
            <ReactMarkdown components={{ h1: "h2" }}>{content}</ReactMarkdown>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 font-medium group transition-colors duration-200 text-emerald-900 hover:text-black dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>{t("backToAllPosts")}</span>
            </Link>
          </div>
        </div>
      </m.div>
    </article>
  );
} 