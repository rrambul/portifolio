"use client";

import { ReactNode } from "react";
import { m } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  /** Icon element rendered inside the teal chip (style it at the call site). */
  icon: ReactNode;
  title: string;
  subtitle: string;
}

/**
 * The centered "icon chip + title + subtitle" header shared by several
 * sections. Animates as a `fadeInUp` item inside a stagger container.
 */
export function SectionHeading({ icon, title, subtitle }: SectionHeadingProps) {
  return (
    <m.div className="text-center mb-12" variants={fadeInUp}>
      <div className="inline-block bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mb-4">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </m.div>
  );
}
