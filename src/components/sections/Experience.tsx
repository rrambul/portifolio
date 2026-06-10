"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { experiences as experienceData } from "@/data/experiences";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/animations";

export function Experience() {
  const t = useTranslations("experience");

  const experiences = experienceData.map((exp) => ({
    ...exp,
    jobTitle: t(`companies.${exp.i18nKey}.title`),
    responsibilities: t.raw(`companies.${exp.i18nKey}.responsibilities`) as string[],
    skills: t.raw(`companies.${exp.i18nKey}.skills`) as string[],
  }));

  return (
    <section id="experience" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
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

          <div className="space-y-10 relative">
            {/* Timeline vertical line that grows as you scroll */}
            <motion.div
              className="absolute left-5 top-0 w-1 origin-top shadow-md"
              style={{
                height: "calc(100% - 40px)",
                backgroundColor: "#14b8a6", // Explicit teal color for all themes
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: [0, 0.3, 0.6, 1] }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="experience-card bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 transition-shadow duration-300 hover:shadow-lg cursor-pointer relative ml-10"
                whileHover={cardHover}
              >
                {/* Timeline node with sequential animation */}
                <div
                  className="absolute -left-12 top-6 w-4 h-4 rounded-full bg-white dark:bg-zinc-800 border-2 flex items-center justify-center z-10"
                  style={{ borderColor: "#14b8a6" }} // Explicit teal border color
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#14b8a6" }} // Explicit teal color
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.15 }}
                  />
                </div>

                {/* Timeline connector line with sequential animation */}
                <motion.div
                  className="absolute -left-8 top-8 h-1"
                  style={{ width: "8px", backgroundColor: "#14b8a6", transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
                  transition={{ duration: 0.3, delay: 0.15 + idx * 0.15 }}
                />

                  <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-700 flex items-center justify-center border border-gray-200 dark:border-zinc-600">
                        {exp.logo ? (
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={48}
                            height={48}
                            className="object-contain"
                            onError={(e) => {
                              // Fallback if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        ) : (
                          <FiBriefcase className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                          {exp.jobTitle}
                        </h3>
                        <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400">
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-500 mt-1">
                          <FiMapPin className="h-3 w-3" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 mt-2 md:mt-0">
                      <FiCalendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-2 text-zinc-600 dark:text-zinc-400 mb-4">
                  {exp.responsibilities.map((resp: string, respIdx: number) => (
                        <li key={respIdx}>{resp}</li>
                  ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill: string, skillIdx: number) => (
                      <span
                        key={skillIdx}
                      className="px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
