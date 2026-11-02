import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/lib/scroll", () => ({
  scrollToSection: vi.fn(),
}));

import { scrollToSection } from "@/lib/scroll";

// Mock siteConfig
vi.mock("@/config/site", () => ({
  siteConfig: {
    name: "Test User",
    host: "renanrambul.dev",
    links: {
      github: "https://github.com/testuser",
      linkedin: "https://www.linkedin.com/in/testuser/",
      email: "test@example.com",
    },
  },
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

import { Footer } from "@/components/ui/Footer";

/** Put a homepage section in the document so anchors resolve to a scroll. */
function mountSection(id: string) {
  const section = document.createElement("div");
  section.id = id;
  document.body.appendChild(section);
}

beforeEach(() => {
  push.mockClear();
  vi.mocked(scrollToSection).mockClear();
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("Footer", () => {
  it("renders the footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders the wordmark", () => {
    render(<Footer />);
    expect(screen.getByText("renanrambul.dev")).toBeInTheDocument();
  });

  it("renders social links with correct hrefs", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/testuser");
    expect(hrefs).toContain("https://www.linkedin.com/in/testuser/");
    expect(hrefs).toContain("mailto:test@example.com");
  });

  it("opens external social links in a new tab but not the mailto", () => {
    render(<Footer />);

    for (const label of ["GitHub", "LinkedIn"]) {
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    const email = screen.getByLabelText("Email");
    expect(email).not.toHaveAttribute("target");
    expect(email).not.toHaveAttribute("rel");
  });

  it("scrolls to the about section when the wordmark is clicked on the homepage", () => {
    mountSection("about");
    render(<Footer />);
    fireEvent.click(screen.getByText("renanrambul.dev"));
    expect(scrollToSection).toHaveBeenCalledWith("about");
    expect(push).not.toHaveBeenCalled();
  });

  it("renders navigation buttons", () => {
    render(<Footer />);
    expect(screen.getByText("aboutLink")).toBeInTheDocument();
    expect(screen.getByText("experienceLink")).toBeInTheDocument();
    expect(screen.getByText("projectsLink")).toBeInTheDocument();
  });

  it("scrolls to the matching section when a quick link is clicked on the homepage", () => {
    for (const id of ["about", "experience", "projects"]) mountSection(id);
    render(<Footer />);
    fireEvent.click(screen.getByText("aboutLink"));
    expect(scrollToSection).toHaveBeenCalledWith("about");
    fireEvent.click(screen.getByText("experienceLink"));
    expect(scrollToSection).toHaveBeenCalledWith("experience");
    fireEvent.click(screen.getByText("projectsLink"));
    expect(scrollToSection).toHaveBeenCalledWith("projects");
    expect(push).not.toHaveBeenCalled();
  });

  it("routes to the homepage anchor from a page without sections", () => {
    // The /learning page renders the footer but none of the homepage sections,
    // so a quick link has nothing to scroll to and must navigate instead.
    render(<Footer />);
    fireEvent.click(screen.getByText("projectsLink"));
    expect(push).toHaveBeenCalledWith("/en#projects");
    expect(scrollToSection).not.toHaveBeenCalled();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    const copyright = screen.getByText((content) => content.includes(year));
    expect(copyright).toBeInTheDocument();
  });
});
