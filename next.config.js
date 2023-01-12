/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  i18n: {
    locales: ["en", "ru", "ge"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
