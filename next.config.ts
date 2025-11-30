import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Increase to something like '4mb' or '10mb'
      bodySizeLimit: '20mb', 
    },
  },
};

export default nextConfig;
