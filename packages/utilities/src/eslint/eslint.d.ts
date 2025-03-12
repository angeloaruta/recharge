declare module "./base.js" {
  const baseConfig: any[]
  export default baseConfig
}

declare module "./react-internal.js" {
  export const config: any[]
  const reactInternalConfig: any[]
  export default reactInternalConfig
}

declare module "./next.js" {
  export const nextJsConfig: any[]
  const nextConfig: any[]
  export default nextConfig
}

declare module "./eslint.config.js" {
  const eslintConfig: any[]
  export default eslintConfig
}

declare module "*.js" {
  const content: any
  export default content
}
