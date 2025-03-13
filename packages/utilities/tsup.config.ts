import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/eslint/index.ts", "src/schema/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  noExternal: [
    "eslint-config-prettier",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react",
    "typescript-eslint",
    "globals",
    "@eslint/js",
  ],
  platform: "node",
  target: "node18",
})
