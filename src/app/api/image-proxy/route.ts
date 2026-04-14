import { NextRequest, NextResponse } from 'next/server';

const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Allowed hostnames for proxying (security: only allow Google image CDNs)
const ALLOWED_HOSTNAMES = [
  'photos.fife.usercontent.google.com',
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
  'drive.google.com',
];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_HOSTNAMES.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith('.' + host)
    );
  } catch {
    return false;
  }
}

async function getGoogleAccessToken(): Promise<string | null> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) return null;

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/spreadsheets.readonly',
      ],
    });
    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    return tokenResponse.token ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  if (!isAllowedUrl(imageUrl)) {
    return new NextResponse('URL not allowed', { status: 403 });
  }

  try {
    // Try fetching with Google auth token first (for private images)
    const token = await getGoogleAccessToken();

    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (compatible; RuzAutomotores/1.0)',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(imageUrl, { headers });

    if (!response.ok) {
      // If auth failed, try without auth (public images)
      if (token) {
        const publicResponse = await fetch(imageUrl, {
          headers: { 'User-Agent': headers['User-Agent'] },
        });
        if (!publicResponse.ok) {
          return new NextResponse('Image not found', { status: 404 });
        }
        return serveImage(publicResponse);
      }
      return new NextResponse('Image not found', { status: 404 });
    }

    return serveImage(response);
  } catch (error) {
    console.error('[image-proxy] Error fetching image:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}

async function serveImage(response: Response): Promise<NextResponse> {
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
