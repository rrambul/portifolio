"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
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
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <SectionHeading
            label="contact"
            title={t("title")}
            subtitle={t("description")}
          />

          <m.div variants={fadeInUp}>
            <AnimatedContactForm />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
