import { Vehicle, VehicleStatus, VehicleType, Currency, Transmission, FuelType, Condition } from '@/types/vehicle';
import { MOCK_VEHICLES } from './mock-data';
import { convertGoogleDriveUrl } from './utils';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const SHEETS_TAB = process.env.GOOGLE_SHEETS_TAB || 'Stock';

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

function mapRowToVehicle(row: string[], headers: string[]): Vehicle | null {
  const data: Record<string, string> = {};
  headers.forEach((h, i) => {
    // Normalize header keys: lowercase, remove accents, trim
    const key = h
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_');
    data[key] = (row[i] || '').trim();
  });

  if (!data.id && !data.marca) return null;

  const rawImageUrl = data.imagen_url || data.imagen || data.imagenurl || data.foto || '';

  return {
    id: data.id || String(Math.random()),
    brand: data.marca || 'Sin marca',
    model: data.modelo || 'Sin modelo',
    year: parseInt(data.ano || data.year) || new Date().getFullYear(),
    price: parseFloat(data.precio?.replace(/[.,]/g, (m, o, s) =>
      s.lastIndexOf(',') > s.lastIndexOf('.') ? (m === ',' ? '.' : '') : m === '.' ? '' : '.'
    )) || 0,
    currency: (data.moneda?.toUpperCase() as Currency) || 'USD',
    km: parseInt(data.km?.replace(/\D/g, '') || '0'),
    type: normalizeType(data.tipo),
    imageUrl: convertGoogleDriveUrl(rawImageUrl),
    status: normalizeStatus(data.estado),
    color: data.color || undefined,
    transmission: data.transmision as Transmission || undefined,
    fuel: data.combustible as FuelType || undefined,
    doors: parseInt(data.puertas) || undefined,
    description: data.descripcion || undefined,
    condition: data.condicion as Condition || undefined,
    featured: data.destacado?.toLowerCase() === 'si' || data.destacado?.toLowerCase() === 'sí',
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
      range: `${SHEETS_TAB}!A:R`,
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
      .map((row) => mapRowToVehicle(row as string[], headers))
      .filter((v): v is Vehicle => v !== null);

    return vehicles.length > 0 ? vehicles : MOCK_VEHICLES;
  } catch (error) {
    console.error('[CarShip] Error fetching Google Sheets:', error);
    return MOCK_VEHICLES;
  }
}

// ─── Estructura recomendada del Google Spreadsheet ────────────────────────────
// Nombre de la hoja: "Stock"
// Columnas (fila 1 = headers, fila 2 en adelante = datos):
//
// | ID | Marca | Modelo | Año | Precio | Moneda | KM | Tipo | Imagen URL | Estado | Color | Transmisión | Combustible | Puertas | Descripción | Condición | Destacado |
//
// Valores válidos:
//   Estado: Disponible | Reservado | Vendido
//   Tipo: Auto | Moto | Camioneta | Pickup | SUV
//   Moneda: USD | ARS
//   Transmisión: Manual | Automático
//   Combustible: Nafta | Diesel | Eléctrico | Híbrido | GNC
//   Condición: Excelente | Muy Bueno | Bueno
//   Destacado: Si | No
//
// Para imágenes desde Google Drive:
//   1. Subir la imagen a Drive
//   2. Click derecho → "Obtener enlace" → Cambiar a "Cualquier persona con el enlace"
//   3. Copiar el enlace (formato: https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
//   4. Pegar la URL completa en la columna "Imagen URL"
//   El sistema la convierte automáticamente al formato correcto.
