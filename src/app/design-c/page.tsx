import { getVehiclesFromSheets } from '@/lib/google-sheets';
import HeaderC from '@/components/design-c/HeaderC';
import HeroC from '@/components/design-c/HeroC';
import VehicleShowcaseC from '@/components/design-c/VehicleShowcaseC';
import FooterC from '@/components/design-c/FooterC';
import { MOCK_COMPANY } from '@/lib/mock-data';

export const revalidate = 300;

export const metadata = {
  title: 'Luxury Showcase — CarShip',
  description: 'Colección exclusiva de vehículos premium. Elegancia y exclusividad en cada detalle.',
};

export default async function DesignCPage() {
  const vehicles = await getVehiclesFromSheets();
  const company = MOCK_COMPANY;
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <HeaderC />
      <HeroC />
      <VehicleShowcaseC vehicles={vehicles} />

      {/* About section */}
      <section id="about" className="bg-[#050505] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-[#C9A96E] w-8" />
                <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase">
                  Sobre CarShip
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                La excelencia
                <br />
                como estándar.
              </h2>
              <p className="text-white/40 leading-relaxed mb-6 font-light">
                En CarShip no vendemos autos. Cubrimos la experiencia de adquirir el vehículo de tus sueños con el servicio que merecés: transparencia total, documentación impecable y asesoramiento personalizado.
              </p>
              <p className="text-white/40 leading-relaxed font-light">
                Cada vehículo de nuestra colección pasa por un riguroso proceso de selección y verificación antes de ser ofrecido. Nuestros estándares son altos porque sabemos que los tuyos también lo son.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '500+', label: 'Vehículos entregados', sub: 'En los últimos 8 años' },
                { value: '98%', label: 'Satisfacción', sub: 'De nuestros clientes' },
                { value: '24hs', label: 'Respuesta garantizada', sub: 'Todos los días' },
                { value: '8 años', label: 'En el mercado', sub: 'Experiencia y confianza' },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/5 p-6">
                  <div
                    className="text-3xl font-black mb-2"
                    style={{
                      background: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                  <div className="text-white/25 text-xs mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#080808] py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-6"
            style={{ color: '#C9A96E' }}
          >
            ¿Listo para dar el paso?
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tu próximo capítulo
            <br />comienza aquí.
          </h2>
          <p className="text-white/30 mb-10 font-light leading-relaxed">
            Contactá a uno de nuestros asesores y encontremos juntos el vehículo que refleje quién sos.
          </p>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent('Hola, me gustaría hablar con un asesor sobre la colección de vehículos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 border border-[#C9A96E]/40 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 text-[#C9A96E] hover:text-[#E8D5A3] px-10 py-5 text-sm font-semibold tracking-widest uppercase transition-all"
          >
            HABLAR CON UN ASESOR →
          </a>
        </div>
      </section>

      <FooterC />
    </div>
  );
}
