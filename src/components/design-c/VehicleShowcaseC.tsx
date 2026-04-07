'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types/vehicle';
import { formatPrice, formatKm, buildWhatsAppUrl, getUniqueBrands, filterVehicles, getWhatsAppPhone } from '@/lib/utils';

interface Props {
  vehicles: Vehicle[];
}

// Minimal intersection observer hook for reveal animations
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function VehicleShowcaseC({ vehicles }: Props) {
  const [type, setType] = useState('all');
  const [brand, setBrand] = useState('all');
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const brands = useMemo(() => getUniqueBrands(vehicles), [vehicles]);
  const filtered = useMemo(
    () =>
      filterVehicles(vehicles, {
        search: '',
        type,
        brand,
        status: 'Disponible', // Only show available by default in luxury
        minPrice: 0,
        maxPrice: 999999,
        minYear: 2000,
        maxYear: 2030,
      }),
    [vehicles, type, brand]
  );

  const sold = vehicles.filter((v) => v.status === 'Vendido');
  const phone = getWhatsAppPhone();

  return (
    <section id="coleccion" className="bg-[#080808] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-[#C9A96E] w-8" />
              <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase">
                Disponibles ahora
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              La Colección
            </h2>
          </div>

          {/* Minimal filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              {['all', 'Auto', 'SUV', 'Pickup', 'Moto'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all ${
                    type === t
                      ? 'text-black bg-[#C9A96E]'
                      : 'text-white/40 border border-white/10 hover:border-[#C9A96E]/40 hover:text-[#C9A96E]'
                  }`}
                >
                  {t === 'all' ? 'TODOS' : t}
                </button>
              ))}
            </div>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-4 py-2 bg-transparent border border-white/10 text-white/40 text-xs font-semibold tracking-widest uppercase focus:outline-none focus:border-[#C9A96E]/40 cursor-pointer"
            >
              <option value="all" className="bg-zinc-900">TODAS LAS MARCAS</option>
              {brands.map((b) => <option key={b} value={b} className="bg-zinc-900">{b.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        {/* Featured vehicle — big hero card */}
        {filtered.length > 0 && (
          <FeaturedCardC vehicle={filtered[0]} phone={phone} onSelect={setSelected} />
        )}

        {/* Grid */}
        {filtered.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filtered.slice(1).map((v, i) => (
              <LuxuryCardC key={v.id} vehicle={v} phone={phone} index={i} onSelect={setSelected} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div
              style={{ color: '#C9A96E' }}
              className="text-5xl mb-4"
            >◈</div>
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sin resultados
            </h3>
            <p className="text-white/30 text-sm">Ajustá los filtros para ver más vehículos.</p>
          </div>
        )}

        {/* Sold vehicles — very minimal */}
        {sold.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Historial</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sold.map((v) => (
                <div key={v.id} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=60'}
                    alt={`${v.brand} ${v.model}`}
                    fill
                    className="object-cover grayscale opacity-30"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white/40 text-xs font-bold tracking-widest uppercase">
                      {v.brand} {v.model}
                    </span>
                    <span className="text-[#C9A96E]/40 text-[10px] tracking-widest mt-1 uppercase">Vendido</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <LuxuryModalC vehicle={selected} phone={phone} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function FeaturedCardC({ vehicle, phone, onSelect }: { vehicle: Vehicle; phone: string; onSelect: (v: Vehicle) => void }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className="relative mb-6 overflow-hidden cursor-pointer group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
      onClick={() => onSelect(vehicle)}
    >
      <div className="relative aspect-[21/9] overflow-hidden">
        <Image
          src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=85'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end p-8 lg:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-6">
            <div>
              <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase block mb-2">
                ◆ Destacado de la colección
              </span>
              <h3
                className="text-3xl lg:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {vehicle.brand} {vehicle.model}
              </h3>
              <p className="text-white/50 mt-2">
                {vehicle.year} · {formatKm(vehicle.km)} · {vehicle.fuel}
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-4">
              <div
                className="text-3xl lg:text-4xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {formatPrice(vehicle.price, vehicle.currency)}
              </div>
              <a
                href={buildWhatsAppUrl(vehicle, phone)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#E8D5A3] text-black px-6 py-3 text-sm font-black tracking-widest uppercase transition-colors"
              >
                CONSULTAR →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LuxuryCardC({
  vehicle,
  phone,
  index,
  onSelect,
}: {
  vehicle: Vehicle;
  phone: string;
  index: number;
  onSelect: (v: Vehicle) => void;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
      onClick={() => onSelect(vehicle)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <Image
          src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        {/* Status */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 ${
              vehicle.status === 'Disponible'
                ? 'bg-[#C9A96E] text-black'
                : 'bg-white/10 text-white/50'
            }`}
          >
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-white/40 text-sm mt-0.5">
              {vehicle.year} · {formatKm(vehicle.km)}
            </p>
          </div>
          <div
            className="font-black text-lg"
            style={{ color: '#C9A96E' }}
          >
            {formatPrice(vehicle.price, vehicle.currency)}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-white/30 text-xs uppercase tracking-widest">
          {vehicle.transmission && <span>{vehicle.transmission}</span>}
          {vehicle.fuel && <><span>·</span><span>{vehicle.fuel}</span></>}
        </div>

        <a
          href={buildWhatsAppUrl(vehicle, phone)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 flex items-center gap-2 text-[#C9A96E] hover:text-[#E8D5A3] text-xs font-semibold tracking-widest uppercase transition-colors group/btn"
        >
          CONSULTAR
          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}

function LuxuryModalC({ vehicle, phone, onClose }: { vehicle: Vehicle; phone: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease' }}
    >
      <div
        className="bg-[#0D0D0D] border border-[#C9A96E]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=85'}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 border border-[#C9A96E]/30 flex items-center justify-center text-white/60 hover:text-white hover:border-[#C9A96E] transition-all"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-2">
                {vehicle.type} · {vehicle.year}
              </p>
              <h2
                className="text-3xl font-black text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {vehicle.brand} {vehicle.model}
              </h2>
            </div>
            <div
              className="text-3xl font-black"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #E8D5A3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {formatPrice(vehicle.price, vehicle.currency)}
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Kilómetros', value: formatKm(vehicle.km) },
              { label: 'Transmisión', value: vehicle.transmission || '—' },
              { label: 'Combustible', value: vehicle.fuel || '—' },
              { label: 'Color', value: vehicle.color || '—' },
            ].map((spec) => (
              <div key={spec.label} className="border border-white/5 p-4 text-center">
                <div className="text-white/30 text-[10px] tracking-widest uppercase mb-2">{spec.label}</div>
                <div className="text-white font-semibold text-sm">{spec.value}</div>
              </div>
            ))}
          </div>

          {vehicle.description && (
            <p className="text-white/40 text-sm leading-relaxed mb-8 font-light">{vehicle.description}</p>
          )}

          <a
            href={buildWhatsAppUrl(vehicle, phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#C9A96E] hover:bg-[#E8D5A3] text-black font-black text-sm tracking-widest uppercase transition-colors"
          >
            CONSULTAR POR WHATSAPP →
          </a>
        </div>
      </div>
    </div>
  );
}
