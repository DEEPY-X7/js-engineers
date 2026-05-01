'use client';

import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 10, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 500, suffix: '+', label: 'Projects Completed', icon: '✅' },
  { value: 300, suffix: '+', label: 'Happy Clients', icon: '😊' },
  { value: 3, suffix: '', label: 'Service Domains', icon: '⚙️' },
];

export default function StatsSection() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #050a18 0%, #0a1428 100%)',
      padding: '0 1.5rem',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        transform: 'translateY(-50px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(245, 158, 11, 0.12)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              background: 'rgba(10, 20, 40, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              position: 'relative',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 31, 64, 0.95)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(10, 20, 40, 0.95)'}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div className="stat-number">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{
                color: '#64748b',
                fontSize: '0.8rem',
                marginTop: '0.4rem',
                fontWeight: '500',
                letterSpacing: '0.05em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
