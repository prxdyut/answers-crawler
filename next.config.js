/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/proxy/:path*',
            destination: 'https://www.shaalaa.com/:path*' // Proxy to Backend
          }
        ]
      }
}

module.exports = nextConfig
