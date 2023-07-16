/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@packages/ui', '@packages/domains', '@packages/utils', '@packages/mocks'],
  reactStrictMode: true,
};

module.exports = nextConfig;
