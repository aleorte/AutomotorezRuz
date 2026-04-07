import { getVehiclesFromSheets } from '@/lib/google-sheets';
import HeaderB from '@/components/design-b/HeaderB';
import HeroB from '@/components/design-b/HeroB';
import VehicleGridB from '@/components/design-b/VehicleGridB';
import FloatingWhatsApp from '@/components/design-b/FloatingWhatsApp';
import FooterB from '@/components/design-b/FooterB';

export const revalidate = 300;

export const metadata = {
  title: 'High-Conversion — CarShip',
  description: 'El stock de autos más grande. Financiación express. Respondemos al instante.',
};

export default async function DesignBPage() {
  const vehicles = await getVehiclesFromSheets();

  return (
    <div className="bg-zinc-950 min-h-screen font-sans">
      <HeaderB />
      <HeroB />
      <VehicleGridB vehicles={vehicles} />

      {/* Financing section */}
      <section id="financiacion" className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-yellow-400 font-black text-xs uppercase tracking-widest">💳 FINANCIACIÓN</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Tu auto en{' '}
              <span className="text-yellow-400">cuotas que podés pagar</span>
            </h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
              Sin vueltas. Completás el formulario, nosotros te conseguimos la mejor tasa del mercado en menos de 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: '⚡', title: 'Aprobación en 24hs', desc: 'Respuesta rápida con los mejores bancos y financieras del país.' },
              { icon: '💯', title: 'Sin cuota inicial', desc: 'En muchos casos podés llevarte el auto sin entregar nada al inicio.' },
              { icon: '🔒', title: '100% transparente', desc: 'Sin costos ocultos. El precio que ves es el precio que pagás.' },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-black text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678'}?text=${encodeURIComponent('¡Hola! Quiero consultar sobre las opciones de financiación.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 px-8 py-4 rounded-2xl font-black text-xl transition-colors shadow-xl shadow-yellow-400/20"
            >
              QUIERO FINANCIAR MI AUTO →
            </a>
          </div>
        </div>
      </section>

      <FooterB />
      <FloatingWhatsApp />
    </div>
  );
}
