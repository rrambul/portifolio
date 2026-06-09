import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Interests } from "@/components/sections/Interests";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Metadata } from "next";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'pt' 
    ? 'Renan Rambul | Desenvolvedor de Software' 
    : 'Renan Rambul | Software Developer';
  
  const description = locale === 'pt'
    ? 'Portfolio de Renan Rambul, desenvolvedor de software apaixonado com mais de 6 anos de experiência em desenvolvimento web moderno, React, TypeScript e arquitetura de software.'
    : 'Portfolio of Renan Rambul, a passionate software developer with 6+ years of experience in modern web development, React, TypeScript, and software architecture.';

  return {
    title,
    description,
    keywords: locale === 'pt' 
      ? 'Renan Rambul, desenvolvedor de software, React, TypeScript, Next.js, frontend, backend, portfolio, Brasil'
      : 'Renan Rambul, software developer, React, TypeScript, Next.js, frontend, backend, portfolio, Brazil',
    authors: [{ name: 'Renan Rambul' }],
    creator: 'Renan Rambul',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `https://renanrambul.com/${locale}`,
      siteName: 'Renan Rambul Portfolio',
      images: [
        {
          url: '/og-home.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-home.png'],
      creator: '@renanrambul',
    },
    alternates: {
      canonical: `https://renanrambul.com/${locale}`,
      languages: {
        'en': 'https://renanrambul.com/en',
        'pt': 'https://renanrambul.com/pt',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Interests />
      <Contact />
      <Footer />
    </main>
  );
}
