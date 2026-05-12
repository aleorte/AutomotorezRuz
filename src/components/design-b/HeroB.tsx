'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroB() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  const waStock = `https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Vengo de la página de Ruz Automotores y quiero saber más sobre el stock disponible.')}`;
  const waSell  = `https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Quiero vender mi auto. ¿Me podés asesorar?')}`;

  const slogan = (
    <p
      className="font-black text-2xl lg:text-3xl leading-tight mb-5"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      <span className="text-white">En Ruz Automotores: </span>
      <span className="text-[#E87800]">buenos negocios y buenas personas.</span>
    </p>
  );

  const ctaButtons = (
    <>
      {/* En Stock — ahora con estilo outline (swap desde Vende) */}
      <Link
        href="#stock"
        className="flex items-center justify-center border border-[#E87800]/50 hover:border-[#E87800] text-[#E87800] hover:text-white hover:bg-[#E87800] px-7 py-3.5 rounded-xl font-black text-base lg:text-lg transition-all text-center"
        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}
      >
        VER TODO EL STOCK →
      </Link>

      {/* WhatsApp — sin cambios */}
      <a
        href={waStock}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border border-zinc-600 lg:border-white/20 lg:bg-white/10 lg:backdrop-blur-sm hover:border-green-400/70 text-white hover:text-green-400 px-7 py-3.5 rounded-xl font-bold text-base lg:text-lg transition-all"
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        WhatsApp directo
      </a>

      {/* Vende con nosotros — ahora relleno naranja (swap desde En Stock) */}
      <a
        href={waSell}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E87800] hover:bg-[#F08A00] text-white px-7 py-3.5 rounded-xl font-black text-base lg:text-lg transition-all text-center shadow-xl shadow-[#E87800]/30 hover:shadow-[#E87800]/50 hover:scale-[1.02] active:scale-[0.98]"
        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
      >
        VENDE TU AUTO CON NOSOTROS
      </a>
    </>
  );

  return (
    <section className="bg-zinc-950">

      {/* ── IMAGE ─────────────────────────────────────────────── */}
      <div className="relative w-full h-[52vw] min-h-[220px] max-h-[540px] lg:h-[88vh] lg:max-h-[900px]">
        <Image
          src="/hero.jpeg"
          alt="Ruz Automotores — Sunchales, Santa Fe"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* top vignette — keeps header readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-transparent" />

        {/* bottom orange line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E87800]/60 to-transparent" />

        {/* ── DESKTOP overlay CTAs (lg+) ── */}
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent" />

        <div className="hidden lg:flex absolute bottom-0 left-0 right-0 pb-10 px-8">
          <div className="max-w-7xl mx-auto w-full pl-[34%]">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
                En línea · Respondemos ahora
              </span>
            </div>
            {slogan}
            <div className="flex flex-row gap-3 flex-wrap">
              {ctaButtons}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET CTAs (below image, < lg) ─────────── */}
      <div className="lg:hidden px-4 sm:px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
            En línea · Respondemos ahora
          </span>
        </div>
        {slogan}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
          {ctaButtons}
        </div>
      </div>

    </section>
  );
}
