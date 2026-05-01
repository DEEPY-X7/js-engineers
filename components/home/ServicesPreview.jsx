'use client';

import Link from 'next/link';
import { useScrollAnimation, useStaggerAnimation } from '@/lib/animations';

const services = [
  {
    icon: '⚡',
    title: 'Electrical Services',
    description: 'Complete electrical solutions — from home wiring to industrial panel installation. Safe, certified, and compliant with all standards.',
    features: ['Panel Wiring & Installation', 'Home & Commercial Wiring', 'AC Installation & Maintenance', 'Fault Detection & Repair'],
    href: '/services#electrical',
    color: '#f59e0b',
  },
  {
    icon: '📡',
    title: 'Telecom Services',
    description: 'End-to-end telecom infrastructure support — network setup, equipment installation, and ongoing maintenance for stable communication.',
    features: ['Telecom Equipment Setup', 'Wired Network Maintenance', 'Wireless Network Support', 'Site Operations & Upkeep'],
    href: '/services#telecom',
    color: '#3b82f6',
  },
  {
    icon: '🛰',
    title: 'Satellite Services',
    description: 'Expert satellite dish installation and signal configuration for reliable broadcasting and communication systems.',
    features: ['Dish Installation', 'Signal Configuration', 'Satellite Network Setup', 'Troubleshooting & Upgrades'],
    href: '/services#satellite',
    color: '#8b5cf6',
  },
];

export default function ServicesPreview() {
  const headingRef = useScrollAnimation();
  const cardsRef = useStaggerAnimation();

  return (
    <section style={{
      padding: '6rem 1.5rem',
      background: '#050a18',
      position: 'relative',
    }}>
      {/* Subtle bg pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <div ref={headingRef} className="animate-on-scroll" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>What We Do</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: '700',
              color: '#f8fafc',
              lineHeight: '1.2',
            }}>
              Our Core <span className="text-gradient">Services</span>
            </h2>
            <Link href="/services" className="btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
              View All Services →
            </Link>
          </div>
          <div className="divider" style={{ marginTop: '1rem' }} />
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="stagger-children" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map(service => (
            <div
              key={service.title}
              className="card-hover"
              style={{
                background: 'rgba(15, 31, 64, 0.5)',
                border: '1px solid rgba(245, 158, 11, 0.08)',
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${service.color}, transparent)`,
              }} />

              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '14px',
                background: `rgba(${service.color === '#f59e0b' ? '245,158,11' : service.color === '#3b82f6' ? '59,130,246' : '139,92,246'}, 0.1)`,
                border: `1px solid rgba(${service.color === '#f59e0b' ? '245,158,11' : service.color === '#3b82f6' ? '59,130,246' : '139,92,246'}, 0.2)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                marginBottom: '1.25rem',
              }}>
                {service.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#f8fafc',
                marginBottom: '0.75rem',
              }}>
                {service.title}
              </h3>

              <p style={{
                color: '#64748b',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
              }}>
                {service.description}
              </p>

              {/* Feature list */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {service.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: service.color, flexShrink: 0,
                    }} />
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={service.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: service.color,
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'gap 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '0.7rem'}
                onMouseLeave={e => e.currentTarget.style.gap = '0.4rem'}
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
