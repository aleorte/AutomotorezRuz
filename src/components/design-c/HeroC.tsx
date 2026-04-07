'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroC() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.transform = 'scaleX(1)';
    }, 800);
  }, []);

  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90"
          alt="Luxury car"
          fill
          className="object-cover opacity-30"
          priority
        />
        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <div
              ref={lineRef}
              className="h-px bg-[#C9A96E] w-16 origin-left transition-transform duration-1000 ease-out"
              style={{ transform: 'scaleX(0)' }}
            />
            <span
              style={{ color: '#C9A96E' }}
              className="text-xs font-semibold tracking-[0.3em] uppercase"
            >
              Colección Exclusiva
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Lo
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              extraordinario
            </span>
            <br />
            te espera.
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-md font-light">
            Una selección de vehículos premium curada con criterios de excelencia. Cada auto, una experiencia.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            <Link
              href="#coleccion"
              className="group flex items-center gap-3 text-white text-sm font-semibold tracking-widest uppercase border border-[#C9A96E]/40 hover:border-[#C9A96E] px-8 py-4 transition-all hover:bg-[#C9A96E]/5"
            >
              VER COLECCIÓN
              <span
                style={{ color: '#C9A96E' }}
                className="group-hover:translate-x-1 transition-transform"
              >
                →
              </span>
            </Link>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hola, me interesa conocer la colección de vehículos exclusivos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#C9A96E] text-sm font-semibold tracking-widest uppercase py-4 transition-colors"
            >
              ASESOR PRIVADO →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E]/50 to-transparent animate-pulse-slow" />
      </div>
    </section>
  );
}
