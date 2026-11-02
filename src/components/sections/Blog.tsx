"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { getBlogPosts } from "@/data/blog-posts";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

export function Blog() {
  const t = useTranslations("blog");
  // Post metadata is static module data, so read it synchronously at render.
  // This lets the index render its real content during SSR (good for crawlers
  // and LCP) instead of flashing a skeleton until hydration.
  const blogPosts = getBlogPosts();

  return (
    <Section id="blog" spacing="normal">
      <m.div initial="hidden" animate="show" variants={staggerContainer}>
        {/* The blog index has no other h1, so the section heading is it. */}
        <SectionHeading
          as="h1"
          label="blog"
          title={t("title")}
          subtitle={t("subtitle")}
          meta={t("count", { count: blogPosts.length })}
        />

        {/* Posts as an editorial list separated by hairline rules. */}
        <div className="divide-y divide-zinc-200 dark:divide-white/10">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </m.div>
    </Section>
  );
}
