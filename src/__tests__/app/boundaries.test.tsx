import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
  ),
}));

import NotFound from "@/app/[locale]/not-found";
import ErrorBoundary from "@/app/[locale]/error";

describe("App Router boundaries", () => {
  it("not-found renders 404 and a link to the locale home", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("home").closest("a")).toHaveAttribute("href", "/en");
  });

  it("error renders a retry button that calls reset", () => {
    const reset = vi.fn();
    render(<ErrorBoundary error={new Error("boom")} reset={reset} />);
    expect(screen.getByText("title")).toBeInTheDocument();
    fireEvent.click(screen.getByText("retry"));
    expect(reset).toHaveBeenCalled();
  });
});
