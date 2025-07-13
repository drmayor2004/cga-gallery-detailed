/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'cgafrica-image.s3.eu-west-2.amazonaws.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig