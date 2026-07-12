import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-8f0b05c2503f42609136a4e1e55a9242.r2.dev",
      },
    ],
  },
};

export default nextConfig;
