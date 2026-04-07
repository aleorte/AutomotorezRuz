import Link from 'next/link';
import { Zap } from 'lucide-react';
import { MOCK_COMPANY } from '@/lib/mock-data';

export default function FooterB() {
  const company = MOCK_COMPANY;

  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-zinc-950 fill-zinc-950" />
              </div>
              <span className="font-black text-white text-xl">
                Car<span className="text-yellow-400">Ship</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              La forma más rápida de conseguir tu auto. Stock actualizado, financiación express y respuesta inmediata.
            </p>
          </div>

          <div>
            <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-4">Acceso rápido</h3>
            <ul className="space-y-2">
              {[
                { label: 'Ver Stock', href: '/design-b#stock' },
                { label: 'Financiación', href: '/design-b#financiacion' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-4">Contacto</h3>
            <p className="text-zinc-500 text-sm mb-1">{company.address}</p>
            <p className="text-zinc-500 text-sm mb-4">{company.hours}</p>
            <a
              href={`https://wa.me/${company.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 px-4 py-2 rounded-lg text-sm font-black transition-colors"
            >
              ⚡ WHATSAPP DIRECTO
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-700 text-xs">
          <span>© {new Date().getFullYear()} {company.name}. Todos los derechos reservados.</span>
          <Link href="/" className="hover:text-zinc-500 transition-colors">← Volver al selector de diseño</Link>
        </div>
      </div>
    </footer>
  );
}
