import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#050a18', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(5rem,15vw,9rem)', fontWeight: '800', color: 'rgba(245,158,11,.12)', lineHeight: 1, marginBottom: '-1rem' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: '700', color: '#f8fafc', marginBottom: '1rem' }}>
          Page Nahi Mili
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
          Yeh page exist nahi karta. Shayad link galat ho ya page hata diya gaya ho.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary"><span>← Home Par Jaayein</span></Link>
          <Link href="/contact" className="btn-outline"><span>Contact Karein</span></Link>
        </div>
      </div>
    </div>
  );
}
