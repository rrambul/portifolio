"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiCalendar, FiArrowLeft } from "react-icons/fi";
import { BlogPostMetadata } from "@/types/blog";
import ReactMarkdown from "react-markdown";
import { useLocale, useTranslations } from "next-intl";

interface BlogPostProps {
  post: BlogPostMetadata;
  /** Markdown body for the active locale (loaded server-side). */
  content: string;
}

export function BlogPost({ post, content }: BlogPostProps) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("blog");

  return (
    <article className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-zinc-50/80 via-white to-teal-50/20 dark:from-zinc-900 dark:via-zinc-900 dark:to-teal-950 py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-100/30 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-40 dark:opacity-20"></div>
          <div className="absolute top-20 right-10 w-40 h-40 bg-cyan-100/30 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-40 dark:opacity-20"></div>
        </div>
        
        {/* Back Button */}
        <div className="container mx-auto px-4 relative z-10 mb-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-colors duration-200 border border-zinc-300 dark:border-zinc-700 shadow-sm text-black hover:text-gray-700 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>{t("backToBlog")}</span>
          </Link>
        </div>

        {/* Header Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-zinc-900 dark:text-zinc-100">
              {post.title[locale]}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 !text-zinc-800 dark:!text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar || "/profile-picture.jpg"}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
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
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          <div className="text-xl !text-zinc-800 dark:!text-zinc-400 mb-12 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border-l-4 border-teal-600">
            {post.excerpt[locale]}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-code:text-teal-600 dark:prose-code:text-teal-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 font-medium group transition-colors duration-200 text-teal-900 hover:text-black dark:text-teal-400 dark:hover:text-teal-300"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>{t("backToAllPosts")}</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </article>
  );
} 