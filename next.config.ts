import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Generates pure static HTML/CSS/JS into /out
  images: { unoptimized: true }, // Required for static export
};

export default nextConfig;