// @vitest-environment node
import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/cv/route";

describe("GET /api/cv", () => {
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
});
