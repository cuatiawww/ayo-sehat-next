import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ayo Sehat - Portal Kesehatan Kemenkes RI',
    short_name: 'Ayo Sehat',
    description:
      'Portal kesehatan resmi Kementerian Kesehatan Republik Indonesia',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#18b3ab',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        // purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        // purpose: 'any maskable',
      },
    ],
  }
}
