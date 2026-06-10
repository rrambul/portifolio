import { renderToBuffer } from "@react-pdf/renderer";
import { createCvDocument, cvFileName } from "@/lib/cv";

// PDF generation needs the Node runtime (streams, fontkit).
export const runtime = "nodejs";

export async function GET(request: Request) {
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
