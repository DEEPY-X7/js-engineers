'use client';

import Link from 'next/link';
import { useScrollAnimation } from '@/lib/animations';

export default function CTASection() {
  const ref = useScrollAnimation();

  return (
    <section style={{
      padding: '5rem 1.5rem',
      background: 'linear-gradient(180deg, #050a18 0%, #0a1428 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        <div
          ref={ref}
          className="animate-on-scroll"
          style={{
            background: 'rgba(15, 31, 64, 0.6)',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,158,11,0.1)',
          }}
        >
          {/* Top decoration */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            {['⚡', '📡', '🛰'].map(icon => (
              <div key={icon} style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
              }}>
                {icon}
              </div>
            ))}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: '800',
            color: '#f8fafc',
            lineHeight: '1.2',
            marginBottom: '1rem',
          }}>
            Ready to Start Your<br />
            <span className="text-gradient">Next Project?</span>
          </h2>

          <p style={{
            color: '#64748b',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight: '1.7',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}>
            Get in touch today for a free consultation and estimate. We serve Prayagraj and surrounding areas.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <Link href="/contact" className="btn-primary">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Get Free Estimate
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <a href="tel:+917042099984" className="btn-outline">
              <span>📞 +91 70420 99984</span>
            </a>
          </div>

          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            color: '#475569',
            fontSize: '0.85rem',
          }}>
            <span>📍</span>
            <span>Serving Prayagraj, Uttar Pradesh &amp; surrounding areas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
