'use client';

import { useState } from 'react';

const COLORS = [
  { name: 'Black', hex: '#111111', shirt: '#1a1a1a' },
  { name: 'Charcoal Gray', hex: '#4a4a4a', shirt: '#5a5a5a' },
  { name: 'Olive Green', hex: '#556b2f', shirt: '#6b7c3a' },
  { name: 'Navy Blue', hex: '#1a2a4a', shirt: '#243656' },
  { name: 'Safety Yellow', hex: '#f5d000', shirt: '#ffd700' },
];

export default function ShopPage() {
  const [selected, setSelected] = useState(COLORS[0]);
  const [size, setSize] = useState('L');
  const [qty, setQty] = useState(1);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '1.5rem 1rem 3rem',
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid #f5d000', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', fontWeight: 800, fontSize: 11, textAlign: 'center', lineHeight: 1.1 }}>
            LINEMAN<br/>TOOL BOX
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, letterSpacing: '0.05em' }}>
              LINEMAN TOOL BOX
            </h1>
            <p style={{ margin: '0.2rem 0 0', color: '#f5d000', fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.85rem' }}>
              BROTHERHOOD • STRENGTH • MENTAL GRIT
            </p>
          </div>
        </div>
        <p style={{ color: '#f5d000', fontStyle: 'italic', fontWeight: 600, margin: '0.5rem 0 0' }}>
          Different Colors. Same Mission.
        </p>
      </header>

      <section style={{ maxWidth: 1000, margin: '0 auto 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {COLORS.map((c) => (
            <button key={c.name} onClick={() => setSelected(c)} style={{ background: 'transparent', border: selected.name === c.name ? '3px solid #f5d000' : '2px solid #333', borderRadius: 12, padding: '0.75rem', cursor: 'pointer', color: '#fff' }}>
              <div style={{ width: '100%', aspectRatio: '1', background: c.shirt, borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #444' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, textAlign: 'center', lineHeight: 1.1 }}>
                  LINEMAN<br/>TOOL BOX
                </div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{c.name.toUpperCase()}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#111', border: '1px solid #333', borderRadius: 16, padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ background: selected.shirt, borderRadius: 12, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #444', position: 'relative' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, textAlign: 'center', lineHeight: 1.2, background: 'rgba(0,0,0,0.3)' }}>
                LINEMAN<br/>TOOL BOX<br/><span style={{ fontSize: 10 }}>⚡</span>
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                {selected.name.toUpperCase()}
              </div>
            </div>
            <p style={{ textAlign: 'center', marginTop: 8, fontSize: 13, opacity: 0.8 }}>Front • Circular logo</p>
          </div>

          <div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.6rem' }}>Lineman Tool Box Tee</h2>
            <p style={{ margin: '0 0 1rem', color: '#f5d000', fontWeight: 600 }}>{selected.name} • Premium 100% Cotton</p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 6 }}>
                {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Quantity</label>
              <input type="number" min={1} max={10} value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: 100, padding: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: 6 }} />
            </div>

            <button style={{ width: '100%', background: '#f5d000', color: '#111', border: 'none', padding: '14px', fontWeight: 800, letterSpacing: 1, borderRadius: 8, cursor: 'pointer', fontSize: 16 }} onClick={() => alert(`Added ${qty}x ${selected.name} ${size} — Stripe + Printful next.`)}>
              ADD TO CART — $29.00
            </button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { title: 'PREMIUM 100% COTTON', sub: 'SOFT • DURABLE • ALL DAY COMFORT' },
          { title: 'HIGH QUALITY PRINT', sub: 'BOLD COLORS • LONG LASTING' },
          { title: 'ICONIC BACK DESIGN', sub: 'REPRESENTS THE BROTHERHOOD' },
          { title: 'BUILT FOR THE TRADE', sub: 'RUGGED & RELIABLE' },
        ].map((f) => (
          <div key={f.title} style={{ background: '#111', border: '1px solid #333', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>{f.sub}</div>
          </div>
        ))}
      </section>

      <footer style={{ textAlign: 'center', marginTop: '2.5rem', color: '#f5d000', fontWeight: 700, letterSpacing: '0.2em', fontSize: 14 }}>
        BROTHERHOOD • STRENGTH • MENTAL GRIT
      </footer>
    </div>
  );
}
