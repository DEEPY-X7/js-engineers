export default function Loading() {
  return (
    <div style={{
      paddingTop: '72px', minHeight: '100vh', background: '#050a18',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%',
          border: '3px solid rgba(245,158,11,.15)',
          borderTop: '3px solid #f59e0b',
          margin: '0 auto 1rem',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: '#475569', fontSize: '.875rem' }}>Loading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
