"use client";

import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("blog");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50"
    >
      <Link href={`/${locale}/blog/${post.slug}`} className="block">
        {/* Banner Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={post.banner}
            alt={post.title[locale]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm !text-zinc-700 dark:!text-zinc-400 mb-3">
            <time dateTime={post.date}>
              {t("publishedOn")} {new Date(post.date).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US")}
            </time>
            <span>{post.readTime} min</span>
          </div>

          {/* Title */}
          <h3 
            className="text-xl font-bold mb-3 group-hover:!text-teal-800 dark:group-hover:!text-teal-400 transition-colors duration-200 blog-title-force-black"
            style={{ color: '#000000 !important' }}
          >
            {post.title[locale]}
          </h3>

          {/* Excerpt */}
          <p className="!text-zinc-800 dark:!text-zinc-400 mb-4 line-clamp-3">
            {post.excerpt[locale]}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar || "/profile-picture.jpg"}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium !text-zinc-800 dark:!text-zinc-300">
                {post.author.name}
              </span>
            </div>

            {/* Read More indicator - no nested link */}
            <span 
              className="font-medium group-hover:underline transition-colors duration-200 blog-readmore-force-dark"
              style={{ color: '#134e4a !important' }}
            >
              {t("readMore")} →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
} 