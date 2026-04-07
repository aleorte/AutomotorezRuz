import { getVehiclesFromSheets } from '@/lib/google-sheets';
import HeaderA from '@/components/design-a/HeaderA';
import HeroA from '@/components/design-a/HeroA';
import VehicleGridA from '@/components/design-a/VehicleGridA';
import FooterA from '@/components/design-a/FooterA';

export const revalidate = 300; // ISR: revalidar cada 5 minutos

export const metadata = {
  title: 'Modern Dealer — CarShip',
  description: 'Stock de autos premium. Diseño limpio y profesional.',
};

export default async function DesignAPage() {
  const vehicles = await getVehiclesFromSheets();

  return (
    <div className="bg-white min-h-screen font-sans">
      <HeaderA />
      <HeroA />
      <VehicleGridA vehicles={vehicles} />

      {/* About section */}
      <section id="about" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Sobre CarShip</span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 mb-6 tracking-tight">
                Confianza que se construye vehículo a vehículo
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                En CarShip seleccionamos cada vehículo con criterios exigentes de calidad. Nos aseguramos de que cada auto
                que vendemos tiene toda su documentación en regla, revisiones mecánicas certificadas y un historial transparente.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Ofrecemos financiación flexible adaptada a tu situación, con cuotas en pesos o dólares y trámites en menos de 48hs.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { v: '500+', l: 'Autos vendidos' },
                  { v: '8 años', l: 'En el mercado' },
                  { v: '98%', l: 'Clientes satisfechos' },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-black text-blue-600">{s.v}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛡️', title: 'Garantía incluida', desc: 'Todos los vehículos con garantía mecánica certificada.' },
                { icon: '📄', title: 'Documentación en regla', desc: 'VTV, transferencia y patente al día gestionadas por nosotros.' },
                { icon: '💳', title: 'Financiación rápida', desc: 'Cuotas en pesos o dólares. Respuesta en 24 horas.' },
                { icon: '🤝', title: 'Atención personalizada', desc: 'Un asesor dedicado te acompaña todo el proceso.' },
              ].map((f) => (
                <div key={f.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterA />
    </div>
  );
}
