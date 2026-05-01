import Link from 'next/link';

export const metadata = {
  title: 'Services | J. S. Engineers & Consultant',
  description: 'Professional Electrical, Telecom & Satellite engineering services in Prayagraj.',
};

const services = [
  {
    id: 'electrical', icon: '⚡', title: 'Electrical Services',
    tagline: 'Safe. Reliable. Code-Compliant.', color: '#f59e0b', colorRgb: '245,158,11',
    description: 'Complete electrical engineering services for residential, commercial, and industrial clients across Prayagraj. From fresh installations to fault detection and maintenance.',
    features: [
      { icon: '🔌', title: 'Panel Wiring & Installation', desc: 'Complete electrical panel design, installation, and commissioning for homes and factories.' },
      { icon: '🏠', title: 'Home & Building Wiring', desc: 'Full residential and commercial electrical wiring with safety compliance.' },
      { icon: '❄️', title: 'AC Installation & Maintenance', desc: 'Air conditioning unit installation, servicing, and preventive maintenance.' },
      { icon: '🔍', title: 'Fault Detection & Repair', desc: 'Quick diagnosis and repair of electrical faults to restore power safely.' },
      { icon: '🛡', title: 'Preventive Maintenance', desc: 'Scheduled maintenance to prevent breakdowns and extend equipment life.' },
      { icon: '🏭', title: 'Industrial Electrical Work', desc: 'Electrical systems for factories, warehouses, and industrial facilities.' },
    ],
  },
  {
    id: 'telecom', icon: '📡', title: 'Telecom Services',
    tagline: 'Connected. Fast. Professional.', color: '#3b82f6', colorRgb: '59,130,246',
    description: 'End-to-end telecom engineering services including network installation, equipment commissioning, and infrastructure maintenance for wired and wireless systems.',
    features: [
      { icon: '📶', title: 'Telecom Equipment Installation', desc: 'Installation and commissioning of all types of telecom equipment and systems.' },
      { icon: '🔗', title: 'Wired Network Maintenance', desc: 'Maintenance and troubleshooting for structured cabling and wired networks.' },
      { icon: '📻', title: 'Wireless Network Support', desc: 'Setup and support for wireless communication infrastructure.' },
      { icon: '🏗', title: 'Infrastructure Support', desc: 'Ongoing maintenance and operational support for telecom towers and sites.' },
      { icon: '🛠', title: 'Site Operations', desc: 'Regular site visits and preventive maintenance for telecom installations.' },
      { icon: '📊', title: 'Network Optimization', desc: 'Signal testing, optimization, and performance enhancement services.' },
    ],
  },
  {
    id: 'satellite', icon: '🛰', title: 'Satellite Services',
    tagline: 'Clear Signal. Perfect Reception.', color: '#8b5cf6', colorRgb: '139,92,246',
    description: 'Expert satellite dish installation and signal configuration for broadcasting and communication. We ensure optimal signal quality for all satellite needs.',
    features: [
      { icon: '📡', title: 'Satellite Dish Installation', desc: 'Professional mounting and installation of satellite dishes at optimal angles.' },
      { icon: '📶', title: 'Signal Configuration', desc: 'Expert signal tuning and optimization for maximum reception quality.' },
      { icon: '🌐', title: 'Satellite Network Setup', desc: 'Complete satellite communication network design and implementation.' },
      { icon: '🔧', title: 'Maintenance & Troubleshooting', desc: 'Regular maintenance and quick fault resolution for satellite systems.' },
      { icon: '⬆️', title: 'System Upgrade Support', desc: 'Upgrading existing satellite installations to newer, better technology.' },
      { icon: '📺', title: 'DTH & VSAT Services', desc: 'Installation and support for DTH systems and VSAT communication setups.' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', background: 'linear-gradient(180deg,#0a1428 0%,#050a18 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,158,11,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div className="section-label" style={{ marginBottom: '.75rem' }}>Services</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: '800', color: '#f8fafc', lineHeight: '1.15', marginBottom: '1.25rem' }}>
            What We <span className="text-gradient">Specialize In</span>
          </h1>
          <div className="divider" />
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '600px', marginTop: '1.25rem' }}>
            Three core domains. One trusted team. Delivering engineering excellence across Prayagraj.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '5rem 1.5rem', background: '#050a18' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {services.map((service, idx) => (
            <div key={service.id} id={service.id}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem', alignItems: 'start', marginBottom: '2.5rem' }}>
                {/* Info side */}
                <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: `rgba(${service.colorRgb},.12)`, border: `1px solid rgba(${service.colorRgb},.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                    {service.icon}
                  </div>
                  <div className="section-label" style={{ marginBottom: '.5rem', color: service.color }}>{service.tagline}</div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: '700', color: '#f8fafc', marginBottom: '1.25rem', lineHeight: '1.3' }}>
                    {service.title}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>{service.description}</p>
                  <Link href="/contact" className="btn-primary">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      Request This Service
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                </div>
                {/* Features grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '1rem', order: idx % 2 === 0 ? 1 : 0 }}>
                  {service.features.map(f => (
                    <div key={f.title} style={{ padding: '1.25rem', background: 'rgba(15,31,64,.5)', border: '1px solid rgba(245,158,11,.07)', borderRadius: '12px' }}>
                      <div style={{ fontSize: '1.25rem', marginBottom: '.5rem' }}>{f.icon}</div>
                      <div style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '.875rem', marginBottom: '.4rem' }}>{f.title}</div>
                      <div style={{ color: '#475569', fontSize: '.8rem', lineHeight: '1.6' }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              {idx < services.length - 1 && (
                <div style={{ borderBottom: '1px solid rgba(245,158,11,.07)', marginTop: '2rem' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'linear-gradient(180deg,#050a18 0%,#0a1428 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', fontWeight: '700', color: '#f8fafc', marginBottom: '1rem' }}>
            Not sure which service you need?
          </h3>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
            Call us or drop a message — our team will guide you to the right solution.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary"><span>Contact Us</span></Link>
            <a href="tel:+917042099984" className="btn-outline"><span>📞 Call Now</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
