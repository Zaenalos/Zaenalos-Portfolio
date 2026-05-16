import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
  allowedDevOrigins: ["192.168.10.34"],
};

export default nextConfig;
