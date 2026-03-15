export interface ExperienceData {
  companyId: string;
  company: string;
  logo: string;
  period: string;
  location: string;
}

export const experiences: ExperienceData[] = [
  {
    companyId: "tas",
    company: "Translational Analytics & Statistics",
    logo: "/company-logos/tas-logo.png",
    period: "Jan 2025 - Present",
    location: "Arizona, United States · Remote",
  },
  {
    companyId: "skued",
    company: "Skued",
    logo: "/company-logos/freelance.svg",
    period: "Aug 2024 - Feb 2025",
    location: "Remote",
  },
  {
    companyId: "bymycell",
    company: "ByMyCell - Genomics Made Simple",
    logo: "/company-logos/bymycell-logo.jpeg",
    period: "Sep 2024 - Jan 2025",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    companyId: "take",
    company: "Take",
    logo: "/company-logos/take-logo.jpeg",
    period: "Nov 2022 - Sep 2024",
    location: "Ribeirão Preto, São Paulo, Brazil · On-site",
  },
  {
    companyId: "suave",
    company: "Suave Comunicação e Marketing",
    logo: "/company-logos/suave-logo.jpeg",
    period: "Jan 2019 - Nov 2022",
    location: "Ribeirão Preto, São Paulo, Brazil · Hybrid",
  },
];
