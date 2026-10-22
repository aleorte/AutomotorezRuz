export type VehicleStatus = 'Disponible' | 'Reservado' | 'Vendido' | 'Oculto';
export type VehicleType = 'Auto' | 'Moto' | 'Camioneta' | 'SUV';
export type Currency = 'USD' | 'ARS';
export type Transmission = 'Manual' | 'Automático';
export type FuelType = 'Nafta' | 'Diesel' | 'Eléctrico' | 'Híbrido' | 'GNC';
export type Condition = 'Excelente' | 'Muy Bueno' | 'Bueno';
export type VehicleLabel = 'Oportunidad' | 'Nuevo Ingreso' | 'Precio Rebajado' | 'Top';

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: Currency;
  km: number;
  type: VehicleType;
  imageUrl: string;
  status: VehicleStatus;
  label?: VehicleLabel;
  color?: string;
  transmission?: Transmission;
  fuel?: FuelType;
  doors?: number;
  description?: string;
  condition?: Condition;
  featured?: boolean;
  whatsappNumber?: string;
}

export interface VehicleFilters {
  search: string;
  type: string;
  brand: string;
  minPrice: number | null;
  maxPrice: number | null;
  currency: Currency | 'all';
  minYear: number;
  maxYear: number;
  status: string;
}

export const DEFAULT_FILTERS: VehicleFilters = {
  search: '',
  type: 'all',
  brand: 'all',
  minPrice: null,
  maxPrice: null,
  currency: 'all',
  minYear: 2010,
  maxYear: new Date().getFullYear() + 1,
  status: 'all',
};
