import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

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

  it("clears a field error and applies the valid style after correcting it", () => {
    render(<AnimatedContactForm />);
    const nameInput = screen.getByLabelText("Name");

    // Blur while empty: error shows and the input gets the red invalid style.
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(nameInput.className).toContain("border-red-500");

    // Typing re-validates on change (field is touched), clears the error, and
    // flips to the green valid style.
    changeInput(nameInput, "John");
    expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
    expect(nameInput.className).toContain("border-green-500");
  });

  it("validates the email field on blur: empty, invalid, then valid", () => {
    render(<AnimatedContactForm />);
    const email = screen.getByLabelText("Email");

    fireEvent.focus(email);
    fireEvent.blur(email);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    // Touched, so each change re-validates through validateField.
    changeInput(email, "not-an-email");
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();

    changeInput(email, "john@example.com");
    expect(
      screen.queryByText("Please enter a valid email")
    ).not.toBeInTheDocument();
  });

  it("validates the message field on blur: empty, too short, then valid", () => {
    render(<AnimatedContactForm />);
    const message = screen.getByLabelText("Message");

    fireEvent.focus(message);
    fireEvent.blur(message);
    expect(screen.getByText("Message is required")).toBeInTheDocument();

    changeInput(message, "short");
    expect(screen.getByText("Message is too short")).toBeInTheDocument();

    changeInput(message, "This is a sufficiently long message");
    expect(screen.queryByText("Message is too short")).not.toBeInTheDocument();
  });
});

describe("AnimatedContactForm submission lifecycle", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // Drain pending microtasks (e.g. the awaited fetch continuation) while fake
  // timers are active. Fake timers do not stall the microtask queue, so a bare
  // resolved promise still flushes the async submit handler's tail.
  async function flushMicrotasks() {
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  }

  function fillValidFields() {
    changeInput(screen.getByLabelText("Name"), "John Doe");
    changeInput(screen.getByLabelText("Email"), "john@example.com");
    changeInput(
      screen.getByLabelText("Message"),
      "Hello, this is a test message!"
    );
  }

  it("auto-resets to a cleared form 5s after a successful submission", async () => {
    vi.useFakeTimers();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<AnimatedContactForm />);
    fillValidFields();

    await act(async () => {
      fireEvent.submit(screen.getByLabelText("Name").closest("form")!);
    });
    await flushMicrotasks();

    expect(screen.getByText("Message Sent!")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    // The form is back, and every field has been cleared.
    const nameInput = screen.getByLabelText<HTMLInputElement>("Name");
    const emailInput = screen.getByLabelText<HTMLInputElement>("Email");
    const messageInput = screen.getByLabelText<HTMLTextAreaElement>("Message");
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
    expect(screen.queryByText("Message Sent!")).not.toBeInTheDocument();
  });

  it("auto-resets to the form 5s after a failed submission", async () => {
    vi.useFakeTimers();
    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<AnimatedContactForm />);
    fillValidFields();

    await act(async () => {
      fireEvent.submit(screen.getByLabelText("Name").closest("form")!);
    });
    await flushMicrotasks();

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.queryByText("Oops!")).not.toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });

  it("shows the sending label and disables inputs while the request is pending", async () => {
    let resolveFetch: (value: { ok: boolean; json: () => Promise<unknown> }) => void = () => {};
    const pending = new Promise<{ ok: boolean; json: () => Promise<unknown> }>(
      (resolve) => {
        resolveFetch = resolve;
      }
    );
    global.fetch = vi.fn().mockReturnValue(pending);

    render(<AnimatedContactForm />);
    fillValidFields();

    await act(async () => {
      fireEvent.submit(screen.getByLabelText("Name").closest("form")!);
    });

    // Mid-flight: still submitting because the fetch promise has not resolved.
    expect(screen.getByText("Sending...")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Message")).toBeDisabled();

    // Let the request finish so no act warning leaks past the test.
    await act(async () => {
      resolveFetch({ ok: true, json: () => Promise.resolve({ success: true }) });
      await pending;
    });
  });

  it("rejects a whitespace-only name without calling the API", () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock;

    render(<AnimatedContactForm />);
    changeInput(screen.getByLabelText("Name"), "   ");
    changeInput(screen.getByLabelText("Email"), "john@example.com");
    changeInput(
      screen.getByLabelText("Message"),
      "Hello, this is a test message!"
    );

    fireEvent.submit(screen.getByLabelText("Name").closest("form")!);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
