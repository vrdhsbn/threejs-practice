const isProd = process.env.NODE_ENV === 'production'
const prefixPath = isProd ? '/threejs-practice' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  assetPrefix: prefixPath,
  basePath: prefixPath,
  output: 'export',
}

module.exports = nextConfig
