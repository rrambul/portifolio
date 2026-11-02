import { test, expect } from "@playwright/test";
import { expectNoAxeViolations, setTheme } from "./support/a11y";

test.describe("Learning log", () => {
  test("renders the page with its own h1", async ({ page }) => {
    await page.goto("/en/learning");
    await expect(page.locator("#learning")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("lists the currently-reading book and the shelf", async ({ page }) => {
    await page.goto("/en/learning");
    await expect(page.getByText("System Design Interview")).toBeVisible();
    await expect(page.getByText("Clean Code")).toBeVisible();
    await expect(page.getByText("The Pragmatic Programmer")).toBeVisible();
  });

  test("lists the MBA in progress above the log", async ({ page }) => {
    await page.goto("/en/learning");
    await expect(page.getByText("MBA, Software Architecture")).toBeVisible();
    await expect(page.getByText("Full Cycle", { exact: true })).toBeVisible();
    await expect(page.getByText("Sep 2026 - May 2028")).toBeVisible();
  });

  test("shows curriculum progress as a fraction, never as a bar", async ({
    page,
  }) => {
    await page.goto("/en/learning");
    const forge = page.locator("#learning").getByText("in the forge");
    await expect(forge).toBeVisible();
    // A committed snapshot, so the page has to say when it was taken.
    await expect(page.locator("#learning time[datetime]").last()).toBeVisible();
    await expect(page.getByText(/module \d+ of \d+/).first()).toBeVisible();
    // The honesty rule this block inherits from Mindforge: fractions only.
    await expect(page.locator('#learning [role="progressbar"]')).toHaveCount(0);
  });

  test("renders books without a link as plain text", async ({ page }) => {
    await page.goto("/en/learning");
    // A book with no canonical url must not become an empty or dead anchor.
    const link = page.locator("#learning a", { hasText: "Clean Code" });
    await expect(link).toHaveCount(0);
  });

  test("dated entries link out in a new tab", async ({ page }) => {
    await page.goto("/en/learning");
    const link = page.locator("#learning a[target=_blank]").first();
    await expect(link).toHaveAttribute("rel", /noopener/);
  });

  test("renders in Portuguese", async ({ page }) => {
    await page.goto("/pt/learning");
    await expect(page.locator("#learning")).toBeVisible();
    await expect(page.getByText("System Design Interview")).toBeVisible();
  });

  for (const theme of ["dark", "light"] as const) {
    test(`has no axe violations (${theme})`, async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/en/learning");
      await expectNoAxeViolations(page);
    });
  }
});
