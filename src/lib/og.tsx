import { ImageResponse } from "next/og";

/**
 * Shared renderer for the `opengraph-image` route conventions. Generating the
 * social card from code (next/og) means it can never drift from siteConfig and
 * there is no binary asset to keep in the repo or forget to ship. Kept to the
 * default sans font and ASCII glyphs so the build never has to fetch a font.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const EMERALD = "#34d399";
const BG = "#0a0f10";

export function renderOgImage(opts: {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: string;
}) {
  const { eyebrow, title, subtitle, footer } = opts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#0d2b22",
              alignItems: "center",
              justifyContent: "center",
              color: EMERALD,
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            &gt;
          </div>
          <div style={{ color: EMERALD, fontSize: 30 }}>{eyebrow}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          <div style={{ color: EMERALD, fontSize: 36, marginTop: 22 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", color: "#71717a", fontSize: 24 }}>
          {footer ?? ""}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
