import Link from 'next/link';

const designs = [
  {
    href: '/design-a',
    label: 'A',
    name: 'Modern Dealer',
    tagline: 'Inspirado en Tesla & Rivian',
    description:
      'Diseño limpio y minimalista. Mucho espacio en blanco, tipografía robusta y fotografía de alta resolución como protagonista. Enfoque en confianza y profesionalismo.',
    palette: ['#FFFFFF', '#0F172A', '#2563EB'],
    paletteNames: ['Blanco', 'Noche', 'Azul'],
    preview: 'bg-white text-slate-900',
    accent: 'bg-blue-600',
    badge: '🏎️ Premium',
  },
  {
    href: '/design-b',
    label: 'B',
    name: 'High-Conversion',
    tagline: 'Dark mode + CTAs agresivos',
    description:
      'Modo oscuro con acentos amarillos. Botón flotante de WhatsApp, filtros rápidos y prominentes, urgencia visual para maximizar conversiones desde el primer segundo.',
    palette: ['#0A0A0A', '#FACC15', '#F97316'],
    paletteNames: ['Negro', 'Amarillo', 'Naranja'],
    preview: 'bg-zinc-950 text-yellow-400',
    accent: 'bg-yellow-400',
    badge: '⚡ Alta Conversión',
  },
  {
    href: '/design-c',
    label: 'C',
    name: 'Luxury Showcase',
    tagline: 'Minimalismo + Animaciones',
    description:
      'Paleta negra y dorada con animaciones Framer Motion. Cada vehículo aparece cinematográficamente. Para una agencia que quiere proyectar exclusividad y lujo.',
    palette: ['#080808', '#C9A96E', '#E8D5A3'],
    paletteNames: ['Ébano', 'Oro', 'Champagne'],
    preview: 'bg-stone-950 text-amber-400',
    accent: 'bg-amber-500',
    badge: '✨ Luxury',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              CS
            </div>
            <span className="font-semibold text-lg">CarShip Pro</span>
          </div>
          <span className="text-gray-400 text-sm">Selector de Diseño</span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            3 propuestas visuales listas para elegir
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elegí el diseño de tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              AutoShop
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Tres propuestas visuales completamente distintas. Cada una con identidad propia,
            datos reales desde Google Sheets y optimizadas para convertir.
          </p>
        </div>

        {/* Design cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {designs.map((design) => (
            <Link
              key={design.href}
              href={design.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Preview area */}
              <div
                className={`${design.preview} h-40 flex items-center justify-center relative overflow-hidden`}
              >
                <div className="text-7xl font-black opacity-10 select-none">{design.label}</div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                    {design.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-950/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-5 bg-gray-900">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="font-bold text-lg text-white">{design.name}</h2>
                    <p className="text-gray-500 text-xs">{design.tagline}</p>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full ${design.accent} flex-shrink-0 mt-0.5`}
                  />
                </div>

                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                  {design.description}
                </p>

                {/* Color palette */}
                <div className="flex items-center gap-2 mb-4">
                  {design.palette.map((color, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full border border-white/10 flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-gray-600 text-xs">{design.paletteNames[i]}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    Diseño {design.label} • Framer Motion
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    Ver diseño
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mt-16 text-center">
          {[
            { icon: '📊', label: 'Google Sheets', desc: 'Stock en tiempo real' },
            { icon: '🔄', label: 'ISR 5 min', desc: 'Auto-actualización' },
            { icon: '📱', label: 'WhatsApp', desc: 'Botón con mensaje' },
            { icon: '⚡', label: 'Next.js 14', desc: 'App Router + TS' },
          ].map((f) => (
            <div key={f.label} className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-semibold text-sm text-white">{f.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-sm">
        CarShip Pro — Powered by Next.js 14 + Google Sheets
      </footer>
    </div>
  );
}
