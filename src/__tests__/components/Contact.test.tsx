import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock framer-motion
vi.mock("framer-motion");

// Mock AnimatedContactForm
vi.mock("@/components/ui/AnimatedContactForm", () => ({
  AnimatedContactForm: () => <div data-testid="contact-form" />,
}));

import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the section with id 'contact'", () => {
    const { container } = render(<Contact />);
    const section = container.querySelector("#contact");
    expect(section).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Contact />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Contact />);
    expect(screen.getByText("description")).toBeInTheDocument();
  });

  it("renders the AnimatedContactForm", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });
});
