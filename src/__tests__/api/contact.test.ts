import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Resend
const mockSend = vi.fn();
vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = { send: mockSend };
  },
}));

// We need to import NextResponse and mock the route
import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CONTACT_EMAIL = "contact@example.com";
    process.env.FROM_EMAIL = "noreply@example.com";
    process.env.RESEND_API_KEY = "test-key";
  });

  function createRequest(body: Record<string, unknown>) {
    return new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  it("returns 400 when name is missing", async () => {
    const response = await POST(
      createRequest({ email: "test@test.com", message: "Hello" })
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("required");
  });

  it("returns 400 when email is missing", async () => {
    const response = await POST(
      createRequest({ name: "John", message: "Hello" })
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("required");
  });

  it("returns 400 when message is missing", async () => {
    const response = await POST(
      createRequest({ name: "John", email: "test@test.com" })
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("required");
  });

  it("returns 500 when CONTACT_EMAIL is not configured", async () => {
    delete process.env.CONTACT_EMAIL;
    const response = await POST(
      createRequest({
        name: "John",
        email: "test@test.com",
        message: "Hello",
      })
    );
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("configuration");
  });

  it("returns success when email sends successfully", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_123" }, error: null });

    const response = await POST(
      createRequest({
        name: "John",
        email: "john@example.com",
        message: "Hello there!",
      })
    );

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.id).toBe("msg_123");

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "noreply@example.com",
        to: "contact@example.com",
        replyTo: "john@example.com",
        subject: expect.stringContaining("John"),
      })
    );
  });

  it("returns 500 when Resend API returns error", async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: "API error" },
    });

    const response = await POST(
      createRequest({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      })
    );

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("Failed");
  });

  it("returns 500 on unexpected error", async () => {
    mockSend.mockRejectedValue(new Error("Network error"));

    const response = await POST(
      createRequest({
        name: "John",
        email: "john@example.com",
        message: "Hello",
      })
    );

    expect(response.status).toBe(500);
  });

  it("uses default from email when FROM_EMAIL is not set", async () => {
    delete process.env.FROM_EMAIL;
    mockSend.mockResolvedValue({ data: { id: "msg_456" }, error: null });

    await POST(
      createRequest({
        name: "Jane",
        email: "jane@example.com",
        message: "Hello!",
      })
    );

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "onboarding@resend.dev",
      })
    );
  });
});
