import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTranslator } from "next-intl";
import { siteConfig } from "@/config/site";
import { experiences } from "@/data/experiences";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import type { Locale } from "@/i18n/config";
import { messagesFor } from "@/i18n/messages";
import { displayUrl } from "@/lib/url";

/**
 * The CV is the site's content in a second medium: the same identity from
 * siteConfig, the same data files, the same copy from the message files, read
 * here through `createTranslator` so no request context is needed.
 */

type Translator = ReturnType<typeof createTranslator>;

const ACCENT = "#047857";
const INK = "#18181b";
const MUTED = "#52525b";
const FAINT = "#a1a1aa";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 28,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: INK,
    // 1.35 rather than 1.4: Portuguese runs noticeably longer than English, and
    // at 1.4 the PT CV spilled the Languages block (wrap={false}) onto a third
    // page by a few points. Both locales are two pages, and PT has only a few
    // points to spare, so measure it (not just EN) after any content change.
    lineHeight: 1.35,
  },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", lineHeight: 1.2, marginBottom: 4 },
  role: { fontSize: 11, color: ACCENT, marginBottom: 2 },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
    gap: 4,
  },
  contactItem: { color: MUTED, textDecoration: "none", fontSize: 9 },
  contactSeparator: { color: FAINT, fontSize: 9 },
  // The three margins below (page padding, section title, entry) were each
  // pulled in by a point or two when Education was added: the block costs the
  // PT CV about a section's worth of height, and this bought it back without
  // touching the type scale.
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  paragraph: { color: INK },
  entry: { marginBottom: 9 },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  // The title shrinks and wraps so a long one can never run into the date.
  entryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    flexShrink: 1,
    marginRight: 12,
  },
  entryPeriod: { color: MUTED, fontSize: 9, flexShrink: 0 },
  entryMeta: { color: MUTED, fontSize: 9, marginBottom: 3 },
  bulletRow: { flexDirection: "row", marginBottom: 1.5 },
  bulletMark: { width: 10, color: ACCENT },
  bulletText: { flex: 1 },
  entrySkills: { color: MUTED, fontSize: 8.5, marginTop: 3 },
  skillCategoryRow: { flexDirection: "row", marginBottom: 3 },
  skillCategoryLabel: { width: 90, fontFamily: "Helvetica-Bold" },
  skillCategoryItems: { flex: 1, color: MUTED },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 44,
    right: 44,
    textAlign: "center",
    fontSize: 8,
    color: FAINT,
  },
});

export function cvFileName(locale: Locale): string {
  return `${siteConfig.name.replace(/\s+/g, "-")}-CV-${locale.toUpperCase()}.pdf`;
}

/** Whether the active locale has copy at this message path. */
function hasCopy(t: Translator, path: string): boolean {
  return (t.has as (key: string) => boolean)(path);
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function Header({ locale }: { locale: Locale }) {
  const contact = [
    { label: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
    { label: displayUrl(siteConfig.links.github), href: siteConfig.links.github },
    { label: displayUrl(siteConfig.links.linkedin), href: siteConfig.links.linkedin },
    { label: siteConfig.host, href: siteConfig.url },
  ];

  return (
    <>
      <Text style={styles.name}>{siteConfig.name}</Text>
      <Text style={styles.role}>{siteConfig.role[locale]}</Text>
      <View style={styles.contactRow}>
        {contact.map((item, idx) => (
          <View key={item.href} style={{ flexDirection: "row", gap: 4 }}>
            {idx > 0 && <Text style={styles.contactSeparator}>|</Text>}
            <Link src={item.href} style={styles.contactItem}>
              {item.label}
            </Link>
          </View>
        ))}
      </View>
    </>
  );
}

function ExperienceBlock({ t }: { t: Translator }) {
  return (
    <>
      <SectionTitle>{t("experience.title")}</SectionTitle>
      {experiences.map((exp) => {
        const copy = `experience.companies.${exp.id}`;
        // Skip an entry whose copy is missing rather than print a raw key or
        // crash the download. The drift test fails CI on it first; this is the
        // runtime safety net.
        if (!hasCopy(t, copy)) return null;
        const responsibilities = t.raw(`${copy}.responsibilities`) as string[];
        const skills = t.raw(`${copy}.skills`) as string[];
        return (
          <View key={exp.id} style={styles.entry} wrap={false}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>
                {t(`${copy}.title`)} · {exp.company}
              </Text>
              <Text style={styles.entryPeriod}>{exp.period}</Text>
            </View>
            <Text style={styles.entryMeta}>{exp.location}</Text>
            {responsibilities.map((item, idx) => (
              <View key={`${idx}-${item}`} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
            <Text style={styles.entrySkills}>{skills.join(" · ")}</Text>
          </View>
        );
      })}
    </>
  );
}

function SkillsBlock({ t }: { t: Translator }) {
  return (
    <>
      <SectionTitle>{t("skills.title")}</SectionTitle>
      {skillCategories.map((category) => (
        <View key={category.id} style={styles.skillCategoryRow}>
          <Text style={styles.skillCategoryLabel}>{t(`skills.${category.id}`)}</Text>
          <Text style={styles.skillCategoryItems}>{category.skills.join(", ")}</Text>
        </View>
      ))}
    </>
  );
}

/** The self-taught line carries more here than the one degree under it does, so it comes first. */
function EducationBlock({ t }: { t: Translator }) {
  return (
    <View wrap={false}>
      <SectionTitle>{t("education.title")}</SectionTitle>
      <Text style={[styles.paragraph, { marginBottom: 6 }]}>{t("education.subtitle")}</Text>
      {education.map((entry) => {
        const copy = `education.entries.${entry.id}`;
        if (!hasCopy(t, copy)) return null;
        return (
          <View key={entry.id} style={styles.entryHeader}>
            <Text style={styles.entryTitle}>
              {t(`${copy}.degree`)} · {entry.institution}
            </Text>
            {entry.period ? <Text style={styles.entryPeriod}>{entry.period}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

export function createCvDocument(locale: Locale) {
  const t = createTranslator({ locale, messages: messagesFor(locale) });

  return (
    <Document
      title={`${siteConfig.name} CV`}
      author={siteConfig.name}
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        <Header locale={locale} />

        <SectionTitle>{t("cv.summary")}</SectionTitle>
        <Text style={styles.paragraph}>{t("about.content")}</Text>

        <ExperienceBlock t={t} />
        <SkillsBlock t={t} />
        <EducationBlock t={t} />

        <View wrap={false}>
          <SectionTitle>{t("about.languages.title")}</SectionTitle>
          <Text style={styles.paragraph}>{t("about.languages.content")}</Text>
        </View>

        <Text style={styles.footer} fixed>
          {t("cv.generated")} {siteConfig.host}
        </Text>
      </Page>
    </Document>
  );
}
