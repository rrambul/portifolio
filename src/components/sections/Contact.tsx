"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { AnimatedContactForm } from "../ui/AnimatedContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact" spacing="loose">
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
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
    </Section>
  );
}
