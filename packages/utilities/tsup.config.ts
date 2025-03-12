import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/tsconfig/index.ts", "src/eslint/index.ts", "src/schema/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
})
