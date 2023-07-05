/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@packages/ui', '@packages/domains', '@packages/utils'],
  reactStrictMode: true,
};

module.exports = nextConfig;
