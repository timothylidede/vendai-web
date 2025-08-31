/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all external CDNs
      },
    ],
    formats: ['image/avif', 'image/webp'], // modern formats
  },
};

export default nextConfig;
