"use client";

import { useTranslations } from "next-intl";
import { FiUser, FiCode, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";

// Dynamically import the particle component
const AboutParticles = dynamic(() => import("../ui/AboutParticles"), {
  ssr: false,
});

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="py-20 bg-zinc-100 dark:bg-zinc-900/40 relative overflow-hidden"
    >
      {/* Section-specific particles */}
      <div className="absolute inset-0 pointer-events-none">
        <AboutParticles />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {t("title")}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="prose prose-lg dark:prose-invert mx-auto mb-12"
          >
            <p className="text-lg text-center">{t("content")}</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={cardHover}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full w-fit mb-4">
                <FiUser className="text-teal-600 dark:text-teal-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("personal.title")}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t("personal.content")}
              </p>
            </motion.div>

            <motion.div
              whileHover={cardHover}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full w-fit mb-4">
                <FiCode className="text-teal-600 dark:text-teal-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("technical.title")}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t("technical.content")}
              </p>
            </motion.div>

            <motion.div
              whileHover={cardHover}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full w-fit mb-4">
                <FiGlobe className="text-teal-600 dark:text-teal-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("languages.title")}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t("languages.content")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
