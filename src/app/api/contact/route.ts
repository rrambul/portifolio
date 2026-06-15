import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 100, email: 200, message: 5000 };

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    if (!rateLimit(clientIp(request))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Honeypot: real users never fill this hidden field. Pretend success so
    // bots don't learn they were filtered.
    if (typeof body.company === "string" && body.company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (
      String(name).length > MAX.name ||
      String(email).length > MAX.email ||
      String(message).length > MAX.message
    ) {
      return NextResponse.json(
        { error: "Submission exceeds the allowed length" },
        { status: 400 }
      );
    }

    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!contactEmail) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f766e;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f3f4f6; padding: 12px; border-radius: 4px;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}