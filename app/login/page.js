'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in? Go to admin
  useEffect(() => {
    fetch('/api/auth/check')
      .then(r => r.json())
      .then(d => { if (d.loggedIn) router.replace('/admin'); });
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.replace('/admin');
      } else {
        setError(data.error || 'Galat username ya password');
        setPassword('');
      }
    } catch {
      setError('Server se connect nahi ho paya. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'radial-gradient(ellipse at center, rgba(245,158,11,.06) 0%, transparent 60%), #050a18',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(15, 31, 64, 0.7)',
        border: '1px solid rgba(245, 158, 11, 0.12)',
        borderRadius: '20px',
        padding: '2.75rem 2.25rem',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 30px 80px rgba(0,0,0,.5)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #f59e0b, #d97706)',
        }} />

        {/* Icon */}
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.75rem', margin: '0 auto 1.5rem',
        }}>
          🔐
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.6rem', fontWeight: '700', color: '#f8fafc',
          textAlign: 'center', marginBottom: '.4rem',
        }}>
          Admin Login
        </h1>
        <p style={{ color: '#64748b', fontSize: '.875rem', textAlign: 'center', marginBottom: '2rem' }}>
          J. S. Engineers &amp; Consultant
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)',
            borderRadius: '8px', padding: '.75rem 1rem', color: '#fca5a5',
            fontSize: '.85rem', marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '.5rem',
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{
              display: 'block', color: '#64748b', fontSize: '.73rem',
              fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="jsadmin"
              required
              autoComplete="username"
              className="form-input"
            />
          </div>

          <div>
            <label style={{
              display: 'block', color: '#64748b', fontSize: '.73rem',
              fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '.5rem',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '.95rem',
              background: loading ? 'rgba(245,158,11,.5)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#050a18', fontWeight: '700', fontSize: '.95rem',
              border: 'none', borderRadius: '8px',
              cursor: loading ? 'wait' : 'pointer',
              transition: 'all .3s', marginTop: '.25rem',
            }}
          >
            {loading ? 'Logging in...' : 'Admin Panel Mein Jaayein →'}
          </button>
        </form>
      </div>
    </div>
  );
}
