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

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_t, prop) =>
        ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
          const Tag = prop as keyof JSX.IntrinsicElements;
          const htmlProps: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(props)) {
            if (
              !k.startsWith("while") &&
              !k.startsWith("animate") &&
              !k.startsWith("initial") &&
              !["transition", "variants", "viewport", "exit"].includes(k)
            ) {
              htmlProps[k] = v;
            }
          }
          return <Tag {...htmlProps}>{children}</Tag>;
        },
    }
  ),
}));

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
