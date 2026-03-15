import { Blog } from "@/components/sections/Blog";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  const title = `${t('title')} | Renan Rambul`;
  const description = t('subtitle');
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `https://renanrambul.com/${locale}/blog`,
      siteName: 'Renan Rambul Portfolio',
      images: [
        {
          url: '/og-blog.png',
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
      images: ['/og-blog.png'],
    },
    alternates: {
      canonical: `https://renanrambul.com/${locale}/blog`,
      languages: {
        'en': 'https://renanrambul.com/en/blog',
        'pt': 'https://renanrambul.com/pt/blog',
      },
    },
  };
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-teal-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-teal-950">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100/40 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-100/40 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-emerald-100/40 dark:bg-emerald-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        <Navigation />
        <Blog />
        <Footer />
      </div>
    </main>
  );
}
