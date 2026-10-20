import { NextResponse } from 'next/server';

const PRINTFUL_API = 'https://api.printful.com';

export async function POST(request: Request) {
  const token = process.env.PRINTFUL_API_KEY;
  if (!token) {
    return NextResponse.json({ error: 'Missing PRINTFUL_API_KEY' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { recipient, items } = body;

    if (!recipient || !items?.length) {
      return NextResponse.json({ error: 'recipient and items required' }, { status: 400 });
    }

    // Create draft order in Printful
    const res = await fetch(`${PRINTFUL_API}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipient,
        items, // [{ sync_variant_id, quantity, retail_price? }]
        shipping: 'STANDARD',
      }),
    });

    const data = await res.json();

    if (!res.ok || data.code !== 200) {
      return NextResponse.json({ error: data.error || 'Order failed', details: data }, { status: 400 });
    }

    return NextResponse.json({
      orderId: data.result.id,
      status: data.result.status,
      dashboardUrl: data.result.dashboard_url,
    });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
