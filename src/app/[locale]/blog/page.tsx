import { Blog } from "@/components/sections/Blog";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return buildMetadata({
    locale,
    path: "/blog",
    title: `${t("title")} | Renan Rambul`,
    description: t("subtitle"),
  });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Blog />
      <Footer />
    </main>
  );
}
