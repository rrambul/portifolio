import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Translation function that also supports `.raw` for array values.
const t = Object.assign((key: string) => key, {
  raw: (key: string) => {
    if (key.endsWith("responsibilities")) return ["Built things", "Shipped features"];
    if (key.endsWith("skills")) return ["React", "TypeScript"];
    return key;
  },
});

vi.mock("next-intl", () => ({
  useTranslations: () => t,
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt as string} {...props} />
  ),
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

import { Experience } from "@/components/sections/Experience";
import { experiences } from "@/data/experiences";

describe("Experience", () => {
  it("renders the section with id 'experience'", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("#experience")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Experience />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("renders every company from the data", () => {
    render(<Experience />);
    for (const exp of experiences) {
      expect(screen.getByText(exp.company)).toBeInTheDocument();
    }
  });

  it("renders periods and locations", () => {
    render(<Experience />);
    expect(screen.getByText(experiences[0].period)).toBeInTheDocument();
    expect(screen.getByText(experiences[0].location)).toBeInTheDocument();
  });

  it("renders responsibilities and skill pills from t.raw", () => {
    render(<Experience />);
    expect(screen.getAllByText("Built things").length).toBe(experiences.length);
    expect(screen.getAllByText("React").length).toBe(experiences.length);
  });

  it("renders company logos with alt text", () => {
    render(<Experience />);
    const logos = screen.getAllByRole("img");
    expect(logos.length).toBe(experiences.length);
    expect(logos[0]).toHaveAttribute("alt", `${experiences[0].company} logo`);
  });
});
