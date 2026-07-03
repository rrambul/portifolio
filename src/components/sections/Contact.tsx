"use client";

import { useTranslations } from "next-intl";
import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { AnimatedContactForm } from "../ui/AnimatedContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Ambient canvas particles (client-only; no SSR).
const SectionParticles = dynamic(() => import("../ui/SectionParticles"), {
  ssr: false,
});

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="py-20 bg-zinc-100 dark:bg-zinc-900/40 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <SectionParticles />
      </div>

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
