'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CAT_LABELS = {
  electrical: '⚡ Electrical', telecom: '📡 Telecom',
  satellite: '🛰 Satellite',  maintenance: '🔧 Maintenance', other: '📋 Other',
};
const CAT_COLORS = {
  electrical:  { bg: 'rgba(245,158,11,.12)', color: '#fbbf24', border: 'rgba(245,158,11,.25)' },
  telecom:     { bg: 'rgba(59,130,246,.12)',  color: '#93c5fd', border: 'rgba(59,130,246,.25)' },
  satellite:   { bg: 'rgba(139,92,246,.12)',  color: '#c4b5fd', border: 'rgba(139,92,246,.25)' },
  maintenance: { bg: 'rgba(34,197,94,.1)',    color: '#86efac', border: 'rgba(34,197,94,.2)'   },
  other:       { bg: 'rgba(148,163,184,.08)', color: '#94a3b8', border: 'rgba(148,163,184,.2)' },
};
const CAT_EMOJI = { electrical:'⚡', telecom:'📡', satellite:'🛰', maintenance:'🔧', other:'📋' };

function fmtDate(d) {
  if (!d) return '';
  const [y, m] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${y}`;
}

export default function GalleryPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');
  const [lb, setLb]             = useState(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => { if (d.success) setProjects(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setLb(null); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lb ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lb]);

  const shown = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const FILTERS = [
    { k:'all', l:'All Projects' }, { k:'electrical', l:'⚡ Electrical' },
    { k:'telecom', l:'📡 Telecom' }, { k:'satellite', l:'🛰 Satellite' },
    { k:'maintenance', l:'🔧 Maintenance' },
  ];

  return (
    <>
      <div style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <section style={{ padding:'4.5rem 1.5rem 3rem', background:'linear-gradient(180deg,#0a1428 0%,#050a18 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(245,158,11,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,.03) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
          <div style={{ maxWidth:'1280px', margin:'0 auto', position:'relative' }}>
            <div className="section-label" style={{ marginBottom:'.75rem' }}>Our Work</div>
            <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:'800', color:'#f8fafc', lineHeight:'1.15', marginBottom:'1.1rem' }}>
              Project <span className="text-gradient">Gallery</span>
            </h1>
            <div className="divider" />
            <p style={{ color:'#64748b', fontSize:'1rem', lineHeight:'1.75', maxWidth:'560px', marginTop:'1.1rem' }}>
              Real projects. Real results. Browse our completed work across Prayagraj and surrounding areas.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'2rem 1.5rem 1rem', display:'flex', gap:'.625rem', flexWrap:'wrap' }}>
          {FILTERS.map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding:'.45rem 1.1rem', borderRadius:'999px', fontSize:'.82rem', fontWeight:'600',
              cursor:'pointer', transition:'all .25s',
              background: filter===f.k ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'rgba(15,31,64,.5)',
              border: filter===f.k ? '1.5px solid transparent' : '1.5px solid rgba(245,158,11,.15)',
              color: filter===f.k ? '#050a18' : '#94a3b8',
            }}>
              {f.l}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 1.5rem 5rem' }}>
          {loading ? (
            <div style={{ textAlign:'center', padding:'5rem', color:'#64748b' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>⏳</div>Loading projects...
            </div>
          ) : shown.length === 0 ? (
            <div style={{ textAlign:'center', padding:'5rem 1rem', color:'#64748b' }}>
              <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>{filter==='all' ? '📂' : CAT_EMOJI[filter]||'📂'}</div>
              <p style={{ marginBottom:'1.5rem' }}>
                {filter==='all' ? 'Abhi koi project add nahi hua hai.' : 'Is category mein koi project nahi hai.'}
              </p>
              <Link href="/contact" className="btn-primary"><span>Apna Project Shuru Karein →</span></Link>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:'1.25rem' }}>
              {shown.map(p => {
                const cc = CAT_COLORS[p.category] || CAT_COLORS.other;
                return (
                  <div key={p.id} onClick={() => setLb(p)} className="card-hover"
                    style={{ background:'rgba(15,31,64,.55)', border:'1px solid rgba(245,158,11,.08)', borderRadius:'16px', overflow:'hidden', cursor:'pointer' }}>
                    <div style={{ width:'100%', aspectRatio:'4/3', overflow:'hidden', background:'rgba(10,20,40,.8)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {p.img
                        ? <img src={p.img} alt={p.title} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .5s' }}
                            onMouseEnter={e=>e.target.style.transform='scale(1.05)'}
                            onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                        : <div style={{ fontSize:'3rem', color:'rgba(245,158,11,.25)' }}>{CAT_EMOJI[p.category]||'📋'}</div>
                      }
                    </div>
                    <div style={{ padding:'1.25rem' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:'.35rem', padding:'.22rem .7rem', borderRadius:'999px', background:cc.bg, border:`1px solid ${cc.border}`, color:cc.color, fontSize:'.7rem', fontWeight:'700', marginBottom:'.65rem' }}>
                        {CAT_LABELS[p.category]||p.category}
                      </span>
                      <div style={{ fontFamily:'var(--font-heading)', fontSize:'1.05rem', fontWeight:'700', color:'#f8fafc', marginBottom:'.4rem', lineHeight:'1.3' }}>{p.title}</div>
                      {p.location && <div style={{ color:'#64748b', fontSize:'.78rem', marginBottom:'.4rem' }}>📍 {p.location}</div>}
                      {p.description && <div style={{ color:'#94a3b8', fontSize:'.82rem', lineHeight:'1.6', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.description}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lb && (() => {
        const cc = CAT_COLORS[lb.category] || CAT_COLORS.other;
        return (
          <div onClick={e => { if (e.target===e.currentTarget) setLb(null); }}
            style={{ position:'fixed', inset:0, zIndex:500, background:'rgba(5,10,24,.95)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
            <div style={{ maxWidth:'860px', width:'100%', background:'rgba(15,31,64,.9)', border:'1px solid rgba(245,158,11,.12)', borderRadius:'20px', overflow:'hidden', position:'relative' }}>
              <button onClick={() => setLb(null)} style={{ position:'absolute', top:'1rem', right:'1rem', zIndex:1, width:'36px', height:'36px', borderRadius:'50%', background:'rgba(5,10,24,.8)', border:'1px solid rgba(245,158,11,.2)', color:'#94a3b8', fontSize:'1.1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
              {lb.img
                ? <img src={lb.img} alt={lb.title} style={{ width:'100%', maxHeight:'480px', objectFit:'contain', background:'rgba(5,10,24,.6)' }} />
                : <div style={{ height:'280px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'5rem', background:'rgba(5,10,24,.5)' }}>{CAT_EMOJI[lb.category]||'📋'}</div>
              }
              <div style={{ padding:'1.75rem' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:'.35rem', padding:'.28rem .875rem', borderRadius:'999px', background:cc.bg, border:`1px solid ${cc.border}`, color:cc.color, fontSize:'.75rem', fontWeight:'700', marginBottom:'.75rem' }}>{CAT_LABELS[lb.category]||lb.category}</span>
                <div style={{ fontFamily:'var(--font-heading)', fontSize:'1.5rem', fontWeight:'700', color:'#f8fafc', marginBottom:'.5rem' }}>{lb.title}</div>
                {(lb.location||lb.date) && <div style={{ color:'#64748b', fontSize:'.85rem', marginBottom:'.875rem' }}>{lb.location&&`📍 ${lb.location}`}{lb.location&&lb.date&&' · '}{lb.date&&`📅 ${fmtDate(lb.date)}`}</div>}
                {lb.description && <p style={{ color:'#94a3b8', fontSize:'.9rem', lineHeight:'1.7' }}>{lb.description}</p>}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
