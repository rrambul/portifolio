import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog page renders with posts", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page).toHaveURL("/en/blog");
    // Blog cards should be visible
    await expect(page.getByText("A Brief Introduction")).toBeVisible();
  });

  test("blog page shows post metadata", async ({ page }) => {
    await page.goto("/en/blog");
    // Should show read time
    await expect(page.getByText(/min/).first()).toBeVisible();
  });

  test("clicking a blog card navigates to post", async ({ page }) => {
    await page.goto("/en/blog");
    await page.getByText("A Brief Introduction").click();
    await expect(page).toHaveURL(/\/en\/blog\/a-brief-introduction/);
  });

  test("blog post page renders content", async ({ page }) => {
    await page.goto("/en/blog/a-brief-introduction");
    await expect(page.getByText("A Brief Introduction").first()).toBeVisible();
    // Post content should be present
    await expect(page.locator("article, .prose, [class*='markdown']").first()).toBeVisible();
  });

  test("blog post has back button", async ({ page }) => {
    await page.goto("/en/blog/a-brief-introduction");
    const backLink = page.getByRole("link", { name: /back|voltar|blog/i }).first();
    await expect(backLink).toBeVisible();
  });

  test("blog post shows author info", async ({ page }) => {
    await page.goto("/en/blog/a-brief-introduction");
    await expect(page.getByText("Renan Rambul").first()).toBeVisible();
  });

  test("navigation is present on blog pages", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("footer is present on blog pages", async ({ page }) => {
    await page.goto("/en/blog");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });
});
