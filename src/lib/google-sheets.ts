import { Vehicle, VehicleStatus, VehicleType, Currency, Transmission, FuelType, VehicleLabel } from '@/types/vehicle';
import { MOCK_VEHICLES } from './mock-data';
import { convertGoogleDriveUrl } from './utils';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const SHEETS_TAB = process.env.GOOGLE_SHEETS_TAB || 'En Venta';

function normalizeStatus(raw: string): VehicleStatus {
  const s = raw?.trim().toLowerCase();
  if (s === 'vendido' || s === 'sold') return 'Vendido';
  if (s === 'reservado' || s === 'reserved') return 'Reservado';
  return 'Disponible';
}

function normalizeType(raw: string): VehicleType {
  const t = raw?.trim().toLowerCase();
  if (t === 'moto' || t === 'motocicleta') return 'Moto';
  if (t === 'camioneta') return 'Camioneta';
  if (t === 'pickup') return 'Pickup';
  if (t === 'suv') return 'SUV';
  return 'Auto';
}

function normalizeTransmission(raw: string): Transmission | undefined {
  const t = raw?.trim().toLowerCase();
  if (t === 'automatico' || t === 'automático' || t === 'automatica' || t === 'automática') return 'Automático';
  if (t === 'manual') return 'Manual';
  return undefined;
}

function normalizeLabel(raw: string): VehicleLabel | undefined {
  const l = raw?.trim().toLowerCase();
  if (l === 'oportunidad') return 'Oportunidad';
  if (l === 'nuevo ingreso') return 'Nuevo Ingreso';
  if (l === 'precio rebajado') return 'Precio Rebajado';
  if (l === 'top') return 'Top';
  return undefined;
}

function normalizeFuel(raw: string): FuelType | undefined {
  const f = raw?.trim().toLowerCase();
  if (f === 'nafta' || f === 'gasolina' || f === 'naphtha') return 'Nafta';
  if (f === 'diesel' || f === 'gasoil') return 'Diesel';
  if (f === 'gnc' || f === 'gas') return 'GNC';
  if (f === 'electrico' || f === 'eléctrico' || f === 'electric') return 'Eléctrico';
  if (f === 'hibrido' || f === 'híbrido' || f === 'hybrid') return 'Híbrido';
  return undefined;
}

// "$9.600.000" → 9600000  (punto = separador de miles en formato AR)
function parseARS(raw: string): number {
  if (!raw) return 0;
  return parseInt(raw.replace(/[.$\s]/g, '')) || 0;
}

// "Usd$22.000" → 22000
function parseUSD(raw: string): number {
  if (!raw) return 0;
  return parseInt(raw.replace(/[Uu][Ss][Dd]/g, '').replace(/[.$\s]/g, '')) || 0;
}

function normalizeKey(header: string): string {
  return header
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

function mapRowToVehicle(row: string[], headers: string[], index: number): Vehicle | null {
  const data: Record<string, string> = {};
  headers.forEach((h, i) => {
    data[normalizeKey(h)] = (row[i] || '').trim();
  });

  // Columnas reales del sheet: Operación, Tipo, Marca, Modelo, Versión, Año, Km,
  // Valor pesos, Valor dólares, Links, WhatsApp Directo
  if (!data.marca && !data.modelo) return null;

  const priceUSD = parseUSD(data.valor_dolares);
  const priceARS = parseARS(data.valor_pesos);
  const price = priceUSD > 0 ? priceUSD : priceARS;
  const currency: Currency = priceUSD > 0 ? 'USD' : 'ARS';

  const version = data.version || '';
  const model = version ? `${data.modelo} ${version}` : data.modelo;

  return {
    id: `${data.marca}-${data.modelo}-${data.ano}-${index}`
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''),
    brand: data.marca || 'Sin marca',
    model: model || 'Sin modelo',
    year: parseInt(data.ano) || new Date().getFullYear(),
    price,
    currency,
    km: parseInt(data.km?.replace(/\D/g, '') || '0'),
    type: normalizeType(data.tipo),
    imageUrl: convertGoogleDriveUrl(data.links || ''),
    status: normalizeStatus(data.operacion),
    label: normalizeLabel(data.etiqueta || ''),
    transmission: normalizeTransmission(data.transmision || data.caja || ''),
    fuel: normalizeFuel(data.combustible || data.nafta || ''),
  };
}

export async function getVehiclesFromSheets(): Promise<Vehicle[]> {
  // No credentials → use mock data
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[CarShip] Usando datos mock (sin credenciales de Google Sheets)');
    }
    return MOCK_VEHICLES;
  }

  try {
    // Dynamic import to avoid bundling googleapis on the client
    const { google } = await import('googleapis');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS_TAB}!A:N`,
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.warn('[CarShip] Google Sheets vacío, usando mock data');
      return MOCK_VEHICLES;
    }

    const headers = rows[0] as string[];
    const vehicles = rows
      .slice(1)
      .filter((row) => row.some((cell) => cell?.toString().trim()))
      .map((row, i) => mapRowToVehicle(row as string[], headers, i))
      .filter((v): v is Vehicle => v !== null);

    return vehicles.length > 0 ? vehicles : MOCK_VEHICLES;
  } catch (error) {
    console.error('[CarShip] Error fetching Google Sheets:', error);
    return MOCK_VEHICLES;
  }
}

// ─── Estructura del Google Spreadsheet ───────────────────────────────────────
// Columnas (fila 1 = headers, fila 2 en adelante = datos):
//
// A: Operación  B: Etiqueta  C: Tipo  D: Marca  E: Modelo  F: Versión
// G: Año  H: Km  I: Valor pesos  J: Valor dólares  K: Transmisión
// L: Combustible  M: Links (imagen)  N: WhatsApp Directo
//
// Valores válidos:
//   Operación: En Venta | Vendido | Reservado
//   Etiqueta (opcional): Oportunidad | Nuevo Ingreso | Precio Rebajado | Top
//   Tipo: Auto | Moto | Camioneta | SUV | Pickup
//   Valor pesos: $9.600.000  (punto como separador de miles)
//   Valor dólares: Usd$22.000  (punto como separador de miles)
//   Links: URL de imagen (Google Photos, Drive, etc.) — proxiada server-side
