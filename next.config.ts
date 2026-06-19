import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats; Next negotiates per the request's Accept header.
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
