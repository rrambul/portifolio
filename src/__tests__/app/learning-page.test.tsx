import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
}));

vi.mock("@/components/ui/Navigation", () => ({ Navigation: () => <nav data-testid="nav" /> }));
vi.mock("@/components/ui/Footer", () => ({ Footer: () => <footer data-testid="footer" /> }));
vi.mock("@/components/sections/LearningLog", () => ({
  LearningLog: () => <div data-testid="learning" />,
}));

import LearningPage, { generateMetadata } from "@/app/[locale]/learning/page";

describe("Learning page", () => {
  it("composes Navigation, LearningLog, and Footer", () => {
    render(<LearningPage />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
    expect(screen.getByTestId("learning")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("builds localized en metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
    expect(meta.alternates?.canonical).toContain("/en/learning");
    expect(meta.openGraph?.locale).toBe("en_US");
  });

  it("builds localized pt metadata", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ locale: "pt" }) });
    expect(meta.alternates?.canonical).toContain("/pt/learning");
    expect(meta.openGraph?.locale).toBe("pt_BR");
  });
});
