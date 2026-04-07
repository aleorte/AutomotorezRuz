'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeaderC() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-[#C9A96E]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — minimal wordmark */}
          <Link href="/design-c" className="group">
            <div className="text-2xl font-bold tracking-[0.2em] uppercase">
              <span
                style={{
                  background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CAR
              </span>
              <span className="text-white/90 font-light">SHIP</span>
            </div>
          </Link>

          {/* Desktop nav — minimal */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'COLECCIÓN', href: '/design-c#coleccion' },
              { label: 'NOSOTROS', href: '/design-c#about' },
              { label: 'CONTACTO', href: '/design-c#contacto' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/50 hover:text-[#C9A96E] text-xs font-semibold tracking-widest transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-widest text-[#C9A96E] hover:text-[#E8D5A3] border border-[#C9A96E]/40 hover:border-[#C9A96E] px-5 py-2.5 transition-all"
            >
              CONSULTAR
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`w-6 h-px bg-[#C9A96E] transition-all ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`w-4 h-px bg-[#C9A96E] transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-[#C9A96E] transition-all ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-[#C9A96E]/10 px-6 py-8 flex flex-col gap-6">
          {[
            { label: 'COLECCIÓN', href: '/design-c#coleccion' },
            { label: 'NOSOTROS', href: '/design-c#about' },
            { label: 'CONTACTO', href: '/design-c#contacto' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-[#C9A96E] text-xs font-semibold tracking-widest transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
