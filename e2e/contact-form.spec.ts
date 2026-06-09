import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("shows validation errors when submitting empty form", async ({ page }) => {
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();
  });

  test("shows email validation error for invalid email", async ({ page }) => {
    await page.locator("#contact").getByLabel("Name").fill("John Doe");
    await page.locator("#contact").getByLabel("Email").fill("not-an-email");
    await page.locator("#contact").getByLabel("Message").fill("This is a valid test message");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please enter a valid email")).toBeVisible();
  });

  test("shows error for short message", async ({ page }) => {
    await page.locator("#contact").getByLabel("Name").fill("John Doe");
    await page.locator("#contact").getByLabel("Email").fill("john@example.com");
    await page.locator("#contact").getByLabel("Message").fill("short");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Message is too short")).toBeVisible();
  });

  test("clears field error after correcting input", async ({ page }) => {
    // Submit empty to trigger errors
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Name is required")).toBeVisible();

    // Fill name to clear error
    await page.locator("#contact").getByLabel("Name").fill("John Doe");
    await expect(page.getByText("Name is required")).not.toBeVisible();
  });

  test("input fields receive green border on valid input after blur", async ({ page }) => {
    const nameInput = page.locator("#contact").getByLabel("Name");
    await nameInput.fill("John Doe");
    await nameInput.blur();
    await expect(nameInput).toHaveClass(/border-green-500/);
  });

  test("input fields receive red border on invalid input after blur", async ({ page }) => {
    const nameInput = page.locator("#contact").getByLabel("Name");
    await nameInput.focus();
    await nameInput.blur();
    await expect(nameInput).toHaveClass(/border-red-500/);
  });

  test("form inputs are disabled while submitting", async ({ page }) => {
    // Intercept the API call to hold it
    await page.route("/api/contact", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({ status: 200, json: { success: true } });
    });

    await page.locator("#contact").getByLabel("Name").fill("John Doe");
    await page.locator("#contact").getByLabel("Email").fill("john@example.com");
    await page.locator("#contact").getByLabel("Message").fill("This is a valid test message");
    await page.getByRole("button", { name: "Send Message" }).click();

    // Inputs should be disabled during submission
    await expect(page.locator("#contact").getByLabel("Name")).toBeDisabled();
    await expect(page.locator("#contact").getByLabel("Email")).toBeDisabled();
    await expect(page.locator("#contact").getByLabel("Message")).toBeDisabled();
  });

  test("shows success message after successful submission", async ({ page }) => {
    // Mock the API to return success
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, id: "test-123" }),
      });
    });

    await page.locator("#contact").getByLabel("Name").fill("John Doe");
    await page.locator("#contact").getByLabel("Email").fill("john@example.com");
    await page.locator("#contact").getByLabel("Message").fill("This is a valid test message");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Message Sent!")).toBeVisible();
  });

  test("shows error message after failed submission", async ({ page }) => {
    // Mock the API to return error
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to send message" }),
      });
    });

    await page.locator("#contact").getByLabel("Name").fill("John Doe");
    await page.locator("#contact").getByLabel("Email").fill("john@example.com");
    await page.locator("#contact").getByLabel("Message").fill("This is a valid test message");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Oops!")).toBeVisible();
  });
});
