import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aura & Archive',
    short_name: 'Aura & Archive',
    description: 'Luxury Smart Cards & Interactive Media',
    start_url: '/',
    display: 'standalone',
    background_color: '#040406',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}