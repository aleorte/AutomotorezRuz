import { NextResponse } from 'next/server';
import { getVehiclesFromSheets } from '@/lib/google-sheets';

// ISR: revalidate every 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const vehicles = await getVehiclesFromSheets();
    return NextResponse.json(vehicles, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Error al obtener vehículos' }, { status: 500 });
  }
}
