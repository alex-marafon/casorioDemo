import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  serverActions: {
    bodySizeLimit: "10mb",
  },
  serverExternalPackages: ["better-sqlite3", "better-sqlite3-multiple-ciphers"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
