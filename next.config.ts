import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: { ignoreDuringBuilds: true },
  images: {
        domains: ['pocketpark.s3.ap-northeast-1.amazonaws.com']
  },
};

export default nextConfig;
