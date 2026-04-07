'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroA() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold mb-6 bg-blue-50 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              Stock actualizado diariamente
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              Tu próximo auto{' '}
              <span className="text-blue-600">te está</span>{' '}
              <span className="text-blue-600">esperando.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
              Autos premium seleccionados, financiación en minutos y la confianza de años en el mercado. Encontrá el tuyo hoy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#stock"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-600/25 text-center"
              >
                Ver Stock →
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                Hablar con un asesor
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-slate-100">
              {[
                { value: '500+', label: 'Vehículos vendidos' },
                { value: '5★', label: 'Calificación promedio' },
                { value: '24h', label: 'Respuesta garantizada' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=85"
                alt="Auto premium CarShip"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-xl">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Garantía incluida</div>
                  <div className="text-xs text-slate-500">En todos los vehículos</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-2xl p-4 shadow-xl">
              <div className="text-2xl font-black">12</div>
              <div className="text-xs text-blue-200">en stock hoy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
