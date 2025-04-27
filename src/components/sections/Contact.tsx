"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { AnimatedContactForm } from "../ui/AnimatedContactForm";

export function Contact() {
  const t = useTranslations("contact");

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

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-zinc-900/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-12" variants={item}>
            <motion.div className="inline-block bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
              <FiMail className="text-purple-600 dark:text-purple-400 h-8 w-8" />
            </motion.div>
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </motion.h2>
            <motion.p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {t("description")}
            </motion.p>
          </motion.div>

          <motion.div variants={item}>
            <AnimatedContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
