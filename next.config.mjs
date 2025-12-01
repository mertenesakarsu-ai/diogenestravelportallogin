/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://127.0.0.1:8001/api/:path*' },
      { source: '/docs', destination: 'http://127.0.0.1:8001/docs' },
      { source: '/openapi.json', destination: 'http://127.0.0.1:8001/openapi.json' },
      { source: '/docs/:path*', destination: 'http://127.0.0.1:8001/docs/:path*' },
    ]
  },
}

export default nextConfig
