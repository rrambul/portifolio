import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { siteConfig } from "@/config/site";
import { experiences } from "@/data/experiences";
import { skillCategories } from "@/data/skills";
import enMessages from "@/messages/en/index.json";
import ptMessages from "@/messages/pt/index.json";
import type { Locale } from "../../i18n.config";

interface CompanyCopy {
  title: string;
  responsibilities: string[];
  skills: string[];
}

/** Labels that don't exist in the site messages. */
const LABELS: Record<Locale, { summary: string; generated: string }> = {
  en: { summary: "Summary", generated: "Generated from" },
  pt: { summary: "Resumo", generated: "Gerado a partir de" },
};

const ACCENT = "#047857";
const INK = "#18181b";
const MUTED = "#52525b";
const FAINT = "#a1a1aa";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 36,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: INK,
    lineHeight: 1.4,
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
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  paragraph: { color: INK },
  entry: { marginBottom: 10 },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  entryPeriod: { color: MUTED, fontSize: 9 },
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

function messagesFor(locale: Locale) {
  return locale === "pt" ? ptMessages : enMessages;
}

export function cvFileName(locale: Locale): string {
  return `Renan-Rambul-CV-${locale.toUpperCase()}.pdf`;
}

export function createCvDocument(locale: Locale) {
  const m = messagesFor(locale);
  const labels = LABELS[locale];
  const companies = m.experience.companies as Record<string, CompanyCopy>;
  const siteHost = siteConfig.url.replace(/^https?:\/\//, "");

  const contact = [
    { label: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
    { label: "github.com/rrambul", href: siteConfig.links.github },
    { label: "linkedin.com/in/renan-rambul", href: siteConfig.links.linkedin },
    { label: siteHost, href: siteConfig.url },
  ];

  return (
    <Document
      title={`${siteConfig.name} CV`}
      author={siteConfig.name}
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{siteConfig.name}</Text>
        <Text style={styles.role}>{m.hero.subtitle}</Text>
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

        {/* Summary */}
        <Text style={styles.sectionTitle}>{labels.summary}</Text>
        <Text style={styles.paragraph}>{m.about.content}</Text>

        {/* Experience */}
        <Text style={styles.sectionTitle}>{m.experience.title}</Text>
        {experiences.map((exp) => {
          const copy = companies[exp.i18nKey];
          if (!copy) return null;
          return (
            <View key={exp.companyId} style={styles.entry} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>
                  {copy.title} · {exp.company}
                </Text>
                <Text style={styles.entryPeriod}>{exp.period}</Text>
              </View>
              <Text style={styles.entryMeta}>{exp.location}</Text>
              {copy.responsibilities.map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <Text style={styles.bulletMark}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
              <Text style={styles.entrySkills}>{copy.skills.join(" · ")}</Text>
            </View>
          );
        })}

        {/* Skills */}
        <Text style={styles.sectionTitle}>{m.skills.title}</Text>
        {skillCategories.map((category) => (
          <View key={category.titleKey} style={styles.skillCategoryRow}>
            <Text style={styles.skillCategoryLabel}>
              {m.skills[category.titleKey as "frontend"]}
            </Text>
            <Text style={styles.skillCategoryItems}>
              {category.skills.join(", ")}
            </Text>
          </View>
        ))}

        {/* Languages */}
        <Text style={styles.sectionTitle}>{m.about.languages.title}</Text>
        <Text style={styles.paragraph}>{m.about.languages.content}</Text>

        <Text style={styles.footer} fixed>
          {labels.generated} {siteHost}
        </Text>
      </Page>
    </Document>
  );
}
