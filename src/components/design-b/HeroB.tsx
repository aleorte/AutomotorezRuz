'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroB() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  const waStock = `https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Vengo de la página de Ruz Automotores y quiero saber más sobre el stock disponible.')}`;
  const waSell  = `https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Quiero vender mi auto. ¿Me podés asesorar?')}`;

  const onlineTag = (
    <div className="flex items-center gap-2 mb-4 lg:mb-5">
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
        En línea · Respondemos ahora
      </span>
    </div>
  );

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
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
      <Link
        href="#stock"
        className="flex items-center justify-center border border-[#E87800]/50 hover:border-[#E87800] text-[#E87800] hover:text-white hover:bg-[#E87800] px-7 py-3.5 rounded-xl font-black text-base lg:text-lg transition-all text-center w-full lg:w-auto"
        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}
      >
        VER TODO EL STOCK →
      </Link>

      <a
        href={waStock}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border border-zinc-600 lg:border-white/20 lg:bg-white/10 lg:backdrop-blur-sm hover:border-green-400/70 text-white hover:text-green-400 px-7 py-3.5 rounded-xl font-bold text-base lg:text-lg transition-all w-full lg:w-auto"
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        WhatsApp directo
      </a>

      <a
        href={waSell}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E87800] hover:bg-[#F08A00] text-white px-7 py-3.5 rounded-xl font-black text-base lg:text-lg transition-all text-center shadow-xl shadow-[#E87800]/30 hover:shadow-[#E87800]/50 hover:scale-[1.02] active:scale-[0.98] w-full lg:w-auto"
        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
      >
        VENDE TU AUTO CON NOSOTROS
      </a>
    </div>
  );

  return (
    <section className="bg-zinc-950">

      {/* ── DESKTOP (lg+): hero a pantalla completa ─────────────────── */}
      <div className="hidden lg:block relative w-full h-[88vh] max-h-[900px]">

        {/*
          object-[center_top]: ancla el tope de la imagen al tope del contenedor.
          El logo incrustado centro-arriba queda en la zona superior visible,
          cubierto intencionalmente por el top vignette de abajo.
        */}
        <Image
          src="/hero.jpeg"
          alt="Ruz Automotores — Sunchales, Santa Fe"
          fill
          className="object-cover object-[center_top]"
          priority
          sizes="100vw"
        />

        {/* 1. Top vignette — funde el navbar con la imagen y aplaca el logo superior */}
        <div className="absolute inset-x-0 top-0 h-48
                        bg-gradient-to-b from-zinc-950/80 via-zinc-950/30 to-transparent" />

        {/* 2. Panel derecho — "pared oscura" donde vive el texto; aleja el contenido
            del logo (centro-izquierda) y del pin de ubicación (abajo-izquierda) */}
        <div className="absolute inset-y-0 right-0 w-[54%]
                        bg-gradient-to-l from-zinc-950/95 via-zinc-950/70 to-transparent" />

        {/* 3. Bottom fade — transición suave al fondo de página */}
        <div className="absolute inset-x-0 bottom-0 h-28
                        bg-gradient-to-t from-zinc-950 to-transparent" />

        {/* Línea naranja decorativa */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-transparent via-[#E87800]/60 to-transparent" />

        {/* Contenido: derecha del hero, anclado al fondo */}
        <div className="absolute inset-0 flex items-end pb-12 px-8">
          <div className="ml-auto w-[48%] max-w-[560px]">
            {onlineTag}
            {slogan}
            {ctaButtons}
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET (< lg): imagen + bloque de contenido ────── */}

      {/* Franja de imagen: altura fija para que la foto apaisada se recorte
          de forma predecible, mostrando fachada y logo incrustado */}
      <div className="lg:hidden relative w-full h-[45vh] min-h-[200px] max-h-[340px]">
        <Image
          src="/hero.jpeg"
          alt="Ruz Automotores — Sunchales, Santa Fe"
          fill
          className="object-cover object-[center_top]"
          priority
          sizes="100vw"
        />
        {/* Fade inferior para fundir imagen con el bloque de contenido */}
        <div className="absolute inset-x-0 bottom-0 h-14
                        bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>

      {/* Bloque de contenido móvil — fondo sólido oscuro, botones a columna */}
      <div className="lg:hidden bg-zinc-900 px-4 sm:px-6 pt-5 pb-7">
        {onlineTag}
        {slogan}
        {ctaButtons}
      </div>

    </section>
  );
}
