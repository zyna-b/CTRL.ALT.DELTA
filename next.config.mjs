/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Ensure Turbopack resolves the correct repo root when multiple lockfiles exist
    root: './'
  },
}

export default nextConfig
