'use client';

import { useScrollAnimation, useStaggerAnimation } from '@/lib/animations';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Factory Owner, Prayagraj',
    text: 'JS Engineers handled our complete factory electrical wiring. Very professional team, work was done on time and safety standards were strictly followed. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sanjay Verma',
    role: 'Office Manager',
    text: 'We needed urgent telecom infrastructure support and JS Engineers responded quickly. Excellent service, fair pricing, and the team was very knowledgeable.',
    rating: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Homeowner',
    text: 'Got my satellite dish installed and they configured everything perfectly. Signal quality is amazing. The team was polite and completed the job neatly.',
    rating: 5,
  },
  {
    name: 'Amit Tiwari',
    role: 'Business Owner',
    text: 'Very reliable and honest company. They gave us a proper estimate and stuck to it. AC installation and electrical work done beautifully in our new office.',
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < count ? '#f59e0b' : 'rgba(245,158,11,0.2)'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const headingRef = useScrollAnimation();
  const gridRef = useStaggerAnimation();

  return (
    <section style={{
      padding: '6rem 1.5rem',
      background: '#050a18',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div ref={headingRef} className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Testimonials</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: '700',
            color: '#f8fafc',
            marginBottom: '1rem',
          }}>
            What Our Clients <span className="text-gradient">Say</span>
          </h2>
          <div className="divider" style={{ margin: '0 auto' }} />
        </div>

        <div ref={gridRef} className="stagger-children" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map(t => (
            <div
              key={t.name}
              className="card-hover"
              style={{
                background: 'rgba(15, 31, 64, 0.5)',
                border: '1px solid rgba(245, 158, 11, 0.08)',
                borderRadius: '16px',
                padding: '1.75rem',
                position: 'relative',
              }}
            >
              <div className="quote-mark">"</div>
              <StarRating count={t.rating} />
              <p style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
              }}>
                {t.text}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(245, 158, 11, 0.07)',
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  color: '#f59e0b',
                  fontSize: '1rem',
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
