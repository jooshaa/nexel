import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Custom Cloudinary loader: auto-resizes + converts to WebP/AVIF on the fly
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'nexel-strapi.etamin.uz',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
