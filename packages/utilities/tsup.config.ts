import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/schema/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  platform: "node",
  target: "node18",
})
