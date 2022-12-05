const withTM = require('next-transpile-modules')();
const path = require('path');

module.exports = withTM({
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  env: {
    JS_APP_PUBLIC_API_HOST: process.env.JS_APP_PUBLIC_API_HOST,
  },
});
