import MiniCssExtractPlugin from "mini-css-extract-plugin"

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
  webpack: (config) => {
    const hasMiniCssExtract = config.plugins.some(
      (plugin) => plugin.constructor && plugin.constructor.name === "MiniCssExtractPlugin",
    )

    if (!hasMiniCssExtract) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash].css",
          chunkFilename: "static/css/[name].[contenthash].css",
        }),
      )
    }

    return config
  },
};

export default nextConfig;
