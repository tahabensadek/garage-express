/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

module.exports = nextConfig
