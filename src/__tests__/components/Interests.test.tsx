import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
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

import { Interests } from "@/components/sections/Interests";
import { interests } from "@/data/interests";

describe("Interests", () => {
  it("renders the section with id 'interests'", () => {
    const { container } = render(<Interests />);
    expect(container.querySelector("#interests")).toBeInTheDocument();
  });

  it("renders the title and subtitle", () => {
    render(<Interests />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
  });

  it("renders an item for every interest key", () => {
    render(<Interests />);
    for (const { key } of interests) {
      expect(screen.getByText(`items.${key}`)).toBeInTheDocument();
    }
  });

  it("renders one icon per interest", () => {
    const { container } = render(<Interests />);
    // react-icons render as <svg>; each interest has one icon
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(
      interests.length
    );
  });
});
