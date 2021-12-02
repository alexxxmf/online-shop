/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // as stated here https://nextjs.org/docs/basic-features/image-optimization
  images: {
    domains: ["cdn.shopify.com"],
  },
};

module.exports = nextConfig;
