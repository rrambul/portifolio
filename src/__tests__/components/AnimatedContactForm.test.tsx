import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      name: "Name",
      email: "Email",
      message: "Message",
      "placeholder.name": "John Doe",
      "placeholder.email": "john@example.com",
      "placeholder.message": "Your message...",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message Sent!",
      successMessage: "Thank you!",
      errorTitle: "Oops!",
      errorMessage: "Something went wrong",
      "error.nameRequired": "Name is required",
      "error.emailRequired": "Email is required",
      "error.emailInvalid": "Please enter a valid email",
      "error.messageRequired": "Message is required",
      "error.messageShort": "Message is too short",
    };
    return messages[key] ?? key;
  },
}));

// Mock framer-motion
vi.mock("framer-motion");

import { AnimatedContactForm } from "@/components/ui/AnimatedContactForm";

function changeInput(element: HTMLElement, value: string) {
  fireEvent.change(element, { target: { value } });
}

describe("AnimatedContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form fields", () => {
    render(<AnimatedContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<AnimatedContactForm />);
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });

  it("shows name validation error on blur when empty", () => {
    render(<AnimatedContactForm />);
    const nameInput = screen.getByLabelText("Name");
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("shows email validation error for invalid email on submit", async () => {
    render(<AnimatedContactForm />);
    // Fill name and message but use invalid email
    changeInput(screen.getByLabelText("Name"), "John");
    changeInput(screen.getByLabelText("Email"), "invalid");
    changeInput(screen.getByLabelText("Message"), "This is a long enough message");

    fireEvent.submit(screen.getByLabelText("Name").closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    });
  });

  it("shows message too short error on submit", async () => {
    render(<AnimatedContactForm />);
    changeInput(screen.getByLabelText("Name"), "John");
    changeInput(screen.getByLabelText("Email"), "john@example.com");
    changeInput(screen.getByLabelText("Message"), "short");

    fireEvent.submit(screen.getByLabelText("Name").closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Message is too short")).toBeInTheDocument();
    });
  });

  it("does not show errors when all fields are valid", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<AnimatedContactForm />);
    changeInput(screen.getByLabelText("Name"), "John");
    changeInput(screen.getByLabelText("Email"), "john@example.com");
    changeInput(screen.getByLabelText("Message"), "This is a valid message");

    fireEvent.submit(screen.getByLabelText("Name").closest("form")!);

    await waitFor(() => {
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
      expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
      expect(screen.queryByText("Message is required")).not.toBeInTheDocument();
    });
  });

  it("validates all fields on submit", () => {
    render(<AnimatedContactForm />);
    const submitButton = screen.getByText("Send Message");
    fireEvent.click(submitButton);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<AnimatedContactForm />);

    changeInput(screen.getByLabelText("Name"), "John Doe");
    changeInput(screen.getByLabelText("Email"), "john@example.com");
    changeInput(screen.getByLabelText("Message"), "Hello, this is a test message!");

    fireEvent.submit(screen.getByLabelText("Name").closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Message Sent!")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, this is a test message!",
        company: "",
      }),
    });
  });

  it("shows error on failed submission", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    render(<AnimatedContactForm />);

    changeInput(screen.getByLabelText("Name"), "John Doe");
    changeInput(screen.getByLabelText("Email"), "john@example.com");
    changeInput(screen.getByLabelText("Message"), "Hello, this is a test message!");

    fireEvent.submit(screen.getByLabelText("Name").closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Oops!")).toBeInTheDocument();
    });
  });
});
