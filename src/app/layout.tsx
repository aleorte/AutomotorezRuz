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
