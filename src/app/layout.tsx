import type { Metadata } from 'next';
import './globals.css';
import DeveloperBadge from '@/components/design-b/DeveloperBadge';

export const metadata: Metadata = {
  title: {
    default: 'Ruz Automotores — Tu próximo auto te está esperando',
    template: '%s | Ruz Automotores',
  },
  description:
    'Ruz Automotores: tu automotora de confianza. Stock actualizado de autos, camionetas y motos. Financiación express y atención personalizada.',
  keywords: ['autos usados', 'venta de autos', 'ruz automotores', 'automotora', 'financiación', 'camionetas', 'motos'],
  authors: [{ name: 'Ruz Automotores' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-64x64.png', type: 'image/png', sizes: '64x64' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Ruz Automotores',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Barlow+Condensed:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <DeveloperBadge />
      </body>
    </html>
  );
}
