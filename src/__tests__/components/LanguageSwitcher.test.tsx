import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const h = vi.hoisted(() => ({
  replace: vi.fn(),
  locale: { current: "en" },
}));

vi.mock("next-intl", () => ({
  useLocale: () => h.locale.current,
}));

vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({ replace: h.replace }),
  usePathname: () => "/",
}));

vi.mock("framer-motion");

import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

beforeEach(() => {
  h.replace.mockClear();
  h.locale.current = "en";
});

describe("LanguageSwitcher", () => {
  it("renders EN and PT options with the current locale checked", () => {
    render(<LanguageSwitcher />);
    expect(screen.getByLabelText("English")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByLabelText("Português")).toHaveAttribute("aria-checked", "false");
  });

  it("switches to the other locale when clicked", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByLabelText("Português"));
    expect(h.replace).toHaveBeenCalledWith("/", { locale: "pt", scroll: false });
  });

  it("does nothing when the current locale is clicked again", () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByLabelText("English"));
    expect(h.replace).not.toHaveBeenCalled();
  });

  it("reflects a PT locale", () => {
    h.locale.current = "pt";
    render(<LanguageSwitcher />);
    expect(screen.getByLabelText("Português")).toHaveAttribute("aria-checked", "true");
  });
});
