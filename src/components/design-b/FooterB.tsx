import Link from 'next/link';
import Image from 'next/image';
import { MOCK_COMPANY } from '@/lib/mock-data';

export default function FooterB() {
  const company = MOCK_COMPANY;

  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
                <Image
                  src="/logo-ruz.jpg"
                  alt="Ruz Automotores"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-black text-white text-xl leading-none"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                RUZ<span className="text-[#E87800]"> AUTOMOTORES</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Los buenos negocios se hacen con buenas personas. Stock actualizado y respuesta inmediata por WhatsApp.
            </p>
          </div>

          <div>
            <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-4">Acceso rápido</h3>
            <ul className="space-y-2">
              {[
                { label: 'Ver Stock', href: '/#stock' },
                { label: 'Contacto', href: '/#contacto' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-zinc-500 hover:text-[#E87800] text-sm transition-colors font-medium">
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
              className="inline-flex items-center gap-2 bg-[#E87800] hover:bg-[#F08A00] text-white px-4 py-2.5 rounded-lg text-sm font-black tracking-wide transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WHATSAPP DIRECTO →
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-700 text-xs">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} {company.name}. Todos los derechos reservados.</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://devlloni.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors"
            >
              Desarrollado por Lautaro Delloni
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
