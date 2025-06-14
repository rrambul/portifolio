import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize with API key
const resend = new Resend("re_Guek2XGW_FUKA1Z1RV9gBonTfuZCnj51P");

export async function GET() {
  try {
    // Very simple email
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "renanrambuls@gmail.com",
      subject: "Test Email",
      html: "<p>This is a test email from the API route.</p>",
    });

    if (error) {
      console.error("Error in simple-email route:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Unhandled error in simple-email:", error);
    return NextResponse.json(
      { error: "Failed to send test email" },
      { status: 500 }
    );
  }
}
 