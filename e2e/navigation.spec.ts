import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("redirects root to default locale", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(en|pt)$/);
  });

  test("renders sticky navigation bar", async ({ page }) => {
    await page.goto("/en");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("shows all navigation links on desktop", async ({ page }) => {
    await page.goto("/en");
    const nav = page.locator("nav");
    await expect(nav.getByText("Home")).toBeVisible();
    await expect(nav.getByText("About")).toBeVisible();
    await expect(nav.getByText("Experience")).toBeVisible();
    await expect(nav.getByText("Projects")).toBeVisible();
    await expect(nav.getByText("Interests")).toBeVisible();
    await expect(nav.getByText("Contact")).toBeVisible();
  });

  test("scrolls to About section when clicking About link", async ({ page }) => {
    await page.goto("/en");
    await page.locator("nav").getByRole("button", { name: "About" }).first().click();
    await expect(page.locator("#about")).toBeInViewport();
  });

  test("scrolls to Contact section when clicking Contact link", async ({ page }) => {
    await page.goto("/en");
    await page.locator("nav").getByRole("button", { name: "Contact" }).first().click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("highlights active section on scroll", async ({ page }) => {
    await page.goto("/en");
    // Scroll to about section
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const aboutButton = page.locator("nav").getByRole("button", { name: "About" });
    await expect(aboutButton).toHaveClass(/text-emerald/);
  });

  test("mobile hamburger menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en");

    // Open menu
    const hamburger = page.locator("nav button.md\\:hidden");
    await hamburger.click();
    // Wait for mobile menu animation
    await page.waitForTimeout(500);
    // The mobile menu should show navigation items
    const mobileAbout = page.locator("nav button").filter({ hasText: /^About$/ }).last();
    await expect(mobileAbout).toBeVisible();

    // Close menu
    await hamburger.click();
    await page.waitForTimeout(400);
  });
});
