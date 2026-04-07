'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Car, Phone } from 'lucide-react';

export default function HeaderA() {
  const [open, setOpen] = useState(false);
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  const navItems = [
    { label: 'Inicio', href: '/design-a' },
    { label: 'Stock', href: '/design-a#stock' },
    { label: 'Nosotros', href: '/design-a#about' },
    { label: 'Contacto', href: '/design-a#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/design-a" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tight">CarShip</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Consultá</span>
            </a>
            <Link
              href="/design-a#stock"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Ver Stock
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/design-a#stock"
            onClick={() => setOpen(false)}
            className="mt-2 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold text-sm"
          >
            Ver Stock completo
          </Link>
        </div>
      )}
    </header>
  );
}
