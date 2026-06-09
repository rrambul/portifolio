"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { FiMail } from "react-icons/fi";
import { AnimatedContactForm } from "../ui/AnimatedContactForm";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="py-20 bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <motion.div className="inline-block bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mb-4">
              <FiMail className="text-teal-600 dark:text-teal-400 h-8 w-8" />
            </motion.div>
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}
            </motion.h2>
            <motion.p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {t("description")}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AnimatedContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
