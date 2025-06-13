import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["j8v6vnsfxb.ufs.sh", "lh3.googleusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["pages", "components", "lib", "src"], // Only lint specific directories
  },
};

export default nextConfig;
