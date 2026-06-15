import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern image formats; Next negotiates per the request's Accept header.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

export default nextConfig;
