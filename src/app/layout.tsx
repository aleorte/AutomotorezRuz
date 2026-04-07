import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'CarShip — Tu próximo auto te está esperando',
    template: '%s | CarShip',
  },
  description:
    'CarShip: La agencia de autos usados más confiable. Stock actualizado, financiación flexible y atención personalizada. Buenos Aires, Argentina.',
  keywords: ['autos usados', 'venta de autos', 'carship', 'automotora', 'financiación'],
  authors: [{ name: 'CarShip' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'CarShip',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
