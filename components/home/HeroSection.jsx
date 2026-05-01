'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="hero-gradient grid-bg noise"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        border: '1px solid rgba(245, 158, 11, 0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '1px solid rgba(245, 158, 11, 0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        border: '1px solid rgba(245, 158, 11, 0.05)',
        pointerEvents: 'none',
      }} />

      {/* Glowing orb */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '15%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          maxWidth: '760px',
        }}>
          {/* Label */}
          <div
            className="badge"
            style={{
              marginBottom: '2rem',
              animation: 'fadeUp 0.6s ease 0.1s both',
            }}
          >
            <span style={{ color: '#f59e0b' }}>●</span>
            MSME Registered · GST Compliant
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              color: '#f8fafc',
              marginBottom: '1.5rem',
              animation: 'fadeUp 0.7s ease 0.2s both',
            }}
          >
            Engineering{' '}
            <span className="text-gradient">Excellence</span>
            <br />
            for Prayagraj
          </h1>

          {/* Animated line */}
          <div style={{
            height: '3px',
            background: 'linear-gradient(90deg, #f59e0b, transparent)',
            borderRadius: '2px',
            marginBottom: '1.75rem',
            animation: 'lineGrow 1s ease 0.6s both',
            width: '0',
          }} className="line-grow" />

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: '#94a3b8',
              lineHeight: '1.8',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              animation: 'fadeUp 0.7s ease 0.4s both',
            }}
          >
            Professional <strong style={{ color: '#cbd5e1' }}>Electrical, Telecom &amp; Satellite</strong> engineering services you can trust. Serving homes, offices, and industries across Prayagraj and nearby areas.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              animation: 'fadeUp 0.7s ease 0.55s both',
            }}
          >
            <Link href="/contact" className="btn-primary">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Get Free Estimate
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link href="/services" className="btn-outline">
              <span>View Services</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s ease 0.7s both',
          }}>
            {[
              { icon: '✓', text: '10+ Years Experience' },
              { icon: '✓', text: 'Licensed & Certified' },
              { icon: '✓', text: 'On-time Delivery' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem',
                  color: '#f59e0b',
                  fontWeight: '700',
                }}>
                  {item.icon}
                </div>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating service cards (right side, desktop only) */}
        <div style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }} className="hero-cards">
          {[
            { icon: '⚡', title: 'Electrical', desc: 'Installation & Maintenance' },
            { icon: '📡', title: 'Telecom', desc: 'Network & Infrastructure' },
            { icon: '🛰', title: 'Satellite', desc: 'Dish Installation & Setup' },
          ].map((card, i) => (
            <div
              key={card.title}
              style={{
                background: 'rgba(15, 31, 64, 0.8)',
                border: '1px solid rgba(245, 158, 11, 0.12)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                backdropFilter: 'blur(20px)',
                animation: `fadeUp 0.6s ease ${0.5 + i * 0.15}s both`,
                width: '200px',
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {card.icon}
              </div>
              <div>
                <div style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.875rem' }}>{card.title}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>{card.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(transparent, #050a18)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 1024px) {
          .hero-cards { display: none !important; }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to { width: 80px; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
