import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { createCvDocument, cvFileName } from "@/lib/cv";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// PDF generation needs the Node runtime (streams, fontkit).
export const runtime = "nodejs";

export async function GET(request: Request) {
  // PDF rendering is CPU-heavy; cap bursts from a single client. The response
  // is also CDN-cacheable (below), so legitimate traffic rarely re-renders.
  if (!rateLimit(`cv:${clientIp(request)}`, 10)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "pt" ? "pt" : "en";

  const buffer = await renderToBuffer(createCvDocument(locale));

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${cvFileName(locale)}"`,
      // The CV only changes on deploy; let browsers/CDN cache it for a day.
      "Cache-Control": "public, max-age=86400",
    },
  });
}
