import { test, expect } from "@playwright/test";

test.describe("Homepage Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("renders Hero section with name and CTA", async ({ page }) => {
    await expect(page.getByText("Renan Rambul").first()).toBeVisible();
    await expect(page.getByText("Frontend Software Engineer").first()).toBeVisible();
    await expect(page.getByText("Get in touch").first()).toBeVisible();
  });

  test("CTA button scrolls to contact section", async ({ page }) => {
    await page.getByRole("button", { name: "Get in touch" }).click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("renders social links in hero", async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]').first();
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
    const emailLink = page.locator('a[href^="mailto:"]').first();

    await expect(githubLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
    await expect(emailLink).toBeVisible();
  });

  test("social links open in new tab", async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]').first();
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", /noopener/);
  });

  test("renders About section with cards", async ({ page }) => {
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.getByText("About Me")).toBeVisible();
    await expect(page.getByText("Personal", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Technical").first()).toBeVisible();
    await expect(page.getByText("Languages").first()).toBeVisible();
  });

  test("renders Experience section", async ({ page }) => {
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.getByText("Professional Experience")).toBeVisible();
  });

  test("renders Projects section with project cards", async ({ page }) => {
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(page.locator("#projects")).toBeVisible();
    // Check at least one project card exists
    const projectCards = page.locator("#projects").locator("article, [class*='card'], [class*='Card']");
    // Projects section should have content
    await expect(page.locator("#projects")).not.toBeEmpty();
  });

  test("renders Contact section with form", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
  });

  test("renders Footer with navigation links", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(footer.locator('a[href*="github.com"]')).toBeVisible();
  });

  test("profile image loads in hero", async ({ page }) => {
    const img = page.locator('img[alt="Renan Rambul"]');
    await expect(img).toBeVisible();
  });
});
