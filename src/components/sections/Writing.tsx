"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { m } from "framer-motion";
import { getBlogPosts } from "@/data/blog-posts";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusRing, sectionCol } from "@/lib/ui";
import { isLocale } from "../../../i18n.config";

/** Latest posts as a typographic index: title left, date right. */
export function Writing() {
  const rawLocale = useLocale();
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const t = useTranslations("blog");
  const posts = getBlogPosts();

  return (
    <section id="writing" className="py-16">
      <div className="container mx-auto px-4">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={sectionCol}
        >
          <SectionHeading
            label="writing"
            title={t("title")}
            meta={`${posts.length} posts`}
          />

          <m.ul variants={fadeInUp} className="space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className={`group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-sm ${focusRing}`}
                >
                  <span className="font-medium text-zinc-800 transition-colors group-hover:text-emerald-700 dark:text-zinc-200 dark:group-hover:text-emerald-400">
                    {post.title[locale]}
                  </span>
                  <time
                    dateTime={post.date}
                    className="font-accent-mono text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {new Date(post.date).toLocaleDateString(
                      locale === "pt" ? "pt-BR" : "en-US"
                    )}
                  </time>
                </Link>
              </li>
            ))}
          </m.ul>

          <m.div variants={fadeInUp} className="mt-8">
            <Link
              href={`/${locale}/blog`}
              className={`rounded-sm font-accent-mono text-xs text-zinc-500 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 ${focusRing}`}
            >
              {t("allPosts")} →
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
