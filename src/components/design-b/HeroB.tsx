'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroB() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  return (
    <section className="relative bg-zinc-950 overflow-hidden">
      {/* Diagonal yellow accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-400/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              🔥 {12} vehículos disponibles hoy
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-6">
              EL AUTO
              <br />
              <span className="text-yellow-400">QUE QUERÉS</span>
              <br />
              <span className="text-zinc-500">AL MEJOR</span>
              <br />
              PRECIO.
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              Más de 10 autos premium disponibles. Financiación express en 24hs. Respondemos por WhatsApp al instante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#stock"
                className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 px-8 py-4 rounded-xl font-black text-lg transition-colors text-center shadow-xl shadow-yellow-400/20"
              >
                VER TODO EL STOCK →
              </Link>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Quiero saber más sobre el stock disponible.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-zinc-700 hover:border-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                <span className="text-green-400">●</span> WhatsApp directo
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-zinc-800">
              {[
                { value: '500+', label: 'Clientes satisfechos', color: 'text-yellow-400' },
                { value: '24hs', label: 'Respuesta garantizada', color: 'text-orange-400' },
                { value: '0%', label: 'Comisión oculta', color: 'text-green-400' },
              ].map((s) => (
                <div key={s.label}>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=85"
                alt="Auto CarShip"
                fill
                className="object-cover"
                priority
              />
              {/* Yellow border accent */}
              <div className="absolute inset-0 ring-2 ring-yellow-400/20 rounded-2xl" />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 bg-yellow-400 text-zinc-950 rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-2xl font-black">⚡</div>
              <div className="text-xs font-black uppercase">Financiación</div>
              <div className="text-xs font-black">express 24hs</div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 shadow-xl">
              <div className="text-green-400 font-black text-sm">● EN LÍNEA</div>
              <div className="text-zinc-400 text-xs mt-0.5">Respondemos ahora</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
