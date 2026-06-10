"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { FiMail } from "react-icons/fi";
import { AnimatedContactForm } from "../ui/AnimatedContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="py-20 bg-zinc-100 dark:bg-zinc-900/40 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <SectionHeading
            icon={<FiMail className="text-teal-700 dark:text-teal-400 h-8 w-8" />}
            title={t("title")}
            subtitle={t("description")}
          />

          <motion.div variants={fadeInUp}>
            <AnimatedContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
