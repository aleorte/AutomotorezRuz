/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '*.googleusercontent.com' },
      { protocol: 'https', hostname: '**.usercontent.google.com' },
      { protocol: 'https', hostname: 'photos.fife.usercontent.google.com' },
      { protocol: 'https', hostname: '*.fife.usercontent.google.com' },
    ],
    unoptimized: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['googleapis'],
  },
};

export default nextConfig;
