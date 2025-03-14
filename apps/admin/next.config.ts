import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@recharge/ui", "@recharge/utilities"],
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["warn", "error"],
          }
        : undefined,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
