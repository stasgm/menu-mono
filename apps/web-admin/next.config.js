/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@packages/ui', '@packages/domains', '@packages/utils', '@packages/mocks'],
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'goldbelly.imgix.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
      }
    ]
  }
};

module.exports = nextConfig;
