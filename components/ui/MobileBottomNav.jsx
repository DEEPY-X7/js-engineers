'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/',         icon: '🏠', label: 'Home'     },
  { href: '/services', icon: '⚙️',  label: 'Services' },
  { href: '/gallery',  icon: '🖼',  label: 'Gallery'  },
  { href: '/contact',  icon: '📞',  label: 'Contact'  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on admin/login pages
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return null;

  return (
    <>
      <nav style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 80,
        background: 'rgba(10, 20, 40, 0.97)',
        borderTop: '1px solid rgba(245, 158, 11, 0.12)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }} className="mobile-bottom-nav">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.6rem 0.25rem 0.5rem',
              textDecoration: 'none',
              gap: '3px',
              position: 'relative',
              transition: 'opacity 0.2s',
            }}>
              {/* Active top line */}
              {active && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: '20%', right: '20%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
                  borderRadius: '0 0 2px 2px',
                }} />
              )}
              <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{item.icon}</span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: active ? '700' : '500',
                color: active ? '#f59e0b' : '#475569',
                letterSpacing: '0.03em',
                fontFamily: 'var(--font-body)',
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Quick call button — center highlight */}
        <a href="tel:+917042099984" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem 0.25rem',
          textDecoration: 'none',
          gap: '3px',
        }}>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.95rem',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)',
            marginTop: '-4px',
          }}>
            📲
          </div>
          <span style={{
            fontSize: '0.62rem', fontWeight: '700',
            color: '#f59e0b', fontFamily: 'var(--font-body)',
          }}>
            Call
          </span>
        </a>
      </nav>

      {/* Push page content up so bottom nav doesn't overlap */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav { display: flex !important; }
          main { padding-bottom: 64px; }
        }
        @media (min-width: 769px) {
          .mobile-bottom-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
