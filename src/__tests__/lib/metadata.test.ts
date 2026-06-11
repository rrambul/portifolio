import { describe, it, expect } from "vitest";
import { buildMetadata, ogLocale } from "@/lib/metadata";

describe("ogLocale", () => {
  it("maps locales to OpenGraph codes", () => {
    expect(ogLocale("pt")).toBe("pt_BR");
    expect(ogLocale("en")).toBe("en_US");
    expect(ogLocale("anything-else")).toBe("en_US");
  });
});

describe("buildMetadata", () => {
  it("builds website metadata with sensible defaults", () => {
    const meta = buildMetadata({
      locale: "en",
      title: "Home | Renan",
      description: "desc",
    });

    expect(meta.title).toBe("Home | Renan");
    // @ts-expect-error narrow OG union in test
    expect(meta.openGraph?.type).toBe("website");
    expect(meta.openGraph?.locale).toBe("en_US");
    expect(meta.openGraph?.url).toBe("https://renanrambul.dev/en");
    expect(meta.alternates?.canonical).toBe("https://renanrambul.dev/en");
    expect(meta.alternates?.languages).toMatchObject({
      en: "https://renanrambul.dev/en",
      pt: "https://renanrambul.dev/pt",
    });
    // default image resolved to an absolute URL
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "https://renanrambul.dev/og-home.png" }),
    ]);
    // optional fields omitted when not provided
    expect(meta.keywords).toBeUndefined();
    expect(meta.authors).toBeUndefined();
    expect(meta.other).toBeUndefined();
  });

  it("builds article metadata with the locale path, keywords, and extra tags", () => {
    const meta = buildMetadata({
      locale: "pt",
      title: "Post | Renan",
      description: "resumo",
      path: "/blog/my-post",
      type: "article",
      image: "/blog/banner.png",
      keywords: "a, b",
      authors: [{ name: "Renan" }],
      article: {
        publishedTime: "2025-01-01T00:00:00.000Z",
        authors: ["Renan"],
        tags: ["x"],
      },
      other: { "article:section": "Technology" },
    });

    // @ts-expect-error narrow OG union in test
    expect(meta.openGraph?.type).toBe("article");
    expect(meta.openGraph?.locale).toBe("pt_BR");
    expect(meta.openGraph?.url).toBe("https://renanrambul.dev/pt/blog/my-post");
    expect(meta.keywords).toBe("a, b");
    expect(meta.authors).toEqual([{ name: "Renan" }]);
    expect(meta.other).toEqual({ "article:section": "Technology" });
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "https://renanrambul.dev/blog/banner.png" }),
    ]);
  });

  it("passes through absolute image URLs unchanged", () => {
    const meta = buildMetadata({
      locale: "en",
      title: "t",
      description: "d",
      image: "https://cdn.example.com/x.png",
    });
    expect(meta.openGraph?.images).toEqual([
      expect.objectContaining({ url: "https://cdn.example.com/x.png" }),
    ]);
  });
});
