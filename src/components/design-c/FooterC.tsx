import Link from 'next/link';
import { MOCK_COMPANY } from '@/lib/mock-data';

export default function FooterC() {
  const company = MOCK_COMPANY;

  return (
    <footer id="contacto" className="bg-black border-t border-[#C9A96E]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div
              className="text-3xl font-black tracking-[0.2em] mb-4 uppercase"
              style={{
                background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              CARSHIP
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Una selección de vehículos premium curada con criterios de excelencia.
            </p>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">Navegación</h3>
            <ul className="space-y-4">
              {[
                { label: 'La Colección', href: '/design-c#coleccion' },
                { label: 'Nosotros', href: '/design-c#about' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-[#C9A96E] text-sm tracking-widest uppercase transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">Contacto</h3>
            <p className="text-white/30 text-sm mb-2">{company.address}</p>
            <p className="text-white/30 text-sm mb-6">{company.hours}</p>
            <a
              href={`https://wa.me/${company.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#C9A96E]/40 hover:border-[#C9A96E] text-[#C9A96E] hover:text-[#E8D5A3] px-5 py-3 text-xs font-semibold tracking-widest uppercase transition-all"
            >
              ASESOR PRIVADO →
            </a>
          </div>
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/20 text-xs tracking-widest uppercase">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">← SELECTOR DE DISEÑO</Link>
        </div>
      </div>
    </footer>
  );
}
