"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { interests } from "@/data/interests";
import { staggerContainer, springFadeIn, cardHover } from "@/lib/animations";

export function Interests() {
  const t = useTranslations("interests");

  return (
    <section
      id="interests"
      className="py-20 bg-transparent relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, #14b8a6 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Section heading */}
          <motion.div variants={springFadeIn} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-medium mb-3 tracking-wide uppercase text-teal-600 dark:text-teal-400">
              {t("subtitle")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              {t("title")}
            </h2>
          </motion.div>

          {/* Interest cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {interests.map(({ key, icon: Icon, color }) => (
              <motion.div
                key={key}
                variants={springFadeIn}
                whileHover={cardHover}
                className="group relative flex items-center gap-4 p-5 rounded-xl
                  bg-white dark:bg-zinc-800/80
                  border border-zinc-200 dark:border-zinc-700/60
                  shadow-sm hover:shadow-md
                  transition-shadow duration-300 cursor-default"
              >
                {/* Icon container */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center
                    transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}18` }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color }}
                  />
                </div>

                {/* Text */}
                <span className="text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-100">
                  {t(`items.${key}`)}
                </span>

                {/* Hover accent line */}
                <motion.div
                  className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full origin-left"
                  style={{ backgroundColor: color }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
