'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(5, 10, 24, 0.97)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245, 158, 11, 0.1)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontSize: '1.1rem',
              color: '#050a18',
              flexShrink: 0,
            }}>
              JS
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                fontSize: '1rem',
                color: '#f8fafc',
                lineHeight: '1.2',
              }}>
                J. S. Engineers
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: '#f59e0b',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '600',
              }}>
                &amp; Consultant
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+917042099984"
              className="btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call Now
              </span>
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'none',
            }}
            aria-label="Toggle menu"
          >
            <div style={{
              width: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  height: '2px',
                  background: '#f59e0b',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 7px)' :
                              menuOpen && i === 1 ? 'scaleX(0)' :
                              menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -7px)' : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(5, 10, 24, 0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
        className="mobile-overlay"
      >
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          color: '#f59e0b',
          fontSize: '1.2rem',
        }}>
          JS Engineers
        </div>
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              fontWeight: '700',
              color: pathname === link.href ? '#f59e0b' : '#e2e8f0',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="tel:+917042099984"
          style={{
            marginTop: '1rem',
            padding: '0.875rem 2.5rem',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#050a18',
            fontWeight: '700',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '1rem',
          }}
        >
          📞 +91 70420 99984
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-overlay { display: none !important; }
        }
      `}</style>
    </>
  );
}
