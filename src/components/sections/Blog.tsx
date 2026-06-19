"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { getBlogPosts } from "@/data/blog-posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { FiEdit3, FiBookOpen } from "react-icons/fi";

export function Blog() {
  const t = useTranslations("blog");
  // Post metadata is static module data, so read it synchronously at render.
  // This lets the index render its real content during SSR (good for crawlers
  // and LCP) instead of flashing a skeleton until hydration.
  const blogPosts = getBlogPosts();

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <m.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <m.div 
            variants={fadeInUp}
            className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6"
          >
            <FiEdit3 className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
          </m.div>
          
          <m.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 dark:from-emerald-400 dark:to-emerald-400 bg-clip-text text-transparent leading-tight pb-2"
            style={{ lineHeight: '1.2' }}
          >
            {t("title")}
          </m.h1>

          <m.p
            variants={fadeInUp}
            className="text-xl text-zinc-700 dark:text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </m.p>

          <m.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium"
          >
            <FiBookOpen className="w-4 h-4" />
            <span>{blogPosts.length} articles published</span>
          </m.div>
        </m.div>

        {/* Blog Posts Grid */}
        <m.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
