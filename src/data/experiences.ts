export interface ExperienceData {
  /** Also the key under `experience.companies` in the message files. */
  id: string;
  company: string;
  period: string;
  location: string;
  /** The role I am in now. Drives the live marker and the JSON-LD `worksFor`. */
  current?: true;
}

export const experiences: ExperienceData[] = [
  {
    id: "tas",
    company: "Translational Analytics & Statistics",
    period: "Jan 2025 - Present",
    location: "Arizona, United States · Remote",
    current: true,
  },
  {
    id: "freelance",
    company: "Freelance",
    period: "Aug 2024 - Feb 2025",
    location: "Niterói, Rio de Janeiro, Brazil · Remote",
  },
  {
    id: "bymycell",
    company: "ByMyCell - Genomics Made Simple",
    period: "Sep 2023 - Jan 2025",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    id: "take",
    company: "Take",
    period: "Nov 2021 - Sep 2023",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    id: "suave",
    company: "Suave Comunicação e Marketing",
    period: "Jan 2019 - Nov 2021",
    location: "Ribeirão Preto, São Paulo, Brazil · Hybrid",
  },
];
