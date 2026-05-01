import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #050a18 0%, #030810 100%)',
      borderTop: '1px solid rgba(245, 158, 11, 0.1)',
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2.5rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                fontSize: '1.1rem',
                color: '#050a18',
              }}>
                JS
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: '#f8fafc', fontSize: '1rem' }}>
                  J. S. Engineers
                </div>
                <div style={{ fontSize: '0.65rem', color: '#f59e0b', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '600' }}>
                  &amp; Consultant
                </div>
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              Professional Electrical, Telecom &amp; Satellite engineering services in Prayagraj, UP. MSME registered &amp; GST compliant.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://wa.me/917042099984" target="_blank" rel="noopener noreferrer"
                style={{
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366',
                  textDecoration: 'none', transition: 'all 0.2s ease', fontSize: '1rem',
                }}>
                💬
              </a>
              <a href="tel:+917042099984"
                style={{
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b',
                  textDecoration: 'none', transition: 'all 0.2s ease', fontSize: '1rem',
                }}>
                📞
              </a>
              <a href="mailto:js.engineeringconsultant77@gmail.com"
                style={{
                  width: '38px', height: '38px', borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b',
                  textDecoration: 'none', transition: 'all 0.2s ease', fontSize: '1rem',
                }}>
                ✉
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: '#f8fafc', marginBottom: '1.25rem', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#f59e0b', fontSize: '0.6rem' }}>▶</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: '#f8fafc', marginBottom: '1.25rem', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                '⚡ Electrical Services',
                '📡 Telecom Services',
                '🛰 Satellite Installation',
                '🔧 Maintenance & Repair',
                '📋 Engineering Consultancy',
              ].map(service => (
                <li key={service} style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: '600', color: '#f8fafc', marginBottom: '1.25rem', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#f59e0b', marginTop: '2px' }}>📍</span>
                <span style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  77/12A/2B, Newada Ashok Nagar, Prayagraj, UP 211001
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ color: '#f59e0b' }}>📞</span>
                <a href="tel:+917042099984" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none' }}>
                  +91 70420 99984
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ color: '#f59e0b' }}>📞</span>
                <a href="tel:+910532452407" style={{ color: '#94a3b8', fontSize: '0.875rem', textDecoration: 'none' }}>
                  +91 0532 452 4075
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ color: '#f59e0b' }}>✉</span>
                <a href="mailto:js.engineeringconsultant77@gmail.com" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none', wordBreak: 'break-all' }}>
                  js.engineeringconsultant77@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '1.25rem 0',
          borderTop: '1px solid rgba(245, 158, 11, 0.08)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
          marginBottom: '1.5rem',
        }}>
          {[
            { label: 'MSME Registered', value: 'UDYAM-UP-03-0110637' },
            { label: 'GST No.', value: '09AUUPS5965Q1Z1' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.875rem',
              background: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.12)',
              borderRadius: '4px',
            }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '500' }}>{item.label}:</span>
              <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '600', letterSpacing: '0.05em' }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>
            © {year} J. S. Engineers &amp; Consultant. All rights reserved.
          </p>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>
            Prayagraj, Uttar Pradesh, India
          </p>
        </div>
      </div>
    </footer>
  );
}
