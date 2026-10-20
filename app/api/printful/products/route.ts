import { NextResponse } from 'next/server';

const PRINTFUL_API = 'https://api.printful.com';

export async function GET() {
  const token = process.env.PRINTFUL_API_KEY;
  if (!token) {
    return NextResponse.json({ error: 'Missing PRINTFUL_API_KEY' }, { status: 500 });
  }

  try {
    // List products in your Printful store
    const res = await fetch(`${PRINTFUL_API}/store/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: 'Printful error', details: err }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.result || []);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
