import Link from 'next/link';

export const metadata = {
  title: 'About Us | J. S. Engineers & Consultant',
  description: 'Learn about J. S. Engineers & Consultant — MSME registered engineering firm in Prayagraj offering Electrical, Telecom & Satellite services.',
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{
        padding: '5rem 1.5rem 4rem',
        background: 'linear-gradient(180deg, #0a1428 0%, #050a18 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>About Us</div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            color: '#f8fafc',
            lineHeight: '1.15',
            marginBottom: '1.25rem',
          }}>
            Engineering Trust Since <span className="text-gradient">Day One</span>
          </h1>
          <div className="divider" />
          <p style={{
            color: '#64748b',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            maxWidth: '650px',
            marginTop: '1.25rem',
          }}>
            J. S. Engineers & Consultant is a professionally managed engineering firm based in Prayagraj, delivering high-quality Electrical, Telecom, and Satellite services to homes, offices, and industries.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '5rem 1.5rem', background: '#050a18' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}>
            {/* Story */}
            <div>
              <div className="section-label" style={{ marginBottom: '0.75rem' }}>Our Story</div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                fontWeight: '700',
                color: '#f8fafc',
                marginBottom: '1.25rem',
                lineHeight: '1.3',
              }}>
                Built on <span className="text-gradient">Reliability</span> &amp; Expertise
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Founded by <strong style={{ color: '#cbd5e1' }}>Mr. Shivakant Ramkhelawan Shukla</strong>, J. S. Engineers & Consultant was established with a clear mission: to provide safe, reliable, and professional engineering services to the people of Prayagraj.
              </p>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Over the years, we have grown from a small local setup to a trusted name across Prayagraj and surrounding districts. Our work spans residential, commercial, and industrial projects — all handled with the same dedication and precision.
              </p>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.8' }}>
                We are proud to be <strong style={{ color: '#cbd5e1' }}>MSME registered</strong> and <strong style={{ color: '#cbd5e1' }}>GST compliant</strong>, reflecting our commitment to transparency and legal compliance.
              </p>
            </div>

            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Company Name', value: 'J. S. Engineers & Consultant', icon: '🏢' },
                { label: 'Founder', value: 'Mr. Shivakant Ramkhelawan Shukla', icon: '👤' },
                { label: 'Location', value: 'Prayagraj, Uttar Pradesh', icon: '📍' },
                { label: 'MSME (Udyam)', value: 'UDYAM-UP-03-0110637', icon: '🏅' },
                { label: 'GST Number', value: '09AUUPS5965Q1Z1', icon: '📋' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(15, 31, 64, 0.5)',
                  border: '1px solid rgba(245, 158, 11, 0.08)',
                  borderRadius: '10px',
                }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ color: '#475569', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: '500' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '5rem',
          }}>
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                text: 'To deliver safe, high-quality, and cost-effective engineering services that empower homes and businesses in Prayagraj with reliable infrastructure.',
                color: '#f59e0b',
              },
              {
                icon: '👁',
                title: 'Our Vision',
                text: 'To become the most trusted and preferred engineering service provider across Uttar Pradesh — known for integrity, expertise, and client satisfaction.',
                color: '#3b82f6',
              },
              {
                icon: '💎',
                title: 'Our Values',
                text: 'Quality workmanship, transparent communication, on-time delivery, safety compliance, and long-term client relationships are at the core of everything we do.',
                color: '#8b5cf6',
              },
            ].map(item => (
              <div key={item.title} style={{
                padding: '2rem',
                background: 'rgba(15, 31, 64, 0.5)',
                border: '1px solid rgba(245, 158, 11, 0.08)',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${item.color}, transparent)`,
                }} />
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#f8fafc',
                  marginBottom: '0.75rem',
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Service areas */}
          <div style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(245,158,11,0.02))',
            border: '1px solid rgba(245, 158, 11, 0.12)',
            borderRadius: '16px',
            marginBottom: '3rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: '700',
              color: '#f8fafc',
              marginBottom: '1.25rem',
            }}>
              Service Areas
            </h3>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
            }}>
              {['Prayagraj', 'Naini', 'Phaphamau', 'Jhunsi', 'Allahabad City', 'Civil Lines', 'George Town', 'Sangam Area', 'Surrounding Districts'].map(area => (
                <div key={area} style={{
                  padding: '0.4rem 1rem',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.15)',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  color: '#fbbf24',
                  fontWeight: '500',
                }}>
                  📍 {area}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <Link href="/contact" className="btn-primary" style={{ marginRight: '1rem' }}>
              <span>Get In Touch</span>
            </Link>
            <Link href="/services" className="btn-outline">
              <span>View Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
