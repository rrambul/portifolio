import { LearningLog } from "@/components/sections/LearningLog";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";

interface LearningPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LearningPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "learning" });

  return buildMetadata({
    locale,
    path: "/learning",
    title: `${t("title")} | Renan Rambul`,
    description: t("subtitle"),
  });
}

export default function LearningPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <LearningLog />
      <Footer />
    </main>
  );
}
