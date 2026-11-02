import { notFound, redirect } from "next/navigation";

/**
 * Homepage sections that once had routes of their own (/about, /experience,
 * /skills). Each redirects to its anchor instead of serving the content
 * twice. Anything else under /[locale]/ is a 404, not a redirect.
 */
const SECTION_ROUTES = ["about", "experience", "skills"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTION_ROUTES.map((section) => ({ section }));
}

export default async function SectionRedirect({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  if (!(SECTION_ROUTES as readonly string[]).includes(section)) notFound();
  redirect(`/${locale}#${section}`);
}
