import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize the Resend client with API key directly
// Replace this with your API key from https://resend.com
const resend = new Resend("re_Guek2XGW_FUKA1Z1RV9gBonTfuZCnj51P");

export async function POST(request: Request) {
  try {
    // Log that we received a request
    console.log("Contact API route called");

    const body = await request.json();
    console.log("Request body:", body);

    const { name, email, message } = body;

    // Validate the incoming data
    if (!name || !email || !message) {
      console.log("Missing required fields:", { name, email, message });
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    console.log("Attempting to send email via Resend...");

    try {
      // Send the email using Resend with hardcoded values
      const result = await resend.emails.send({
        from: "onboarding@resend.dev", // Using the default Resend testing email
        to: "renanrambuls@gmail.com", // Must match exactly the email used for your Resend account
        subject: `New Contact Form Submission from ${name}`,
        replyTo: email,
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `,
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

      console.log("Resend API response:", result);

      const { data, error } = result;

      if (error) {
        console.error("Resend API returned an error:", error);
        return NextResponse.json(
          { error: "Failed to send message", details: error },
          { status: 500 }
        );
      }

      console.log("Email sent successfully with ID:", data?.id);
      return NextResponse.json({ success: true, id: data?.id });
    } catch (resendError: unknown) {
      console.error("Error from Resend API:", resendError);
      const errorMessage =
        resendError instanceof Error
          ? resendError.message
          : "Unknown error occurred";

      return NextResponse.json(
        { error: "Failed to send message", details: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error in contact API route:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: "Server error" },
      { status: 500 }
    );
  }
}
 