"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { getBlogPosts } from "@/data/blog-posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { FiEdit3, FiBookOpen } from "react-icons/fi";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";

export function Blog() {
  const t = useTranslations("blog");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure posts are loaded on component mount
    const posts = getBlogPosts();
    setBlogPosts(posts);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <section id="blog" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mx-auto mb-6"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-6 max-w-md"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-8 max-w-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-6"
          >
            <FiEdit3 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </motion.div>
          
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight pb-2"
            style={{ lineHeight: '1.2' }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-zinc-700 dark:text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2 text-sm text-teal-700 dark:text-teal-400 font-medium"
          >
            <FiBookOpen className="w-4 h-4" />
            <span>{blogPosts.length} articles published</span>
          </motion.div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}
