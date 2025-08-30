/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['docs.google.com'],
  },
  env: {
    SHEET_ID: '1WhSc3ogSSTlSfvp7HlJLPZ4fiKFEyhUDSRhAwz8Cm8w',
    SHEET_NAME: 'MONTHLY COLLECTION AVM',
  },
}

module.exports = nextConfig
