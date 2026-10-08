import type { MetadataRoute } from 'next';

// REQUIRED for Next.js output: 'export'
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aura & Archive',
    short_name: 'Aura & Archive',
    description: 'Luxury Smart Cards & Interactive Media',
    start_url: '/',
    display: 'standalone',
    background_color: '#070709',
    theme_color: '#070709',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}