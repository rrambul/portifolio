import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { SkillsBento } from "@/components/sections/SkillsBento";
import { Projects } from "@/components/sections/Projects";
import { Interests } from "@/components/sections/Interests";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    image: "/og-home.png",
    title:
      locale === "pt"
        ? "Renan Rambul | Desenvolvedor de Software"
        : "Renan Rambul | Software Developer",
    description:
      locale === "pt"
        ? "Portfolio de Renan Rambul, engenheiro de software apaixonado com mais de 6 anos de experiência construindo produtos web de ponta a ponta com React, TypeScript e Node.js."
        : "Portfolio of Renan Rambul, a passionate software engineer with 6+ years of experience building web products end to end with React, TypeScript, and Node.js.",
    keywords:
      locale === "pt"
        ? "Renan Rambul, desenvolvedor de software, React, TypeScript, Next.js, frontend, backend, portfolio, Brasil"
        : "Renan Rambul, software developer, React, TypeScript, Next.js, frontend, backend, portfolio, Brazil",
    authors: [{ name: "Renan Rambul" }],
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
      <Projects />
      <Interests />
      <Contact />
      <Footer />
    </main>
  );
}
