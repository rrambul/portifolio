"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock } from "react-icons/fi";

export function Blog() {
  const t = useTranslations("blog");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Sample blog posts - replace with actual content
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js and TypeScript",
      excerpt:
        "Learn how to set up a new project with Next.js and TypeScript, including best practices and common pitfalls to avoid.",
      date: "2023-08-15",
      image: "/images/blog/nextjs.jpg",
      slug: "getting-started-with-nextjs",
    },
    {
      id: 2,
      title: "Building a Responsive UI with Tailwind CSS",
      excerpt:
        "Explore the benefits of utility-first CSS frameworks and learn how to create beautiful, responsive interfaces with Tailwind CSS.",
      date: "2023-07-28",
      image: "/images/blog/tailwind.jpg",
      slug: "building-ui-with-tailwind",
    },
    {
      id: 3,
      title: "State Management in Modern React Applications",
      excerpt:
        "Compare different state management solutions for React applications and learn when to use each approach.",
      date: "2023-06-10",
      image: "/images/blog/react-state.jpg",
      slug: "react-state-management",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={item}
            className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="blog-card bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-zinc-700"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center space-x-1 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    <FiClock className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <span className="mr-1">{t("readMore")}</span>
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
