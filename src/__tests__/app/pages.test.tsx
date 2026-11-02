import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const redirect = vi.fn();
const notFound = vi.fn(() => {
  // The real one throws to abort rendering; mirror that so a page cannot
  // fall through to a redirect after calling it.
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({
  redirect: (...a: unknown[]) => redirect(...a),
  notFound: () => notFound(),
}));

// Server-side translations backed by the real message files, so the metadata
// assertions check actual copy rather than echoed keys.
vi.mock("next-intl/server", async () => {
  const { default: en } = await import("@/messages/en/index.json");
  const { default: pt } = await import("@/messages/pt/index.json");
  return {
    getTranslations: async ({ locale, namespace }: { locale: string; namespace: string }) => {
      const tree = (locale === "pt" ? pt : en) as unknown as Record<string, Record<string, string>>;
      return (key: string) => tree[namespace]?.[key] ?? key;
    },
  };
});

// Stub the composed client components so the page tests focus on composition.
vi.mock("@/components/ui/Navigation", () => ({ Navigation: () => <nav data-testid="nav" /> }));
vi.mock("@/components/ui/Footer", () => ({ Footer: () => <footer data-testid="footer" /> }));
vi.mock("@/components/sections/Hero", () => ({ Hero: () => <div data-testid="hero" /> }));
vi.mock("@/components/sections/About", () => ({ About: () => <div data-testid="about" /> }));
vi.mock("@/components/sections/Experience", () => ({ Experience: () => <div data-testid="experience" /> }));
vi.mock("@/components/sections/Projects", () => ({ Projects: () => <div data-testid="projects" /> }));
vi.mock("@/components/sections/Interests", () => ({ Interests: () => <div data-testid="interests" /> }));
vi.mock("@/components/sections/Contact", () => ({ Contact: () => <div data-testid="contact" /> }));
vi.mock("@/components/sections/SkillsBento", () => ({ SkillsBento: () => <div data-testid="skills" /> }));
vi.mock("@/components/sections/Education", () => ({ Education: () => <div data-testid="education" /> }));

import Home, { generateMetadata } from "@/app/[locale]/page";
import SectionRedirect, { generateStaticParams } from "@/app/[locale]/[section]/page";

beforeEach(() => {
  redirect.mockClear();
  notFound.mockClear();
});

describe("Home page", () => {
  it("composes all sections", () => {
    render(<Home />);
    for (const id of ["nav", "hero", "about", "experience", "skills", "education", "projects", "contact", "footer"]) {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    }
  });

  it("leaves the parked Positions section out of the page", () => {
    render(<Home />);
    expect(screen.queryByTestId("interests")).not.toBeInTheDocument();
  });

  it("generates English metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
    expect(meta.title).toEqual({ absolute: "Renan Rambul | Senior Software Engineer" });
    expect(meta.description).toContain("7+ years");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect(meta.alternates?.canonical).toContain("/en");
  });

  it("generates Portuguese metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: "pt" }) });
    expect(meta.title).toEqual({ absolute: "Renan Rambul | Engenheiro de Software Sênior" });
    expect(meta.description).toContain("7 anos");
    expect(meta.openGraph?.locale).toBe("pt_BR");
    expect(meta.alternates?.canonical).toContain("/pt");
  });
});

describe("Section routes redirect to homepage anchors", () => {
  it.each(["about", "experience", "skills"])("redirects /%s to its anchor", async (section) => {
    await SectionRedirect({ params: Promise.resolve({ locale: "en", section }) });
    expect(redirect).toHaveBeenCalledWith(`/en#${section}`);
  });

  it("keeps the locale of the request", async () => {
    await SectionRedirect({ params: Promise.resolve({ locale: "pt", section: "experience" }) });
    expect(redirect).toHaveBeenCalledWith("/pt#experience");
  });

  it("404s anything that is not one of those sections", async () => {
    await expect(
      SectionRedirect({ params: Promise.resolve({ locale: "en", section: "nope" }) })
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(redirect).not.toHaveBeenCalled();
  });

  it("prerenders exactly the three section routes", () => {
    expect(generateStaticParams()).toEqual([
      { section: "about" },
      { section: "experience" },
      { section: "skills" },
    ]);
  });
});
