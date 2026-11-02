// @vitest-environment node
import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "@/app/api/cv/route";
import { resetRateLimit } from "@/lib/rate-limit";
import { createCvDocument } from "@/lib/cv";
import { experiences } from "@/data/experiences";
import en from "@/messages/en/index.json";

/**
 * Recursively collect every text leaf from a react-pdf element tree. The
 * document is split into plain function components (no hooks), so those are
 * expanded by calling them, the way a renderer would.
 */
function collectText(node: unknown, out: string[] = []): string[] {
  if (node == null || typeof node === "boolean") return out;
  if (typeof node === "string" || typeof node === "number") {
    out.push(String(node));
    return out;
  }
  if (Array.isArray(node)) {
    for (const child of node) collectText(child, out);
    return out;
  }
  if (typeof node === "object" && "props" in node) {
    const element = node as { type?: unknown; props?: { children?: unknown } };
    if (typeof element.type === "function") {
      collectText((element.type as (props: unknown) => unknown)(element.props), out);
    } else {
      collectText(element.props?.children, out);
    }
  }
  return out;
}

describe("GET /api/cv", () => {
  beforeEach(() => resetRateLimit());

  it("returns a real PDF for the default (en) locale", async () => {
    const res = await GET(new Request("http://localhost/api/cv"));

    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/pdf");
    expect(res.headers.get("content-disposition")).toContain(
      "Renan-Rambul-CV-EN.pdf"
    );

    const buf = Buffer.from(await res.arrayBuffer());
    expect(buf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(buf.length).toBeGreaterThan(1000);
  }, 30000);

  it("returns the Portuguese variant", async () => {
    const res = await GET(new Request("http://localhost/api/cv?locale=pt"));

    expect(res.status).toBe(200);
    expect(res.headers.get("content-disposition")).toContain(
      "Renan-Rambul-CV-PT.pdf"
    );
  }, 30000);

  it("falls back to English for unknown locales", async () => {
    const res = await GET(new Request("http://localhost/api/cv?locale=xx"));
    expect(res.headers.get("content-disposition")).toContain("CV-EN.pdf");
  }, 30000);

  it("rate-limits bursts from the same client", async () => {
    const req = () =>
      GET(
        new Request("http://localhost/api/cv", {
          headers: { "x-forwarded-for": "9.9.9.9" },
        })
      );
    for (let i = 0; i < 10; i++) {
      expect((await req()).status).toBe(200);
    }
    expect((await req()).status).toBe(429);
  }, 60000);
});

describe("CV length", () => {
  /** Pages in a rendered PDF: react-pdf writes one `/Type /Page` object per page. */
  async function pageCount(locale: "en" | "pt"): Promise<number> {
    const res = await GET(new Request(`http://localhost/api/cv?locale=${locale}`));
    const pdf = Buffer.from(await res.arrayBuffer()).toString("latin1");
    return (pdf.match(/\/Type\s*\/Page(?![s])/g) ?? []).length;
  }

  // Both locales are meant to fit on two pages, and Portuguese runs longer
  // than English with only a few points to spare, so any copy or style change
  // that spills a third page fails here instead of in the download.
  it.each(["en", "pt"] as const)("the %s CV is exactly two pages", async (locale) => {
    expect(await pageCount(locale)).toBe(2);
  }, 30000);
});

describe("createCvDocument structure", () => {
  it("includes every experience and its responsibility bullets", () => {
    const text = collectText(createCvDocument("en")).join("\n");

    for (const exp of experiences) {
      expect(text, `company "${exp.company}" missing from CV`).toContain(
        exp.company
      );
    }

    // Guard the bullet pipeline: a regression that dropped responsibilities
    // would still emit a valid PDF, so assert the actual copy is present.
    const companies = en.experience.companies as Record<
      string,
      { responsibilities: string[] }
    >;
    const firstBullet = companies[experiences[0]!.id]!.responsibilities[0]!;
    expect(text).toContain(firstBullet);
  });

  it("skips an experience whose copy is missing instead of printing its key", () => {
    experiences.push({
      id: "notTranslated",
      company: "Ghost Co",
      period: "Jan 2030 - Present",
      location: "Nowhere · Remote",
    });
    try {
      const text = collectText(createCvDocument("en")).join("\n");
      expect(text).not.toContain("Ghost Co");
      expect(text).not.toContain("experience.companies.notTranslated");
    } finally {
      experiences.pop();
    }
  });

  it("uses the Portuguese-only labels for the pt locale", () => {
    const text = collectText(createCvDocument("pt")).join("\n");

    // "Resumo" / "Summary" come from the `cv` namespace in the message files,
    // so they prove the pt message tree was the one rendered.
    expect(text).toContain("Resumo");
    expect(text).not.toContain("Summary");
  });
});
