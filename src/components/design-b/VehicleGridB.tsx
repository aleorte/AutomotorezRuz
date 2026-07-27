'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Vehicle, VehicleLabel } from '@/types/vehicle';
import { formatPrice, formatKm, buildWhatsAppUrl, getUniqueBrands, filterVehicles, getWhatsAppPhone } from '@/lib/utils';
import { Search, X, Gauge, Fuel, MessageCircle, ChevronDown } from 'lucide-react';

interface Props {
  vehicles: Vehicle[];
}

// Label config: color, icon, display text
const LABEL_CONFIG: Record<VehicleLabel, { bg: string; text: string; border: string; icon: string; display: string }> = {
  'Top':            { bg: 'bg-[#E87800]',  text: 'text-white',       border: 'border-[#E87800]',  icon: '★',  display: 'TOP' },
  'Nuevo Ingreso':  { bg: 'bg-blue-600',   text: 'text-white',       border: 'border-blue-500',   icon: '✦',  display: 'NUEVO INGRESO' },
  'Oportunidad':    { bg: 'bg-emerald-600', text: 'text-white',      border: 'border-emerald-500', icon: '◆',  display: 'OPORTUNIDAD' },
  'Precio Rebajado':{ bg: 'bg-amber-500',  text: 'text-zinc-900',    border: 'border-amber-400',  icon: '↓',  display: 'PRECIO REBAJADO' },
};

// Label sort priority (lower = higher priority)
const LABEL_PRIORITY: Record<VehicleLabel, number> = {
  'Top': 1,
  'Nuevo Ingreso': 2,
  'Oportunidad': 3,
  'Precio Rebajado': 4,
};

function sortByLabel(a: Vehicle, b: Vehicle): number {
  const pa = a.label ? LABEL_PRIORITY[a.label] : 99;
  const pb = b.label ? LABEL_PRIORITY[b.label] : 99;
  return pa - pb;
}

export default function VehicleGridB({ vehicles }: Props) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [brand, setBrand] = useState('all');
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const brands = useMemo(() => getUniqueBrands(vehicles), [vehicles]);
  const filtered = useMemo(
    () =>
      filterVehicles(vehicles, {
        search,
        type,
        brand,
        status: 'all',
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER,
        minYear: 2000,
        maxYear: 2030,
      }),
    [vehicles, search, type, brand]
  );

  const phone = getWhatsAppPhone();
  const available = useMemo(() => [...filtered].sort(sortByLabel), [filtered]);
  const hasLabeled = available.some((v) => !!v.label);

  return (
    <section id="stock" className="bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter bar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-8">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar marca, modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E87800] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              )}
            </div>

            {/* Type pills */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'Auto', 'Camioneta', 'SUV', 'Moto'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
                    type === t
                      ? 'bg-[#E87800] text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                  }`}
                >
                  {t === 'all' ? 'TODOS' : t}
                </button>
              ))}
            </div>

            {/* Brand select */}
            <div className="relative">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-300 focus:outline-none focus:border-[#E87800] transition-colors cursor-pointer"
              >
                <option value="all">Todas las marcas</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            </div>
          </div>

          <div className="mt-3 text-xs text-zinc-500 flex items-center gap-2">
            <span className="text-[#E87800] font-bold">{available.length}</span> disponibles
            {hasLabeled && !search && type === 'all' && brand === 'all' && (
              <span className="ml-1 text-zinc-600">• <span className="text-[#E87800]">{available.filter(v => v.label).length}</span> destacados</span>
            )}
            {(search || type !== 'all' || brand !== 'all') && (
              <button
                onClick={() => { setSearch(''); setType('all'); setBrand('all'); }}
                className="ml-auto text-zinc-600 hover:text-[#E87800] transition-colors font-medium"
              >
                Limpiar filtros ×
              </button>
            )}
          </div>
        </div>

        {/* Vehicle grid */}
        {available.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-black text-white mb-2">Sin resultados</h3>
            <p className="text-zinc-500 mb-6">Probá con otros filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {available.map((v, idx) => (
              <VehicleCardB key={v.id} vehicle={v} phone={phone} onSelect={setSelected} priority={idx < 4} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <VehicleModalB vehicle={selected} phone={phone} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function VehicleCardB({
  vehicle,
  phone,
  onSelect,
  priority,
}: {
  vehicle: Vehicle;
  phone: string;
  onSelect: (v: Vehicle) => void;
  priority: boolean;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const isSold = vehicle.status === 'Vendido';
  const isReserved = vehicle.status === 'Reservado';
  const labelCfg = vehicle.label ? LABEL_CONFIG[vehicle.label] : null;

  return (
    <div
      className={`group relative flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
        isSold
          ? 'border-zinc-800 opacity-50'
          : labelCfg
            ? `border-zinc-800 hover:border-[#E87800]/50 hover:shadow-xl hover:shadow-[#E87800]/5 ring-1 ${labelCfg.border}/30`
            : 'border-zinc-800 hover:border-[#E87800]/50 hover:shadow-xl hover:shadow-[#E87800]/5'
      }`}
      onClick={() => !isSold && onSelect(vehicle)}
    >
      {/* Image with skeleton shimmer */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Skeleton shown until image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton-shimmer" />
        )}

        <Image
          src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          unoptimized
          priority={priority}
          onLoad={() => setImgLoaded(true)}
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${
            isSold ? 'grayscale' : ''
          } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Label badge — top left, prominent */}
        {labelCfg && !isSold && (
          <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black tracking-wider ${labelCfg.bg} ${labelCfg.text} shadow-lg`}>
            <span>{labelCfg.icon}</span>
            <span>{labelCfg.display}</span>
          </div>
        )}

        {/* Status badge — show alongside label if label present */}
        <div className={`absolute ${labelCfg && !isSold ? 'top-2 right-2' : 'top-2 left-2'}`}>
          {isSold ? (
            <span className="bg-zinc-700 text-zinc-400 px-2 py-0.5 rounded-md text-xs font-bold">VENDIDO</span>
          ) : isReserved ? (
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md text-xs font-bold">RESERVADO</span>
          ) : !labelCfg ? (
            <span className="bg-green-500/80 text-white px-2 py-0.5 rounded-md text-xs font-bold">DISPONIBLE</span>
          ) : null}
        </div>

        {/* Dark gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-2">
          <h3 className="text-white font-bold text-base leading-tight">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-zinc-500 text-xs">{vehicle.year} · {vehicle.type}</p>
        </div>

        <div className="flex items-center gap-3 text-zinc-500 text-xs mb-3">
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {formatKm(vehicle.km)}
          </span>
          {vehicle.fuel && (
            <span className="flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              {vehicle.fuel}
            </span>
          )}
          {vehicle.transmission && (
            <span className="text-zinc-600">{vehicle.transmission}</span>
          )}
        </div>

        <div className="mt-auto">
          <div className={`text-2xl font-black mb-3 ${isSold ? 'text-zinc-600' : 'text-[#E87800]'}`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {formatPrice(vehicle.price, vehicle.currency)}
          </div>

          {!isSold ? (
            <a
              href={buildWhatsAppUrl(vehicle, phone)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              CONSULTAR
            </a>
          ) : (
            <div className="w-full py-2.5 bg-zinc-800 text-zinc-600 rounded-xl text-sm font-bold text-center">
              NO DISPONIBLE
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VehicleModalB({ vehicle, phone, onClose }: { vehicle: Vehicle; phone: string; onClose: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const labelCfg = vehicle.label ? LABEL_CONFIG[vehicle.label] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton-shimmer" />
          )}
          <Image
            src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            unoptimized
            priority
            onLoad={() => setImgLoaded(true)}
            className={`object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-zinc-950/80 border border-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          {labelCfg && (
            <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black tracking-wider ${labelCfg.bg} ${labelCfg.text} shadow-xl z-10`}>
              <span>{labelCfg.icon}</span>
              <span>{labelCfg.display}</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-2xl font-black text-white">{vehicle.brand} {vehicle.model}</h2>
              <p className="text-zinc-500 text-sm">{vehicle.year} · {vehicle.type} · {vehicle.status}</p>
            </div>
            <div
              className="text-[#E87800] font-black text-3xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {formatPrice(vehicle.price, vehicle.currency)}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { l: 'Kilómetros', v: formatKm(vehicle.km) },
              { l: 'Transmisión', v: vehicle.transmission || '—' },
              { l: 'Combustible', v: vehicle.fuel || '—' },
              { l: 'Color', v: vehicle.color || '—' },
            ].map((s) => (
              <div key={s.l} className="bg-zinc-800 rounded-xl p-3 text-center">
                <div className="text-zinc-500 text-xs mb-1">{s.l}</div>
                <div className="text-white font-bold text-sm">{s.v}</div>
              </div>
            ))}
          </div>

          {vehicle.description && (
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">{vehicle.description}</p>
          )}

          <a
            href={buildWhatsAppUrl(vehicle, phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black text-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            CONSULTAR POR WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}
