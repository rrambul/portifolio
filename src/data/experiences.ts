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
    companyId: "skued",
    i18nKey: "freelance",
    company: "Skued",
    period: "Aug 2024 - Feb 2025",
    location: "Remote",
  },
  {
    companyId: "bymycell",
    i18nKey: "bymycell",
    company: "ByMyCell - Genomics Made Simple",
    period: "Sep 2024 - Jan 2025",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    companyId: "take",
    i18nKey: "take",
    company: "Take",
    period: "Nov 2022 - Sep 2024",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    companyId: "suave",
    i18nKey: "suave",
    company: "Suave Comunicação e Marketing",
    period: "Jan 2019 - Nov 2022",
    location: "Ribeirão Preto, São Paulo, Brazil · Hybrid",
  },
];
