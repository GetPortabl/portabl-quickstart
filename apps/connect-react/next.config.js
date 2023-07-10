/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    JS_APP_PORTABL_ACCOUNT_ID: process.env.JS_APP_PORTABL_ACCOUNT_ID,
    JS_APP_PORTABL_CONNECT_DOMAIN: process.env.JS_APP_PORTABL_CONNECT_DOMAIN,
    JS_APP_PORTABL_WALLET_DOMAIN: process.env.JS_APP_PORTABL_WALLET_DOMAIN,
  },
};

module.exports = nextConfig;
