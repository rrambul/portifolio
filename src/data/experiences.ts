export interface ExperienceData {
  companyId: string;
  /** Key under `experience.companies` in the message files. */
  i18nKey: string;
  company: string;
  period: string;
  location: string;
}

export const experiences: ExperienceData[] = [
  {
    companyId: "tas",
    i18nKey: "tas",
    company: "Translational Analytics & Statistics",
    period: "Jan 2025 - Present",
    location: "Arizona, United States · Remote",
  },
  {
    companyId: "freelance",
    i18nKey: "freelance",
    company: "Freelance",
    period: "Aug 2024 - Feb 2025",
    location: "Niterói, Rio de Janeiro, Brazil · Remote",
  },
  {
    companyId: "bymycell",
    i18nKey: "bymycell",
    company: "ByMyCell - Genomics Made Simple",
    period: "Sep 2023 - Jan 2025",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    companyId: "take",
    i18nKey: "take",
    company: "Take",
    period: "Nov 2021 - Sep 2023",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    companyId: "suave",
    i18nKey: "suave",
    company: "Suave Comunicação e Marketing",
    period: "Jan 2019 - Nov 2021",
    location: "Ribeirão Preto, São Paulo, Brazil · Hybrid",
  },
];
