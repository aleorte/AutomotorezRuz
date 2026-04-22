'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroB() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  return (
    <section className="relative bg-zinc-950 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#E87800]/6 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#E87800]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E87800]/25 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#E87800]/10 border border-[#E87800]/30 text-[#E87800] text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#E87800] rounded-full animate-pulse" />
              Stock actualizado — Respondemos al instante
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              LOS BUENOS NEGOCIOS
              <br />
              <span className="text-[#E87800]">SE HACEN CON</span>
              <br />
              BUENAS PERSONAS.
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg font-medium">
              En Ruz Automotores encontrás autos, camionetas y motos. Trato directo, precio real y respuesta inmediata por WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#stock"
                className="bg-[#E87800] hover:bg-[#F08A00] text-white px-8 py-4 rounded-xl font-black text-lg transition-all text-center shadow-xl shadow-[#E87800]/20 hover:shadow-[#E87800]/30 hover:scale-[1.02] active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
              >
                VER TODO EL STOCK →
              </Link>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Vengo de la página de Ruz Automotores y quiero saber más sobre el stock disponible.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-zinc-700 hover:border-green-500/60 text-white hover:text-green-400 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                WhatsApp directo
              </a>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Quiero vender mi auto. ¿Me podés asesorar?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-[#E87800]/50 hover:border-[#E87800] text-[#E87800] hover:text-white hover:bg-[#E87800] px-8 py-4 rounded-xl font-black text-lg transition-all text-center"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}
              >
                VENDE TU AUTO CON NOSOTROS
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-zinc-800/60">
              {[
                { value: '500+', label: 'Clientes satisfechos', color: 'text-[#E87800]' },
                { value: '24hs', label: 'Respuesta garantizada', color: 'text-white' },
                { value: '0%', label: 'Comisión oculta', color: 'text-white' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className={`text-4xl font-black ${s.color}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5 font-medium uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-zinc-800">
              <Image
                src="/hero.jpeg"
                alt="Ruz Automotores — Sunchales, Santa Fe"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 ring-2 ring-[#E87800]/15 rounded-2xl" />
              {/* Orange corner accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E87800] via-[#F08A00] to-transparent" />
            </div>

            {/* Floating badge — stock */}
            <div className="absolute -top-4 -left-4 bg-[#E87800] text-white rounded-2xl px-4 py-3 shadow-2xl shadow-[#E87800]/30">
              <div
                className="text-2xl font-black leading-none"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                STOCK
              </div>
              <div className="text-xs font-bold uppercase tracking-wide mt-0.5">Siempre</div>
              <div className="text-xs font-medium opacity-80">actualizado</div>
            </div>

            {/* Floating badge — online */}
            <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 shadow-2xl">
              <div className="text-green-400 font-bold text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                EN LÍNEA
              </div>
              <div className="text-zinc-400 text-xs mt-0.5">Respondemos ahora</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
