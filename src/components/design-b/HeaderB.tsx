'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

export default function HeaderB() {
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
              <Image
                src="/logo-ruz.jpg"
                alt="Ruz Automotores"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className="font-black text-white text-xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              RUZ<span className="text-[#E87800]"> AUTOMOTORES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Stock', href: '/#stock' },
              { label: 'Financiación', href: '/#financiacion' },
              { label: 'Contacto', href: '/#contacto' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-400 hover:text-[#E87800] text-sm font-semibold tracking-wide transition-colors uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <Link
              href="/#stock"
              className="bg-[#E87800] hover:bg-[#F08A00] text-white px-5 py-2 rounded-lg text-sm font-black tracking-wide transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VER STOCK →
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-zinc-400">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 flex flex-col gap-2">
          {[
            { label: 'Stock', href: '/#stock' },
            { label: 'Financiación', href: '/#financiacion' },
            { label: 'Contacto', href: '/#contacto' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-zinc-300 hover:text-[#E87800] font-semibold text-sm uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#stock"
            onClick={() => setOpen(false)}
            className="mt-2 bg-[#E87800] text-white text-center py-3 rounded-lg font-black text-sm tracking-wider"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            VER STOCK →
          </Link>
        </div>
      )}
    </header>
  );
}
