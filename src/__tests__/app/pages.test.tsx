import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const redirect = vi.fn();
vi.mock("next/navigation", () => ({ redirect: (...a: unknown[]) => redirect(...a) }));

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

import Home, { generateMetadata } from "@/app/[locale]/page";
import AboutPage from "@/app/[locale]/about/page";
import ExperiencePage from "@/app/[locale]/experience/page";
import SkillsPage from "@/app/[locale]/skills/page";

describe("Home page", () => {
  it("composes all sections", () => {
    render(<Home />);
    for (const id of ["nav", "hero", "about", "experience", "skills", "projects", "interests", "contact", "footer"]) {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    }
  });

  it("generates English metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
    expect(meta.title).toContain("Software Developer");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect(meta.alternates?.canonical).toContain("/en");
  });

  it("generates Portuguese metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: "pt" }) });
    expect(meta.title).toContain("Desenvolvedor");
    expect(meta.openGraph?.locale).toBe("pt_BR");
    expect(meta.alternates?.canonical).toContain("/pt");
  });
});

describe("Duplicate section routes redirect to homepage anchors", () => {
  it("redirects /about to the homepage anchor", async () => {
    await AboutPage({ params: Promise.resolve({ locale: "en" }) });
    expect(redirect).toHaveBeenCalledWith("/en#about");
  });

  it("redirects /experience to the homepage anchor", async () => {
    await ExperiencePage({ params: Promise.resolve({ locale: "pt" }) });
    expect(redirect).toHaveBeenCalledWith("/pt#experience");
  });

  it("redirects /skills to the homepage anchor", async () => {
    await SkillsPage({ params: Promise.resolve({ locale: "en" }) });
    expect(redirect).toHaveBeenCalledWith("/en#skills");
  });
});
