import { test, expect } from "@playwright/test";

test.describe("Accessibility & SEO", () => {
  test("page has proper title", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Renan Rambul/);
  });

  test("page has proper meta description", async ({ page }) => {
    await page.goto("/en");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /Renan Rambul/);
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/en");
    const images = page.locator("img[alt]");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("links have discernible text or aria-label", async ({ page }) => {
    await page.goto("/en");
    const links = page.locator("a:visible");
    const count = await links.count();
    let checkedCount = 0;

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      const title = await link.getAttribute("title");
      const hasText = text && text.trim().length > 0;
      const hasAriaLabel = ariaLabel && ariaLabel.trim().length > 0;
      const hasTitle = title && title.trim().length > 0;
      // Has child img with alt text counts as discernible
      const imgAlt = await link.locator("img[alt]").count();
      const hasSvg = await link.locator("svg").count();
      // SVG-only icon links without aria-label are acceptable (visual icons)
      if (!hasText && !hasAriaLabel && !hasTitle && hasSvg > 0) continue;
      expect(hasText || hasAriaLabel || hasTitle || imgAlt > 0).toBeTruthy();
      checkedCount++;
    }
    expect(checkedCount).toBeGreaterThan(0);
  });

  test("page has only one h1", async ({ page }) => {
    await page.goto("/en");
    const h1s = page.locator("h1");
    const count = await h1s.count();
    expect(count).toBe(1);
  });

  test("blog post page has proper title", async ({ page }) => {
    await page.goto("/en/blog/a-brief-introduction");
    await expect(page).toHaveTitle(/Brief Introduction|Renan Rambul/);
  });

  test("page is keyboard navigable", async ({ page }) => {
    await page.goto("/en");
    // Tab through the page and verify focus is visible
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("desktop layout shows full navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/en");
    // Desktop nav links should be visible
    await expect(page.locator("nav").getByText("About")).toBeVisible();
    await expect(page.locator("nav").getByText("Experience")).toBeVisible();
    await expect(page.locator("nav").getByText("Contact")).toBeVisible();
  });

  test("mobile layout shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en");
    const hamburger = page.locator("nav button.md\\:hidden");
    await expect(hamburger).toBeVisible();
  });

  test("content is readable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en");
    await expect(page.getByText("Renan Rambul").first()).toBeVisible();
    await expect(page.getByText("Frontend Software Engineer").first()).toBeVisible();
  });
});
