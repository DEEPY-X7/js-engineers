'use client';

import { useScrollAnimation, useStaggerAnimation } from '@/lib/animations';

const reasons = [
  {
    icon: '🏅',
    title: 'MSME Registered',
    desc: 'Officially registered under UDYAM (UDYAM-UP-03-0110637). Government-recognized and GST compliant business.',
  },
  {
    icon: '🔧',
    title: 'Expert Technicians',
    desc: 'Our team is skilled, trained, and experienced in all domains — electrical, telecom, and satellite systems.',
  },
  {
    icon: '⚡',
    title: 'Fast Response',
    desc: 'We understand urgency. Quick turnaround times for both new installations and emergency repairs.',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    desc: 'No hidden charges. We provide clear estimates upfront — what you see is what you pay.',
  },
  {
    icon: '🔒',
    title: 'Safety First',
    desc: 'All work is done following safety standards and electrical codes. Your property and people are always protected.',
  },
  {
    icon: '🤝',
    title: 'Long-term Support',
    desc: 'We don\'t disappear after the job. Ongoing maintenance and support to keep your systems running smooth.',
  },
];

export default function WhyUsSection() {
  const headingRef = useScrollAnimation();
  const gridRef = useStaggerAnimation();

  return (
    <section style={{
      padding: '6rem 1.5rem',
      background: 'linear-gradient(180deg, #050a18 0%, #0a1428 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Big decorative text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-5%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(6rem, 15vw, 14rem)',
        fontWeight: '800',
        color: 'rgba(245, 158, 11, 0.03)',
        letterSpacing: '-0.05em',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        WHY US
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <div ref={headingRef} className="animate-on-scroll" style={{ marginBottom: '4rem', maxWidth: '600px' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Why Choose Us</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#f8fafc',
            lineHeight: '1.2',
            marginBottom: '1rem',
          }}>
            The <span className="text-gradient">JS Engineers</span> Difference
          </h2>
          <div className="divider" />
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.7', marginTop: '1.25rem' }}>
            We bring professionalism, precision, and care to every project — big or small.
          </p>
        </div>

        <div ref={gridRef} className="stagger-children" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {reasons.map(reason => (
            <div
              key={reason.title}
              className="card-hover"
              style={{
                padding: '1.75rem',
                background: 'rgba(10, 20, 40, 0.6)',
                border: '1px solid rgba(245, 158, 11, 0.07)',
                borderRadius: '14px',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
              }}>
                {reason.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                }}>
                  {reason.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.65' }}>
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Owner block */}
        <div style={{
          marginTop: '3.5rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(245,158,11,0.02))',
          border: '1px solid rgba(245, 158, 11, 0.12)',
          borderRadius: '16px',
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            flexShrink: 0,
          }}>
            👤
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              color: '#f8fafc',
              fontStyle: 'italic',
              marginBottom: '0.5rem',
            }}>
              "Our commitment is simple — deliver quality work on time, every time. Your trust is our biggest achievement."
            </p>
            <div style={{ color: '#f59e0b', fontWeight: '600', fontSize: '0.9rem' }}>
              Mr. Shivakant Ramkhelawan Shukla
            </div>
            <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Founder &amp; Project Manager</div>
          </div>
        </div>
      </div>
    </section>
  );
}
