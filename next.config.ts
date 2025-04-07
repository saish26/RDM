import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowSVG: true,
    domains: ["storage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", //
        destination: "https://api-dev-glow.ktmbees.com/:path*",
      },
    ];
  },
};

export default nextConfig;
