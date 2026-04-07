import Link from 'next/link';
import { Car, MapPin, Clock, Instagram } from 'lucide-react';
import { MOCK_COMPANY } from '@/lib/mock-data';

export default function FooterA() {
  const company = MOCK_COMPANY;

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">{company.name}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Tu próximo auto te está esperando. Calidad, transparencia y la mejor financiación del mercado.
            </p>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @carship.ar
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-3">
              {[
                { label: 'Ver Stock', href: '/design-a#stock' },
                { label: 'Sobre Nosotros', href: '/design-a#about' },
                { label: 'Contacto', href: '/design-a#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                {company.address}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                {company.hours}
              </li>
            </ul>
            <a
              href={`https://wa.me/${company.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              WhatsApp directo
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 text-xs">
          <span>© {new Date().getFullYear()} {company.name}. Todos los derechos reservados.</span>
          <Link href="/" className="hover:text-slate-400 transition-colors">← Volver al selector de diseño</Link>
        </div>
      </div>
    </footer>
  );
}
