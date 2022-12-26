/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://localhost:8443/:path*',
      },
    ]
  },
}

module.exports = nextConfig
