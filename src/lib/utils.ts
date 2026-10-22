import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Currency, Vehicle } from '@/types/vehicle';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: 'USD' | 'ARS'): string {
  if (!price || price === 0) return 'Consultar precio';
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

export function buildWhatsAppUrl(vehicle: Vehicle, fallbackPhone: string): string {
  const wa = vehicle.whatsappNumber;
  // Sheet column "WhatsApp Directo" already contains the full wa.me URL
  if (wa?.startsWith('http')) return wa;
  const phone = wa || fallbackPhone;
  const message = encodeURIComponent(
    `¡Hola! 👋 Me interesa el *${vehicle.brand} ${vehicle.model} ${vehicle.year}* que vi en el sitio web. ¿Podés darme más información y el precio final? Gracias!`
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export function getWhatsAppPhone(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '543493459503';
}

// Convert Google Drive/Photos URL to a proxied or direct image URL
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';

  // Google Drive share URL → direct view URL
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `/api/image-proxy?url=${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${driveMatch[1]}`)}`;
  }

  // Google Photos / usercontent URLs → route through proxy to handle auth
  if (
    url.includes('usercontent.google.com') ||
    url.includes('googleusercontent.com')
  ) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }

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
    minPrice: number | null;
    maxPrice: number | null;
    currency: Currency | 'all';
    minYear: number;
    maxYear: number;
    status: string;
  }
): Vehicle[] {
  const minPrice = filters.minPrice != null && filters.minPrice > 0 ? filters.minPrice : null;
  const maxPrice = filters.maxPrice != null && filters.maxPrice > 0 ? filters.maxPrice : null;
  const priceActive = minPrice != null || maxPrice != null;

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
    if (vehicle.year < filters.minYear || vehicle.year > filters.maxYear) return false;
    if (filters.status !== 'all' && vehicle.status !== filters.status) return false;

    if (priceActive) {
      if (!vehicle.price) return false;
      if (filters.currency !== 'all' && vehicle.currency !== filters.currency) return false;
      if (minPrice != null && vehicle.price < minPrice) return false;
      if (maxPrice != null && vehicle.price > maxPrice) return false;
    }

    return true;
  });
}
