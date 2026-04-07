'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types/vehicle';
import { formatPrice, formatKm, buildWhatsAppUrl, getUniqueBrands, filterVehicles, getWhatsAppPhone } from '@/lib/utils';
import { Search, SlidersHorizontal, X, Fuel, Gauge, Calendar, MessageCircle } from 'lucide-react';

interface Props {
  vehicles: Vehicle[];
}

const TYPE_OPTIONS = ['all', 'Auto', 'Camioneta', 'Pickup', 'SUV', 'Moto'];
const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'Disponible', label: 'Disponibles' },
  { value: 'Reservado', label: 'Reservados' },
];

export default function VehicleGridA({ vehicles }: Props) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [brand, setBrand] = useState('all');
  const [status, setStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Vehicle | null>(null);

  const brands = useMemo(() => getUniqueBrands(vehicles), [vehicles]);
  const filtered = useMemo(
    () =>
      filterVehicles(vehicles, {
        search,
        type,
        brand,
        status,
        minPrice: 0,
        maxPrice: 999999,
        minYear: 2000,
        maxYear: 2030,
      }),
    [vehicles, search, type, brand, status]
  );

  const phone = getWhatsAppPhone();

  return (
    <section id="stock" className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Stock disponible</h2>
            <p className="text-slate-500 mt-1">
              {filtered.length} vehículo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-white transition-colors bg-white shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {(type !== 'all' || brand !== 'all' || search || status !== 'all') && (
              <span className="w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo o año..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {/* Filter pills */}
        {showFilters && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Tipo</label>
                <div className="flex flex-wrap gap-2">
                  {TYPE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        type === t
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {t === 'all' ? 'Todos' : t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Marca</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las marcas</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Estado</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setStatus(s.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        status === s.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sin resultados</h3>
            <p className="text-slate-500 mb-6">Probá con otros filtros o buscá una marca diferente.</p>
            <button
              onClick={() => { setSearch(''); setType('all'); setBrand('all'); setStatus('all'); }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((v) => (
              <VehicleCardA key={v.id} vehicle={v} phone={phone} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <VehicleModalA vehicle={selected} phone={phone} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function VehicleCardA({
  vehicle,
  phone,
  onSelect,
}: {
  vehicle: Vehicle;
  phone: string;
  onSelect: (v: Vehicle) => void;
}) {
  const isSold = vehicle.status === 'Vendido';

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isSold ? 'opacity-60' : ''}`}
      onClick={() => !isSold && onSelect(vehicle)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isSold ? 'grayscale' : ''}`}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${
            vehicle.status === 'Disponible'
              ? 'bg-green-500 text-white'
              : vehicle.status === 'Reservado'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-700 text-white'
          }`}>
            {vehicle.status}
          </span>
          {vehicle.featured && vehicle.status !== 'Vendido' && (
            <span className="bg-blue-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold">
              Destacado
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
            {vehicle.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-slate-500 text-sm">{vehicle.year}</p>
          </div>
          <div className="text-right">
            <div className="text-blue-600 font-black text-xl">{formatPrice(vehicle.price, vehicle.currency)}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" />
            {formatKm(vehicle.km)}
          </span>
          {vehicle.fuel && (
            <span className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5" />
              {vehicle.fuel}
            </span>
          )}
          {vehicle.transmission && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {vehicle.transmission}
            </span>
          )}
        </div>

        {!isSold ? (
          <a
            href={buildWhatsAppUrl(vehicle, phone)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Consultar por WhatsApp
          </a>
        ) : (
          <div className="w-full py-2.5 bg-slate-100 text-slate-400 rounded-xl text-sm font-semibold text-center">
            No disponible
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleModalA({
  vehicle,
  phone,
  onClose,
}: {
  vehicle: Vehicle;
  phone: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <Image
            src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors"
          >
            <X className="w-5 h-5 text-slate-900" />
          </button>
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-xl shadow-lg">
            <span className={`text-sm font-bold ${
              vehicle.status === 'Disponible' ? 'text-green-600' : 'text-amber-600'
            }`}>{vehicle.status}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {vehicle.brand} {vehicle.model}
              </h2>
              <p className="text-slate-500">{vehicle.year} · {vehicle.type}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-blue-600">{formatPrice(vehicle.price, vehicle.currency)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Kilómetros', value: formatKm(vehicle.km) },
              { label: 'Transmisión', value: vehicle.transmission || '—' },
              { label: 'Combustible', value: vehicle.fuel || '—' },
              { label: 'Color', value: vehicle.color || '—' },
            ].map((spec) => (
              <div key={spec.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-slate-500 text-xs mb-1">{spec.label}</div>
                <div className="text-slate-900 font-semibold text-sm">{spec.value}</div>
              </div>
            ))}
          </div>

          {vehicle.description && (
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{vehicle.description}</p>
          )}

          <a
            href={buildWhatsAppUrl(vehicle, phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-green-500/25"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
