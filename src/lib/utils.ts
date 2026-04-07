import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Vehicle } from '@/types/vehicle';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: 'USD' | 'ARS'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('es-AR').format(km) + ' km';
}

export function buildWhatsAppUrl(vehicle: Vehicle, phone: string): string {
  const message = encodeURIComponent(
    `¡Hola! 👋 Me interesa el *${vehicle.brand} ${vehicle.model} ${vehicle.year}* que vi en el sitio web. ¿Podés darme más información y el precio final? Gracias!`
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export function getWhatsAppPhone(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491112345678';
}

// Convert Google Drive share URL to direct image URL
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
}

export function getUniqueBrands(vehicles: Vehicle[]): string[] {
  return Array.from(new Set(vehicles.map((v) => v.brand))).sort();
}

export function filterVehicles(
  vehicles: Vehicle[],
  filters: {
    search: string;
    type: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    minYear: number;
    maxYear: number;
    status: string;
  }
): Vehicle[] {
  return vehicles.filter((vehicle) => {
    const searchLower = filters.search.toLowerCase();
    if (
      searchLower &&
      !vehicle.brand.toLowerCase().includes(searchLower) &&
      !vehicle.model.toLowerCase().includes(searchLower) &&
      !vehicle.year.toString().includes(searchLower)
    )
      return false;

    if (filters.type !== 'all' && vehicle.type !== filters.type) return false;
    if (filters.brand !== 'all' && vehicle.brand !== filters.brand) return false;
    if (vehicle.price < filters.minPrice || vehicle.price > filters.maxPrice) return false;
    if (vehicle.year < filters.minYear || vehicle.year > filters.maxYear) return false;
    if (filters.status !== 'all' && vehicle.status !== filters.status) return false;

    return true;
  });
}
