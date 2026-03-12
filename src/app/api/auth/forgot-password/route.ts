import { NextResponse } from 'next/server';

const SERVER_URL = process.env.SERVER_URL;

type PayloadErrorResponse = {
  message?: string;
  errors?: Array<{ message?: string }>;
};

const getErrorMessage = (data: PayloadErrorResponse, fallback: string) => {
  return data.errors?.[0]?.message ?? data.message ?? fallback;
};

async function resolveUserEmail(loginInput: string): Promise<string | null> {
  if (!SERVER_URL) {
    console.log('[forgot-password] resolveUserEmail: SERVER_URL not set');
    return null;
  }

  try {
    const queryField = loginInput.includes('@') ? 'email' : 'username';
    const url = `${SERVER_URL}/api/users?where[${queryField}][equals]=${encodeURIComponent(loginInput)}&limit=1`;
    console.log('[forgot-password] resolveUserEmail: fetching', url);
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.log('[forgot-password] resolveUserEmail: users API failed', res.status, res.statusText);
      return null;
    }

    const text = await res.text();
    if (!text) {
      console.log('[forgot-password] resolveUserEmail: empty response body');
      return null;
    }
    try {
      const data = JSON.parse(text) as { docs?: Array<{ email?: string }> };
      const email = data.docs?.[0]?.email ?? null;
      console.log('[forgot-password] resolveUserEmail: found email =', email ? '***' : null);
      return email;
    } catch (parseErr) {
      console.log('[forgot-password] resolveUserEmail: JSON parse error', parseErr);
      return null;
    }
  } catch (err) {
    console.log('[forgot-password] resolveUserEmail: fetch error', err);
    return null;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  console.log('[forgot-password] POST received');
  try {
    if (!SERVER_URL) {
      console.log('[forgot-password] SERVER_URL not configured');
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as { email?: string };
    const loginInput = body.email?.trim();
    console.log('[forgot-password] loginInput:', loginInput ? `${loginInput.slice(0, 3)}***` : '(empty)');

    if (!loginInput) {
      return NextResponse.json({ message: 'Email or username is required.' }, { status: 400 });
    }

    const email = await resolveUserEmail(loginInput);

    if (!email) {
      console.log('[forgot-password] User not found for loginInput');
      return NextResponse.json({ message: 'User is not registered.' }, { status: 404 });
    }

    const forgotUrl = `${SERVER_URL}/api/users/forgot-password`;
    console.log('[forgot-password] Calling forgot-password:', forgotUrl);
    const payloadRes = await fetch(forgotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const contentType = payloadRes.headers.get('content-type');
    const text = await payloadRes.text();
    console.log('[forgot-password] forgot-password response:', {
      status: payloadRes.status,
      statusText: payloadRes.statusText,
      contentType,
      bodyPreview: text ? text.slice(0, 300) : '(empty)',
    });

    let payloadData: PayloadErrorResponse = {};
    if (text && contentType?.includes('application/json')) {
      try {
        payloadData = JSON.parse(text) as PayloadErrorResponse;
      } catch (parseErr) {
        console.log('[forgot-password] forgot-password response JSON parse error:', parseErr);
      }
    }

    if (!payloadRes.ok) {
      console.log('[forgot-password] forgot-password failed:', payloadData);
      return NextResponse.json(
        { message: getErrorMessage(payloadData, 'Forgot password failed.') },
        { status: payloadRes.status }
      );
    }

    console.log('[forgot-password] Success');
    return NextResponse.json({
      message: payloadData.message ?? 'Password reset email sent.',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;
    console.error('[forgot-password] CAUGHT ERROR:', message);
    console.error('[forgot-password] Stack:', stack);
    return NextResponse.json(
      { message: 'Forgot password failed.', error: process.env.NODE_ENV === 'development' ? message : undefined },
      { status: 500 }
    );
  }
}
