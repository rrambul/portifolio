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
import { resetRateLimit } from "@/lib/rate-limit";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetRateLimit();
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

  it("returns 400 when the email is malformed", async () => {
    const response = await POST(
      createRequest({ name: "John", email: "not-an-email", message: "Hello" })
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("valid email");
  });

  it("silently accepts (and ignores) submissions that trip the honeypot", async () => {
    const response = await POST(
      createRequest({
        name: "Bot",
        email: "bot@example.com",
        message: "spam spam spam",
        company: "Evil Corp",
      })
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    // No email is sent for honeypot hits.
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rate-limits repeated submissions from the same client", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg" }, error: null });
    const send = () =>
      POST(
        createRequest({
          name: "John",
          email: "john@example.com",
          message: "Hello there!",
        })
      );

    // The limiter allows 5 within the window.
    for (let i = 0; i < 5; i++) {
      expect((await send()).status).toBe(200);
    }
    expect((await send()).status).toBe(429);
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

  it("returns 500 when RESEND_API_KEY is not configured", async () => {
    delete process.env.RESEND_API_KEY;
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
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("escapes HTML in the notification email and converts newlines to <br>", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_html" }, error: null });

    await POST(
      createRequest({
        name: "<script>alert(1)</script>",
        email: "evil@example.com",
        message: "Line one\nLine two",
      })
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
    const arg = mockSend.mock.calls[0]![0] as { html: string };
    expect(arg.html).toContain("&lt;script&gt;");
    expect(arg.html).not.toContain("<script>");
    expect(arg.html).toContain("Line one<br>Line two");
  });

  it("returns 400 when the message exceeds the length cap", async () => {
    const response = await POST(
      createRequest({
        name: "John",
        email: "john@example.com",
        message: "a".repeat(5001),
      })
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("exceeds");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("accepts a message exactly at the length cap (inclusive)", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_max" }, error: null });

    const response = await POST(
      createRequest({
        name: "John",
        email: "john@example.com",
        message: "a".repeat(5000),
      })
    );
    expect(response.status).toBe(200);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("strips CR/LF from the email subject to block header injection", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_crlf" }, error: null });

    await POST(
      createRequest({
        name: "Evil\r\nBcc: x@x.com",
        email: "john@example.com",
        message: "Hello",
      })
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
    const arg = mockSend.mock.calls[0]![0] as { subject: string };
    expect(arg.subject).not.toContain("\r");
    expect(arg.subject).not.toContain("\n");
  });

  it("returns 400 when the name is whitespace-only", async () => {
    const response = await POST(
      createRequest({
        name: "   ",
        email: "john@example.com",
        message: "Hello",
      })
    );
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("required");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("trims surrounding whitespace from the name before sending", async () => {
    mockSend.mockResolvedValue({ data: { id: "msg_trim" }, error: null });

    await POST(
      createRequest({
        name: " John ",
        email: "john@example.com",
        message: "Hello",
      })
    );

    expect(mockSend).toHaveBeenCalledTimes(1);
    const arg = mockSend.mock.calls[0]![0] as { subject: string };
    expect(arg.subject).toMatch(/from John$/);
  });
});
