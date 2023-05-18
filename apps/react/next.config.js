/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JS_APP_PUBLIC_API_HOST: process.env.JS_APP_PUBLIC_API_HOST,
    JS_APP_WIDGET_BASE_URL: process.env.JS_APP_WIDGET_BASE_URL,
  },
};

module.exports = nextConfig;
