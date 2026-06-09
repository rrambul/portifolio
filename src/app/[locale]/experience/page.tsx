import { redirect } from "next/navigation";

// The Experience section lives on the homepage; this route only existed as a
// duplicate. Redirect to the canonical anchor instead of serving it twice.
export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}#experience`);
}
