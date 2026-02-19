import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
