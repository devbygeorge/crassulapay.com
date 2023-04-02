/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
  i18n: {
    locales: ["en", "ru", "ka"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
