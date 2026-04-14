export type VehicleStatus = 'Disponible' | 'Reservado' | 'Vendido';
export type VehicleType = 'Auto' | 'Moto' | 'Camioneta' | 'SUV' | 'Pickup';
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
}

export interface VehicleFilters {
  search: string;
  type: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  status: string;
}

export const DEFAULT_FILTERS: VehicleFilters = {
  search: '',
  type: 'all',
  brand: 'all',
  minPrice: 0,
  maxPrice: 150000,
  minYear: 2010,
  maxYear: new Date().getFullYear() + 1,
  status: 'all',
};
