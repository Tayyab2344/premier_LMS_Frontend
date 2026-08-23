/**
 * POST /api/zoom/signature
 *
 * Generates the Zoom Meeting SDK HS256 JWT signature server-side.
 * HARDENED:
 * 1. Requires valid JWT session authentication (Bearer token or accessToken cookie).
 * 2. Role is strictly computed server-side from the verified user session (never trusted from client).
 * 3. Enforces in-memory IP-based rate limiting (10 requests/min).
 *
 * Response:
 *   200 { signature: string, role: 0 | 1 }
 *   400 { error: string }
 *   401 { error: string }
 *   429 { error: string }
 *   500 { error: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const SDK_KEY = process.env.ZOOM_SDK_KEY;
const SDK_SECRET = process.env.ZOOM_SDK_SECRET;
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

if (!SDK_KEY || !SDK_SECRET) {
  console.error(
    '[zoom/signature] ⚠️ ZOOM_SDK_KEY or ZOOM_SDK_SECRET is not set. ' +
    'Signature generation will fail for all requests.',
  );
}

// ─── In-Memory Rate Limiting (10 requests / min per IP) ─────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string, limit = 10, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= limit) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Periodic cleanup of expired rate limit entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

// ─── Helpers ─────────────────────────────────────────────────────────────────
function base64UrlEncodeObject(obj: Record<string, unknown>): string {
  return Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function normalizeMeetingNumber(raw: unknown): string {
  if (typeof raw !== 'string' && typeof raw !== 'number') {
    throw new RangeError('meetingNumber must be a string or number.');
  }
  const normalized = String(raw).replace(/\D/g, '');
  if (!normalized) {
    throw new RangeError(
      'meetingNumber contains no digits. Provide the numeric Zoom meeting ID.',
    );
  }
  return normalized;
}

function generateZoomSignature(meetingNumber: string, role: 0 | 1): string {
  if (!SDK_KEY || !SDK_SECRET) {
    throw new Error('Zoom SDK credentials are not configured on the server.');
  }

  const iat = Math.floor(Date.now() / 1000) - 30; // 30s grace for clock skew
  const exp = iat + 60 * 60 * 2;                  // 2-hour validity window

  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    appKey:   SDK_KEY,
    sdkKey:   SDK_KEY,
    mn:       Number(meetingNumber),
    role,
    iat,
    exp,
    tokenExp: exp,
  };

  const headerEncoded  = base64UrlEncodeObject(header);
  const payloadEncoded = base64UrlEncodeObject(payload);
  const signingInput   = `${headerEncoded}.${payloadEncoded}`;

  const signature = createHmac('sha256', SDK_SECRET)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. IP Extraction & Rate Limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many signature requests. Please wait a minute.' },
      { status: 429 },
    );
  }

  // 2. Authentication: Extract Token from Authorization header or Cookies
  let token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) {
    token = request.cookies.get('accessToken')?.value;
  }

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required. Missing authorization token.' },
      { status: 401 },
    );
  }

  // 3. Verify session & resolve user role from Backend
  let userRole = 'student';
  try {
    const profileRes = await fetch(`${BACKEND_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileRes.ok) {
      return NextResponse.json(
        { error: 'Invalid or expired session. Please log in again.' },
        { status: 401 },
      );
    }

    const profile = await profileRes.json();
    userRole = profile?.role || 'student';
  } catch (err: any) {
    console.error('[zoom/signature] Auth verification failed:', err.message);
    return NextResponse.json(
      { error: 'Unable to verify session with authentication server.' },
      { status: 500 },
    );
  }

  // 4. Parse request body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const { meetingNumber } = body;

  if (meetingNumber === undefined || meetingNumber === null || meetingNumber === '') {
    return NextResponse.json(
      { error: 'meetingNumber is required.' },
      { status: 400 },
    );
  }

  // 5. Normalize meeting number
  let normalizedMeetingNumber: string;
  try {
    normalizedMeetingNumber = normalizeMeetingNumber(meetingNumber);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // 6. Enforce Server-Side Role (NEVER trust client-supplied role)
  const isModerator = userRole.toLowerCase() === 'admin' || userRole.toLowerCase() === 'teacher';
  const role: 0 | 1 = isModerator ? 1 : 0;

  // 7. Generate signature
  try {
    const signature = generateZoomSignature(normalizedMeetingNumber, role);
    return NextResponse.json(
      {
        signature,
        role,
        notice: 'For full virtual classroom integration, prefer backend endpoint GET /api/classes/:id/join',
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('[zoom/signature] Signature generation failed:', err.message);
    return NextResponse.json(
      { error: 'Failed to generate Zoom signature. Check server configuration.' },
      { status: 500 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
