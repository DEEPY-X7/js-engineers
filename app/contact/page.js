'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        setErrorMsg(data.error || 'Kuch galat hua. Dobara try karein.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Server se connect nahi ho paya.');
      setStatus('error');
    }
  };

  // WhatsApp pre-filled messages per service
  const WA_MESSAGES = {
    electrical: 'Namaste! Mujhe Electrical service chahiye. Kya aap estimate de sakte hain?',
    telecom:    'Namaste! Mujhe Telecom service ki zaroorat hai. Details bata sakte hain?',
    satellite:  'Namaste! Satellite dish installation chahiye. Quote de sakte hain?',
    maintenance:'Namaste! Maintenance/repair ka kaam hai. Kab aa sakte hain?',
    default:    'Namaste! J.S. Engineers se baat karni thi. Kya aap available hain?',
  };

  const waMsg = WA_MESSAGES[form.service] || WA_MESSAGES.default;
  const waUrl = `https://wa.me/917042099984?text=${encodeURIComponent(waMsg)}`;

  const inp = {
    width: '100%', background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(245,158,11,.14)', borderRadius: '8px',
    padding: '.875rem 1rem', color: '#f8fafc', fontSize: '.9rem',
    outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color .2s, box-shadow .2s',
  };

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 3rem', background: 'linear-gradient(180deg,#0a1428 0%,#050a18 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,158,11,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <div className="section-label" style={{ marginBottom: '.75rem' }}>Contact</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: '800', color: '#f8fafc', lineHeight: '1.15', marginBottom: '1.25rem' }}>
            Let&apos;s Work <span className="text-gradient">Together</span>
          </h1>
          <div className="divider" />
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.75', maxWidth: '520px', marginTop: '1.1rem' }}>
            Free estimate, consultation, ya booking — hum fast respond karte hain.
          </p>
        </div>
      </section>

      {/* Quick contact bar */}
      <div style={{ background: 'rgba(245,158,11,.05)', borderTop: '1px solid rgba(245,158,11,.1)', borderBottom: '1px solid rgba(245,158,11,.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '.875rem 1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <a href="tel:+917042099984" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', color: '#fbbf24', fontWeight: '700', fontSize: '.9rem', textDecoration: 'none' }}>
            📞 +91 70420 99984
          </a>
          <span style={{ color: '#1e293b' }}>|</span>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', color: '#25D366', fontWeight: '700', fontSize: '.9rem', textDecoration: 'none' }}>
            💬 WhatsApp Karein
          </a>
          <span style={{ color: '#1e293b' }}>|</span>
          <span style={{ color: '#475569', fontSize: '.85rem' }}>⏰ Mon–Sat 9AM–6PM</span>
        </div>
      </div>

      {/* Main grid */}
      <section style={{ padding: '4rem 1.5rem 6rem', background: '#050a18' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Info + Map */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', color: '#f8fafc', marginBottom: '1.75rem' }}>Contact Information</h2>

            {/* Contact items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem', marginBottom: '1.75rem' }}>
              {[
                { icon: '📍', label: 'Address', value: '77/12A/2B, Newada Ashok Nagar, Prayagraj, UP 211001', href: 'https://maps.google.com/?q=Newada+Ashok+Nagar+Prayagraj' },
                { icon: '📞', label: 'Mobile',  value: '+91 70420 99984', href: 'tel:+917042099984' },
                { icon: '☎️', label: 'Landline', value: '0532 - 452 4075',   href: 'tel:+915324524075' },
                { icon: '✉️', label: 'Email',    value: 'js.engineeringconsultant77@gmail.com', href: 'mailto:js.engineeringconsultant77@gmail.com' },
              ].map(item => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem', padding: '1rem 1.1rem', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(245,158,11,.07)', borderRadius: '10px', textDecoration: 'none', transition: 'border-color .2s, background .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,.22)'; e.currentTarget.style.background = 'rgba(245,158,11,.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,.07)'; e.currentTarget.style.background = 'rgba(255,255,255,.03)'; }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '9px', background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ color: '#475569', fontSize: '.68rem', fontWeight: '700', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '3px' }}>{item.label}</div>
                    <div style={{ color: '#94a3b8', fontSize: '.875rem', lineHeight: '1.5', wordBreak: 'break-all' }}>{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp quick quote */}
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '.875rem', padding: '1.1rem 1.25rem', background: 'rgba(37,211,102,.07)', border: '1px solid rgba(37,211,102,.18)', borderRadius: '10px', textDecoration: 'none', transition: 'all .25s', marginBottom: '1.75rem' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,.13)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,.07)'}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(37,211,102,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>💬</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#25D366', fontWeight: '700', fontSize: '.9rem' }}>WhatsApp pe Quote Maangein</div>
                <div style={{ color: '#475569', fontSize: '.78rem', marginTop: '2px' }}>Pre-filled message — ek click mein baat shuru karein</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            {/* Google Maps embed */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(245,158,11,.1)', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(15,31,64,.5)', padding: '.875rem 1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span style={{ fontSize: '1rem' }}>📍</span>
                <span style={{ color: '#94a3b8', fontSize: '.82rem', fontWeight: '500' }}>Newada Ashok Nagar, Prayagraj</span>
                <a href="https://maps.google.com/?q=Prayagraj+Uttar+Pradesh" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', color: '#f59e0b', fontSize: '.75rem', fontWeight: '600', textDecoration: 'none' }}>
                  Open in Maps →
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57960.76850884963!2d81.79358471298828!3d25.435721938624856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb3c08a48a07%3A0x1ec81a8a3d7f1e9e!2sPrayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ display: 'block', border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="J. S. Engineers Location - Prayagraj"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', color: '#f8fafc', marginBottom: '1.75rem' }}>Send a Message</h2>

            {status === 'success' ? (
              <div style={{ padding: '3rem 2rem', background: 'rgba(34,197,94,.05)', border: '1px solid rgba(34,197,94,.18)', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: '#f8fafc', fontSize: '1.4rem', marginBottom: '.75rem' }}>Message Bhej Diya!</h3>
                <p style={{ color: '#64748b', fontSize: '.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  Shukriya! Hum 24 ghante mein aapse contact karenge.<br />
                  Urgent ho to seedha call ya WhatsApp karein.
                </p>
                <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => setStatus('idle')} className="btn-outline" style={{ cursor: 'pointer' }}>Dobara Bhejein</button>
                  <a href="tel:+917042099984" className="btn-primary"><span>📞 Call Now</span></a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#64748b', fontSize: '.72rem', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={onChange} required placeholder="Rajesh Kumar" style={inp}
                      onFocus={e=>{e.target.style.borderColor='rgba(245,158,11,.5)';e.target.style.boxShadow='0 0 0 3px rgba(245,158,11,.07)';}}
                      onBlur={e=>{e.target.style.borderColor='rgba(245,158,11,.14)';e.target.style.boxShadow='none';}} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#64748b', fontSize: '.72rem', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Phone *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={onChange} required placeholder="+91 9XXXXXXXXX" style={inp}
                      onFocus={e=>{e.target.style.borderColor='rgba(245,158,11,.5)';e.target.style.boxShadow='0 0 0 3px rgba(245,158,11,.07)';}}
                      onBlur={e=>{e.target.style.borderColor='rgba(245,158,11,.14)';e.target.style.boxShadow='none';}} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '.72rem', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Service Required</label>
                  <select name="service" value={form.service} onChange={onChange} style={{ ...inp, background: 'rgba(10,20,40,.95)', cursor: 'pointer' }}>
                    <option value="">-- Service chunein --</option>
                    <option value="electrical">⚡ Electrical Services</option>
                    <option value="telecom">📡 Telecom Services</option>
                    <option value="satellite">🛰 Satellite Services</option>
                    <option value="maintenance">🔧 Maintenance &amp; Repair</option>
                    <option value="consulting">📋 Engineering Consultancy</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '.72rem', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Email (Optional)</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" style={inp}
                    onFocus={e=>{e.target.style.borderColor='rgba(245,158,11,.5)';e.target.style.boxShadow='0 0 0 3px rgba(245,158,11,.07)';}}
                    onBlur={e=>{e.target.style.borderColor='rgba(245,158,11,.14)';e.target.style.boxShadow='none';}} />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '.72rem', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem' }}>Message *</label>
                  <textarea name="message" value={form.message} onChange={onChange} required rows={4}
                    placeholder="Apni zaroorat batayein — kahan kaam chahiye, kya install karwana hai..."
                    style={{ ...inp, resize: 'vertical', minHeight: '110px' }}
                    onFocus={e=>{e.target.style.borderColor='rgba(245,158,11,.5)';e.target.style.boxShadow='0 0 0 3px rgba(245,158,11,.07)';}}
                    onBlur={e=>{e.target.style.borderColor='rgba(245,158,11,.14)';e.target.style.boxShadow='none';}} />
                </div>

                {status === 'error' && (
                  <div style={{ background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.22)', borderRadius: '8px', padding: '.75rem 1rem', color: '#fca5a5', fontSize: '.85rem' }}>
                    ⚠ {errorMsg}
                  </div>
                )}

                <button type="submit" disabled={status === 'sending'}
                  style={{ width: '100%', padding: '.95rem', background: status === 'sending' ? 'rgba(245,158,11,.45)' : 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#050a18', fontWeight: '700', fontSize: '.95rem', border: 'none', borderRadius: '8px', cursor: status === 'sending' ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', fontFamily: 'var(--font-body)' }}>
                  {status === 'sending' ? 'Bhej raha hai...' : (<>Message Bhejein <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg></>)}
                </button>

                {/* WhatsApp alternative */}
                <div style={{ textAlign: 'center', paddingTop: '.25rem' }}>
                  <span style={{ color: '#334155', fontSize: '.8rem' }}>Ya seedha — </span>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '.8rem', fontWeight: '600', textDecoration: 'none' }}>
                    WhatsApp pe message karein →
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
