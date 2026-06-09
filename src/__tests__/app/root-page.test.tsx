import { describe, it, expect, vi } from "vitest";

const redirect = vi.fn();
vi.mock("next/navigation", () => ({ redirect: (...a: unknown[]) => redirect(...a) }));

import RootPage from "@/app/page";

describe("Root page", () => {
  it("redirects to the default locale", () => {
    RootPage();
    expect(redirect).toHaveBeenCalledWith("/en");
  });
});
