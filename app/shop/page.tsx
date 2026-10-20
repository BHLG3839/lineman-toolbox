'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  thumbnail_url?: string;
  variants?: number;
};

const COLORS = [
  { name: 'Black', hex: '#111' },
  { name: 'Charcoal Gray', hex: '#3a3a3a' },
  { name: 'Olive Green', hex: '#5a5c3a' },
  { name: 'Navy Blue', hex: '#1a2a4a' },
  { name: 'Safety Yellow', hex: '#f5d000' },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch('/api/printful/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const product = products[0]; // first product for now

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif', color: '#eee', background: '#111' }}>
      <h1 style={{ fontSize: '2rem', letterSpacing: 1 }}>LINEMAN TOOL BOX</h1>
      <p style={{ color: '#f5d000', marginTop: -8 }}>BROTHERHOOD • STRENGTH • MENTAL GRIT</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div>
          {/* Use your mockup image or Printful thumbnail */}
          <img
            src={product?.thumbnail_url || '/lineman-toolbox-mockup.jpg'}
            alt="Lineman Tool Box Tee"
            style={{ width: '100%', borderRadius: 8, background: '#222' }}
          />
          <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>Premium 100% cotton • High quality print • Built for the trade</p>
        </div>

        <div>
          <h2 style={{ margin: '0 0 1rem' }}>Lineman Tool Box Tee</h2>

          <label>Color</label>
          <div style={{ display: 'flex', gap: 8, margin: '8px 0 16px', flexWrap: 'wrap' }}>
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: selectedColor === c.name ? '3px solid #f5d000' : '2px solid #555',
                  background: c.hex,
                  cursor: 'pointer',
                }}
                title={c.name}
              />
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>{selectedColor}</div>

          <label>Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} style={{ display: 'block', margin: '8px 0 16px', padding: 8, background: '#222', color: '#eee', border: '1px solid #444' }}>
            {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            type="number"
            min={1}
            max={10}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            style={{ display: 'block', width: 80, margin: '8px 0 16px', padding: 8, background: '#222', color: '#eee', border: '1px solid #444' }}
          />

          <button
            style={{
              background: '#f5d000',
              color: '#111',
              border: 'none',
              padding: '12px 24px',
              fontWeight: 700,
              letterSpacing: 1,
              cursor: 'pointer',
              width: '100%',
            }}
            onClick={() => alert('Connect Stripe + pass sync_variant_id from Printful here. See README.')}
          >
            ADD TO CART — $29.00
          </button>

          <ul style={{ fontSize: 14, lineHeight: 1.6, marginTop: 24, opacity: 0.85 }}>
            <li>Built for the trade</li>
            <li>Rugged & reliable</li>
            <li>Breathable comfort</li>
            <li>Lifetime mentality</li>
          </ul>
        </div>
      </div>

      {loading && <p>Loading products from Printful…</p>}
      {!loading && products.length === 0 && (
        <p style={{ marginTop: 24, opacity: 0.7 }}>
          No products yet. Create the tee in Printful first, then refresh.
        </p>
      )}
    </main>
  );
}
