import { redirect } from "next/navigation";

// Skills now live in a section on the homepage; this route redirects to the
// canonical anchor instead of serving a duplicate page.
export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}#skills`);
}
