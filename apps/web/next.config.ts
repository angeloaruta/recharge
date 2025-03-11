import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@recharge/ui", "@recharge/utils", "@recharge/backend"],
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["warn", "error"],
          }
        : undefined,
  },
}

export default nextConfig
