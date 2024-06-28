/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['utfs.io','source.unsplash.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: ''
        }
      ]
    },
  }

export default nextConfig;
