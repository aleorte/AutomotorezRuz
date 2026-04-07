'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, Phone } from 'lucide-react';

export default function HeaderB() {
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/design-b" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
            </div>
            <span className="font-black text-white text-xl tracking-tight">
              Car<span className="text-yellow-400">Ship</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Stock', href: '/design-b#stock' },
              { label: 'Financiación', href: '/design-b#financiacion' },
              { label: 'Contacto', href: '/design-b#contacto' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-400 hover:text-yellow-400 text-sm font-medium transition-colors"
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
              href="/design-b#stock"
              className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 px-5 py-2 rounded-lg text-sm font-black transition-colors"
            >
              VER STOCK ⚡
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
            { label: 'Stock', href: '/design-b#stock' },
            { label: 'Financiación', href: '/design-b#financiacion' },
            { label: 'Contacto', href: '/design-b#contacto' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-zinc-300 hover:text-yellow-400 font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/design-b#stock"
            onClick={() => setOpen(false)}
            className="mt-2 bg-yellow-400 text-zinc-950 text-center py-3 rounded-lg font-black text-sm"
          >
            VER STOCK ⚡
          </Link>
        </div>
      )}
    </header>
  );
}
