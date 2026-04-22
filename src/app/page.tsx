import { getVehiclesFromSheets } from '@/lib/google-sheets';
import HeaderB from '@/components/design-b/HeaderB';
import HeroB from '@/components/design-b/HeroB';
import VehicleGridB from '@/components/design-b/VehicleGridB';
import FloatingWhatsApp from '@/components/design-b/FloatingWhatsApp';
import FooterB from '@/components/design-b/FooterB';

export const revalidate = 300;

export const metadata = {
  title: 'Ruz Automotores — Tu próximo auto al mejor precio',
  description: 'Ruz Automotores: autos, camionetas y motos. Stock actualizado y respuesta inmediata por WhatsApp.',
};

export default async function HomePage() {
  const vehicles = await getVehiclesFromSheets();

  return (
    <div className="bg-zinc-950 min-h-screen font-sans">
      <HeaderB />
      <HeroB />
      <VehicleGridB vehicles={vehicles} />
      <FooterB />
      <FloatingWhatsApp />
    </div>
  );
}
