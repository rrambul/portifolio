import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { SkillsBento } from "@/components/sections/SkillsBento";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
// Positions is parked for now. Uncomment this import and the <Interests />
// below to bring the section back; the component, its data and its copy all
// stay in the repo, still unit tested.
// import { Interests } from "@/components/sections/Interests";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { toLocale } from "@/i18n/config";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    title: `${siteConfig.name} | ${siteConfig.role[toLocale(locale)]}`,
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: siteConfig.name }],
  });
}

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <SkillsBento />
      <Education />
      <Projects />
      {/* <Interests /> */}
      <Contact />
      <Footer />
    </main>
  );
}
