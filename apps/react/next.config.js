const path = require('path');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['sync-with-portabl'],
  env: {
    JS_APP_PUBLIC_API_HOST: process.env.JS_APP_PUBLIC_API_HOST,
    JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID: process.env.JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID,
  },
};
