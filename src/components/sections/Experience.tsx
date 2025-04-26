"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import Image from "next/image";

interface Experience {
  jobTitle: string;
  company: string;
  companyId: string;
  logo: string;
  period: string;
  location: string;
  responsibilities: string[];
  skills: string[];
}

export function Experience() {
  const t = useTranslations("experience");

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

  // Real work experiences with company logos
  const experiences: Experience[] = [
    {
      jobTitle: t(`companies.tas.title`),
      company: "Translational Analytics & Statistics",
      companyId: "tas",
      logo: "/company-logos/tas-logo.jpeg",
      period: "Jan 2025 - Present",
      location: "Arizona, United States · Remote",
      responsibilities: t.raw(`companies.tas.responsibilities`),
      skills: t.raw(`companies.tas.skills`),
    },
    {
      jobTitle: t(`companies.freelance.title`),
      company: "Freelance",
      companyId: "freelance",
      logo: "/company-logos/freelance.svg",
      period: "Sep 2024 - Feb 2025",
      location: "Niterói, Rio de Janeiro, Brazil · Remote",
      responsibilities: t.raw(`companies.freelance.responsibilities`),
      skills: t.raw(`companies.freelance.skills`),
    },
    {
      jobTitle: t(`companies.bymycell.title`),
      company: "ByMyCell - Genomics Made Simple",
      companyId: "bymycell",
      logo: "/company-logos/bymycell-logo.jpeg",
      period: "Sep 2024 - Jan 2025",
      location: "Ribeirão Preto, São Paulo, Brazil · On-site",
      responsibilities: t.raw(`companies.bymycell.responsibilities`),
      skills: t.raw(`companies.bymycell.skills`),
    },
    {
      jobTitle: t(`companies.take.title`),
      company: "Take",
      companyId: "take",
      logo: "/company-logos/take-logo.jpeg",
      period: "Nov 2022 - Sep 2024",
      location: "Ribeirão Preto, São Paulo, Brazil · On-site",
      responsibilities: t.raw(`companies.take.responsibilities`),
      skills: t.raw(`companies.take.skills`),
    },
    {
      jobTitle: t(`companies.suave.title`),
      company: "Suave Communication & Marketing",
      companyId: "suave",
      logo: "/company-logos/suave-logo.jpeg",
      period: "Jan 2022 - Nov 2022",
      location: "Ribeirão Preto, São Paulo, Brazil · Hybrid",
      responsibilities: t.raw(`companies.suave.responsibilities`),
      skills: t.raw(`companies.suave.skills`),
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={item}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {t("title")}
          </motion.h2>

          <div className="space-y-10 relative">
            {/* Timeline vertical line */}
            <motion.div
              className="absolute left-5 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900/50"
              style={{
                height: "calc(100% - 50px)",
                marginTop: "25px",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="experience-card bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer relative ml-10"
                whileHover={{
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Timeline node */}
                <div className="absolute -left-12 top-6 w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-400 dark:border-purple-700 flex items-center justify-center z-10">
                  <motion.div
                    className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  />
                </div>

                {/* Timeline connector line */}
                <motion.div
                  className="absolute -left-8 top-8 h-0.5 bg-purple-300 dark:bg-purple-800"
                  style={{ width: "8px" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
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
                      <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
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
                      className="px-3 py-1 bg-purple-300 dark:bg-purple-900/30 text-purple-900 dark:text-purple-300 text-xs rounded-full"
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
