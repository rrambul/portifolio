import { test, expect } from "@playwright/test";

test.describe("Internationalization", () => {
  test("English locale shows English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByText("Hello, I'm")).toBeVisible();
    await expect(page.getByText("Software Engineer").first()).toBeVisible();
    await expect(page.getByText("Get in touch").first()).toBeVisible();
  });

  test("Portuguese locale shows Portuguese content", async ({ page }) => {
    await page.goto("/pt");
    await expect(page.getByText("Olá, eu sou")).toBeVisible();
    await expect(page.getByText("Engenheiro de Software").first()).toBeVisible();
    await expect(page.getByText("Entre em contato").first()).toBeVisible();
  });

  test("navigation items change language", async ({ page }) => {
    await page.goto("/pt");
    const nav = page.locator("nav");
    await expect(nav.getByText("Início")).toBeVisible();
    await expect(nav.getByText("Sobre")).toBeVisible();
    await expect(nav.getByText("Experiência")).toBeVisible();
    await expect(nav.getByText("Contato")).toBeVisible();
  });

  test("language switcher changes locale", async ({ page }) => {
    await page.goto("/en");
    // Verify we're in English
    await expect(page.getByText("Hello, I'm")).toBeVisible();

    // Click PT button in the language switcher
    const ptButton = page.getByRole("radio", { name: "Português" });
    await ptButton.click();

    // Should navigate to PT locale
    await expect(page).toHaveURL(/\/pt/);
    await expect(page.getByText("Olá, eu sou")).toBeVisible();
  });

  test("language switcher switches back to English", async ({ page }) => {
    await page.goto("/pt");
    await expect(page.getByText("Olá, eu sou")).toBeVisible();

    const enButton = page.getByRole("radio", { name: "English" });
    await enButton.click();

    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByText("Hello, I'm")).toBeVisible();
  });

  test("blog page respects locale", async ({ page }) => {
    await page.goto("/pt/blog");
    // Blog should show Portuguese content
    await expect(page.getByText("Uma Breve Apresentação").first()).toBeVisible();
  });
});

test.describe("Theme Switching", () => {
  test("page renders with default dark theme", async ({ page }) => {
    await page.goto("/en");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
  });

  test("theme switcher toggles to light mode", async ({ page }) => {
    await page.goto("/en");
    const html = page.locator("html");

    // Should start in dark mode
    await expect(html).toHaveClass(/dark/);

    // Click theme toggle — it's a button with aria-label containing light/dark
    const themeButton = page.locator("nav").getByRole("button", { name: /light|dark/i });
    await themeButton.click();

    // Should switch to light mode
    await expect(html).not.toHaveClass(/dark/);
  });

  test("theme switcher toggles back to dark mode", async ({ page }) => {
    await page.goto("/en");
    const html = page.locator("html");

    // Toggle to light
    const themeButton = page.locator("nav").getByRole("button", { name: /light|dark/i });
    await themeButton.click();
    await expect(html).not.toHaveClass(/dark/);

    // Toggle back to dark
    const lightButton = page.locator("nav").getByRole("button", { name: /light|dark/i });
    await lightButton.click();
    await expect(html).toHaveClass(/dark/);
  });
});
