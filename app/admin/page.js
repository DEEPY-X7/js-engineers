'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/* ── Constants ───────────────────────────────── */
const CAT_LABELS = { electrical:'⚡ Electrical', telecom:'📡 Telecom', satellite:'🛰 Satellite', maintenance:'🔧 Maintenance', other:'📋 Other' };
const CAT_COLORS = {
  electrical:  { bg:'rgba(245,158,11,.12)',  color:'#fbbf24', border:'rgba(245,158,11,.25)' },
  telecom:     { bg:'rgba(59,130,246,.12)',   color:'#93c5fd', border:'rgba(59,130,246,.25)' },
  satellite:   { bg:'rgba(139,92,246,.12)',   color:'#c4b5fd', border:'rgba(139,92,246,.25)' },
  maintenance: { bg:'rgba(34,197,94,.1)',     color:'#86efac', border:'rgba(34,197,94,.2)'   },
  other:       { bg:'rgba(148,163,184,.08)',  color:'#94a3b8', border:'rgba(148,163,184,.2)' },
};
const CAT_EMOJI = { electrical:'⚡', telecom:'📡', satellite:'🛰', maintenance:'🔧', other:'📋' };
const SERVICE_LABEL = { electrical:'⚡ Electrical', telecom:'📡 Telecom', satellite:'🛰 Satellite', maintenance:'🔧 Maintenance', consulting:'📋 Consultancy', other:'Other', '': 'General' };

function fmtDate(d) {
  if (!d) return '';
  const [y,m] = d.split('-');
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(m)-1] + ' ' + y;
}
function fmtTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
}

export default function AdminPage() {
  const router = useRouter();
  const fileRef = useRef(null);
  const toastTimerRef = useRef(null);

  const [tab, setTab] = useState('gallery'); // 'gallery' | 'inquiries'
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, type, title }
  const [toast, setToast] = useState(null);
  const [expandedContact, setExpandedContact] = useState(null);

  const [form, setForm] = useState({ title:'', category:'', location:'', date:'', description:'', imgUrl:'' });
  const [imgBase64, setImgBase64] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [formError, setFormError] = useState('');

  /* ── Auth check + initial fetch ── */
  useEffect(() => {
    fetch('/api/auth/check').then(r=>r.json()).then(d => {
      if (!d.loggedIn) router.replace('/login');
      else { fetchProjects(); fetchContacts(); }
    }).catch(() => router.replace('/login'));
  }, [router]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const r = await fetch('/api/gallery');
      const d = await r.json();
      if (d.success) setProjects(d.data);
    } finally { setLoading(false); }
  }

  async function fetchContacts() {
    try {
      const r = await fetch('/api/contact');
      const d = await r.json();
      if (d.success) setContacts(d.data);
    } catch {}
  }

  async function logout() {
    await fetch('/api/auth/logout', { method:'POST' });
    router.replace('/');
  }

  /* ── File upload ── */
  function handleFile(file) {
    if (!file) return;
    if (file.size > 5*1024*1024) { showToast('File 5MB se bada hai.','error'); return; }
    const reader = new FileReader();
    reader.onload = ev => { setImgBase64(ev.target.result); setImgPreview(ev.target.result); setForm(f=>({...f,imgUrl:''})); };
    reader.readAsDataURL(file);
  }

  function clearFile() {
    setImgBase64(''); setImgPreview('');
    if (fileRef.current) fileRef.current.value = '';
  }

  /* ── Add project ── */
  async function addProject() {
    setFormError('');
    if (!form.title.trim()) { setFormError('Title dena zaroori hai.'); return; }
    if (!form.category)     { setFormError('Category chunein.'); return; }
    setSubmitting(true);
    try {
      const img = imgBase64 || form.imgUrl.trim();
      const res = await fetch('/api/gallery', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...form, img}) });
      const data = await res.json();
      if (data.success) { setProjects(p=>[data.data,...p]); clearForm(); showToast('✅ Project add ho gaya!'); }
      else setFormError(data.error || 'Kuch galat hua.');
    } catch { setFormError('Server error.'); }
    finally { setSubmitting(false); }
  }

  function clearForm() {
    setForm({ title:'', category:'', location:'', date:'', description:'', imgUrl:'' });
    clearFile(); setFormError('');
  }

  /* ── Delete ── */
  async function doDelete() {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;
    try {
      const url = type === 'gallery' ? `/api/gallery/${id}` : `/api/contact/${id}`;
      const res = await fetch(url, { method:'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (type === 'gallery') setProjects(p=>p.filter(x=>x.id!==id));
        else { setContacts(c=>c.filter(x=>x.id!==id)); if(expandedContact===id) setExpandedContact(null); }
        showToast('🗑 Delete ho gaya.');
      } else showToast(data.error || 'Delete nahi hua.','error');
    } catch { showToast('Server error.','error'); }
    finally { setDeleteTarget(null); }
  }

  /* ── Mark read/unread ── */
  async function toggleRead(id, current) {
    const newStatus = current === 'read' ? 'unread' : 'read';
    try {
      const res = await fetch(`/api/contact/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status:newStatus}) });
      const data = await res.json();
      if (data.success) setContacts(c=>c.map(x=>x.id===id ? {...x,status:newStatus} : x));
    } catch {}
  }

  /* ── Toast ── */
  function showToast(msg, type='success') {
    setToast({ msg, type });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(()=>setToast(null), 3200);
  }

  const filteredProjects = galleryFilter==='all' ? projects : projects.filter(p=>p.category===galleryFilter);
  const unreadCount = contacts.filter(c=>c.status==='unread').length;

  /* ── Shared styles ── */
  const inp = { width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(245,158,11,.14)', borderRadius:'8px', padding:'.85rem 1rem', color:'#f8fafc', fontSize:'.9rem', outline:'none', fontFamily:'var(--font-body)' };

  return (
    <div style={{ paddingTop:'72px', minHeight:'100vh', background:'#050a18' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'2.5rem 1.5rem 5rem' }}>

        {/* ── Header ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'1px solid rgba(245,158,11,.1)' }}>
          <div>
            <div className="section-label" style={{marginBottom:'.3rem'}}>Admin Panel</div>
            <h1 style={{ fontFamily:'var(--font-heading)', fontSize:'1.75rem', fontWeight:'700', color:'#f8fafc' }}>Dashboard</h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
            {/* Stats pills */}
            <div style={{ display:'flex', gap:'.625rem', flexWrap:'wrap' }}>
              {[
                { label:'Photos', val:projects.length },
                { label:'⚡', val:projects.filter(p=>p.category==='electrical').length },
                { label:'📡', val:projects.filter(p=>p.category==='telecom').length },
                { label:'🛰', val:projects.filter(p=>p.category==='satellite').length },
                { label:'Inquiries', val:contacts.length },
              ].map(s=>(
                <div key={s.label} style={{ padding:'.4rem .875rem', background:'rgba(245,158,11,.06)', border:'1px solid rgba(245,158,11,.12)', borderRadius:'8px', fontSize:'.8rem', color:'#94a3b8' }}>
                  {s.label}: <span style={{color:'#f59e0b',fontWeight:'700'}}>{s.val}</span>
                </div>
              ))}
            </div>
            <button onClick={logout} style={{ padding:'.5rem 1rem', background:'transparent', border:'1px solid rgba(245,158,11,.15)', borderRadius:'6px', color:'#64748b', fontSize:'.8rem', cursor:'pointer' }}
              onMouseEnter={e=>{e.target.style.color='#f59e0b';e.target.style.borderColor='rgba(245,158,11,.35)';}}
              onMouseLeave={e=>{e.target.style.color='#64748b';e.target.style.borderColor='rgba(245,158,11,.15)';}}
            >Logout</button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display:'flex', gap:'.5rem', marginBottom:'2rem', borderBottom:'1px solid rgba(245,158,11,.08)', paddingBottom:'0' }}>
          {[
            { key:'gallery', label:'🖼 Gallery Manager' },
            { key:'inquiries', label:`📩 Inquiries${unreadCount>0?' ('+unreadCount+' new)':''}` },
          ].map(t=>(
            <button key={t.key} onClick={()=>setTab(t.key)} style={{
              padding:'.75rem 1.5rem', background:'transparent', border:'none',
              borderBottom: tab===t.key ? '2px solid #f59e0b' : '2px solid transparent',
              color: tab===t.key ? '#f59e0b' : '#64748b',
              fontWeight:'600', fontSize:'.9rem', cursor:'pointer', marginBottom:'-1px',
              fontFamily:'var(--font-body)', transition:'color .2s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════ GALLERY TAB ═══════════ */}
        {tab === 'gallery' && (
          <>
            {/* Add form */}
            <div style={{ background:'rgba(15,31,64,.55)', border:'1px solid rgba(245,158,11,.1)', borderRadius:'18px', padding:'2rem', marginBottom:'2.5rem', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,#f59e0b,transparent)' }} />
              <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'1.15rem', fontWeight:'700', color:'#f8fafc', marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'.6rem' }}>
                <span style={{ width:'30px', height:'30px', background:'rgba(245,158,11,.12)', border:'1px solid rgba(245,158,11,.2)', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.9rem' }}>➕</span>
                Naya Project Add Karein
              </h2>

              {/* Upload area */}
              <div style={{ marginBottom:'1.25rem' }}>
                <label style={{ display:'block', color:'#64748b', fontSize:'.72rem', fontWeight:'600', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.5rem' }}>Project Photo</label>
                {!imgPreview ? (
                  <div
                    onClick={()=>fileRef.current?.click()}
                    onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor='rgba(245,158,11,.5)';}}
                    onDragLeave={e=>{e.currentTarget.style.borderColor='rgba(245,158,11,.18)';}}
                    onDrop={e=>{e.preventDefault();e.currentTarget.style.borderColor='rgba(245,158,11,.18)';const f=e.dataTransfer.files[0];if(f?.type.startsWith('image/'))handleFile(f);}}
                    style={{ border:'2px dashed rgba(245,158,11,.18)', borderRadius:'12px', padding:'2rem', textAlign:'center', cursor:'pointer', background:'rgba(245,158,11,.02)', transition:'all .3s' }}
                  >
                    <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>handleFile(e.target.files?.[0])} />
                    <div style={{fontSize:'2rem',marginBottom:'.5rem'}}>📷</div>
                    <div style={{color:'#64748b',fontSize:'.85rem'}}>Click karein ya <strong style={{color:'#f59e0b'}}>drag karein</strong><br/><span style={{fontSize:'.72rem',opacity:.7}}>JPG, PNG, WEBP — max 5MB</span></div>
                  </div>
                ) : (
                  <div style={{position:'relative',display:'inline-block',width:'100%'}}>
                    <img src={imgPreview} alt="preview" style={{ width:'100%', maxHeight:'200px', objectFit:'cover', borderRadius:'10px', border:'1px solid rgba(245,158,11,.2)' }} />
                    <button onClick={clearFile} style={{ position:'absolute', top:'.5rem', right:'.5rem', width:'28px', height:'28px', borderRadius:'50%', background:'rgba(5,10,24,.85)', border:'1px solid rgba(245,158,11,.25)', color:'#94a3b8', cursor:'pointer', fontSize:'.8rem', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
                  </div>
                )}
                <div style={{ display:'flex', alignItems:'center', gap:'.75rem', color:'#334155', fontSize:'.75rem', margin:'.5rem 0' }}>
                  <div style={{flex:1,height:'1px',background:'rgba(245,158,11,.08)'}}/> ya URL se <div style={{flex:1,height:'1px',background:'rgba(245,158,11,.08)'}}/>
                </div>
                <input type="url" value={form.imgUrl} onChange={e=>{setForm(f=>({...f,imgUrl:e.target.value}));if(e.target.value)clearFile();}} disabled={!!imgBase64} placeholder="https://example.com/photo.jpg" style={{...inp,opacity:imgBase64?.5:1}} />
              </div>

              {/* Title + Category */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <label style={{ display:'block', color:'#64748b', fontSize:'.72rem', fontWeight:'600', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.5rem' }}>Title *</label>
                  <input type="text" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Panel Installation, Office Wiring..." style={inp} />
                </div>
                <div>
                  <label style={{ display:'block', color:'#64748b', fontSize:'.72rem', fontWeight:'600', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.5rem' }}>Category *</label>
                  <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{...inp,background:'rgba(10,20,40,.9)',cursor:'pointer'}}>
                    <option value="">-- Category chunein --</option>
                    <option value="electrical">⚡ Electrical</option>
                    <option value="telecom">📡 Telecom</option>
                    <option value="satellite">🛰 Satellite</option>
                    <option value="maintenance">🔧 Maintenance</option>
                    <option value="other">📋 Other</option>
                  </select>
                </div>
              </div>

              {/* Location + Date */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem', marginBottom:'1rem' }}>
                <div>
                  <label style={{ display:'block', color:'#64748b', fontSize:'.72rem', fontWeight:'600', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.5rem' }}>Location</label>
                  <input type="text" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} placeholder="Civil Lines, Prayagraj" style={inp} />
                </div>
                <div>
                  <label style={{ display:'block', color:'#64748b', fontSize:'.72rem', fontWeight:'600', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.5rem' }}>Date</label>
                  <input type="month" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} style={{...inp,colorScheme:'dark'}} />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom:'1rem' }}>
                <label style={{ display:'block', color:'#64748b', fontSize:'.72rem', fontWeight:'600', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:'.5rem' }}>Description</label>
                <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="Kya kaam kiya, client details, kya install hua..." style={{...inp,resize:'vertical',minHeight:'90px'}} />
              </div>

              {formError && <div style={{ color:'#fca5a5', fontSize:'.85rem', marginBottom:'.75rem' }}>⚠ {formError}</div>}

              <div style={{ display:'flex', gap:'.875rem', flexWrap:'wrap' }}>
                <button onClick={addProject} disabled={submitting} style={{ padding:'.875rem 1.75rem', background:submitting?'rgba(245,158,11,.4)':'linear-gradient(135deg,#f59e0b,#d97706)', color:'#050a18', fontWeight:'700', fontSize:'.9rem', border:'none', borderRadius:'8px', cursor:submitting?'wait':'pointer', display:'flex', alignItems:'center', gap:'.5rem', fontFamily:'var(--font-body)' }}>
                  {submitting ? 'Add ho raha hai...' : '✓ Project Add Karein'}
                </button>
                <button onClick={clearForm} style={{ padding:'.875rem 1.25rem', background:'transparent', color:'#64748b', border:'1px solid rgba(245,158,11,.12)', borderRadius:'8px', cursor:'pointer', fontFamily:'var(--font-body)' }}>Clear</button>
              </div>
            </div>

            {/* Gallery list */}
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem', flexWrap:'wrap', gap:'.75rem' }}>
                <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'1.15rem', fontWeight:'700', color:'#f8fafc' }}>Saved Projects ({filteredProjects.length})</h2>
                <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
                  {['all','electrical','telecom','satellite','maintenance'].map(cat=>(
                    <button key={cat} onClick={()=>setGalleryFilter(cat)} style={{ padding:'.35rem .9rem', borderRadius:'999px', fontSize:'.78rem', fontWeight:'600', cursor:'pointer', background:galleryFilter===cat?'rgba(245,158,11,.15)':'rgba(15,31,64,.5)', border:galleryFilter===cat?'1px solid rgba(245,158,11,.35)':'1px solid rgba(245,158,11,.1)', color:galleryFilter===cat?'#fbbf24':'#94a3b8', fontFamily:'var(--font-body)' }}>
                      {cat==='all'?'All':CAT_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div style={{textAlign:'center',padding:'4rem',color:'#64748b'}}>Loading...</div>
              ) : filteredProjects.length===0 ? (
                <div style={{textAlign:'center',padding:'4rem',color:'#64748b'}}>
                  <div style={{fontSize:'2.5rem',marginBottom:'.875rem'}}>📂</div>
                  <p>Koi project nahi. Upar se add karein.</p>
                </div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))', gap:'1rem' }}>
                  {filteredProjects.map(p=>{
                    const cc = CAT_COLORS[p.category]||CAT_COLORS.other;
                    return (
                      <div key={p.id} style={{ background:'rgba(15,31,64,.5)', border:'1px solid rgba(245,158,11,.08)', borderRadius:'12px', overflow:'hidden', transition:'border-color .2s' }}
                        onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(245,158,11,.2)'}
                        onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(245,158,11,.08)'}
                      >
                        <div style={{ aspectRatio:'16/9', background:'rgba(5,10,24,.6)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                          {p.img ? <img src={p.img} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <div style={{fontSize:'2.5rem',color:'rgba(245,158,11,.2)'}}>{CAT_EMOJI[p.category]||'📋'}</div>}
                        </div>
                        <div style={{padding:'1rem'}}>
                          <div style={{fontWeight:'600',color:'#f8fafc',fontSize:'.875rem',marginBottom:'.3rem',lineHeight:'1.35'}}>{p.title}</div>
                          <div style={{marginBottom:'.6rem',fontSize:'.72rem',color:'#64748b'}}>
                            <span style={{display:'inline-flex',alignItems:'center',gap:'.3rem',padding:'.18rem .55rem',borderRadius:'999px',background:cc.bg,border:`1px solid ${cc.border}`,color:cc.color,fontWeight:'700',marginRight:'.4rem'}}>{CAT_LABELS[p.category]||p.category}</span>
                            {p.location&&`📍 ${p.location}`}{p.date&&` · ${fmtDate(p.date)}`}
                          </div>
                          {p.description&&<div style={{color:'#94a3b8',fontSize:'.75rem',lineHeight:'1.55',marginBottom:'.75rem',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{p.description}</div>}
                          <button onClick={()=>setDeleteTarget({id:p.id,type:'gallery',title:p.title})} style={{display:'flex',alignItems:'center',gap:'.35rem',padding:'.4rem .875rem',background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.2)',borderRadius:'6px',color:'#fca5a5',fontSize:'.75rem',fontWeight:'600',cursor:'pointer',fontFamily:'var(--font-body)'}}>
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══════════ INQUIRIES TAB ═══════════ */}
        {tab === 'inquiries' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
              <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'1.15rem', fontWeight:'700', color:'#f8fafc' }}>
                Contact Inquiries ({contacts.length})
              </h2>
              {unreadCount > 0 && (
                <div style={{ padding:'.25rem .875rem', background:'rgba(245,158,11,.12)', border:'1px solid rgba(245,158,11,.25)', borderRadius:'999px', fontSize:'.75rem', fontWeight:'700', color:'#fbbf24' }}>
                  {unreadCount} New
                </div>
              )}
            </div>

            {contacts.length === 0 ? (
              <div style={{textAlign:'center',padding:'5rem',color:'#64748b'}}>
                <div style={{fontSize:'3rem',marginBottom:'1rem'}}>📭</div>
                <p>Abhi koi inquiry nahi aayi hai.</p>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'.875rem' }}>
                {contacts.map(c=>{
                  const isUnread = c.status === 'unread';
                  const isExpanded = expandedContact === c.id;
                  return (
                    <div key={c.id} style={{ background: isUnread ? 'rgba(15,31,64,.7)' : 'rgba(10,20,40,.5)', border: isUnread ? '1px solid rgba(245,158,11,.18)' : '1px solid rgba(245,158,11,.06)', borderRadius:'12px', overflow:'hidden', transition:'all .2s' }}>
                      {/* Row */}
                      <div onClick={()=>{ setExpandedContact(isExpanded?null:c.id); if(isUnread)toggleRead(c.id,'unread'); }}
                        style={{ padding:'1.1rem 1.25rem', display:'flex', alignItems:'center', gap:'1rem', cursor:'pointer', flexWrap:'wrap' }}>
                        {/* Unread dot */}
                        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:isUnread?'#f59e0b':'transparent', border:isUnread?'none':'1px solid #334155', flexShrink:0 }} />
                        {/* Avatar */}
                        <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,rgba(245,158,11,.25),rgba(245,158,11,.1))', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-heading)', fontWeight:'700', color:'#f59e0b', fontSize:'1rem', flexShrink:0 }}>
                          {c.name?.[0]?.toUpperCase()||'?'}
                        </div>
                        {/* Info */}
                        <div style={{flex:1,minWidth:'150px'}}>
                          <div style={{ display:'flex', alignItems:'center', gap:'.625rem', flexWrap:'wrap' }}>
                            <span style={{fontWeight:'600',color:'#f8fafc',fontSize:'.9rem'}}>{c.name}</span>
                            {c.service && (
                              <span style={{fontSize:'.7rem',padding:'.15rem .55rem',borderRadius:'999px',background:'rgba(245,158,11,.1)',border:'1px solid rgba(245,158,11,.2)',color:'#fbbf24',fontWeight:'600'}}>
                                {SERVICE_LABEL[c.service]||c.service}
                              </span>
                            )}
                            {isUnread && <span style={{fontSize:'.68rem',color:'#f59e0b',fontWeight:'700'}}>NEW</span>}
                          </div>
                          <div style={{color:'#64748b',fontSize:'.78rem',marginTop:'2px'}}>{c.phone}{c.email&&` · ${c.email}`}</div>
                        </div>
                        {/* Time */}
                        <div style={{color:'#475569',fontSize:'.75rem',flexShrink:0}}>{fmtTime(c.submittedAt)}</div>
                        {/* Expand arrow */}
                        <div style={{color:'#475569',fontSize:'.8rem',transition:'transform .2s',transform:isExpanded?'rotate(180deg)':'rotate(0deg)'}}>▼</div>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div style={{ padding:'0 1.25rem 1.25rem', borderTop:'1px solid rgba(245,158,11,.08)' }}>
                          <div style={{ padding:'1rem', background:'rgba(5,10,24,.4)', borderRadius:'8px', margin:'1rem 0' }}>
                            <div style={{color:'#64748b',fontSize:'.72rem',fontWeight:'600',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'.5rem'}}>Message</div>
                            <p style={{color:'#94a3b8',fontSize:'.9rem',lineHeight:'1.7'}}>{c.message}</p>
                          </div>
                          <div style={{ display:'flex', gap:'.75rem', flexWrap:'wrap' }}>
                            <a href={`tel:${c.phone.replace(/\D/g,'')}`} style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.55rem 1rem',background:'rgba(245,158,11,.1)',border:'1px solid rgba(245,158,11,.2)',borderRadius:'7px',color:'#fbbf24',fontSize:'.82rem',fontWeight:'600',textDecoration:'none'}}>
                              📞 Call Back
                            </a>
                            <a href={`https://wa.me/91${c.phone.replace(/\D/g,'').slice(-10)}`} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.55rem 1rem',background:'rgba(37,211,102,.08)',border:'1px solid rgba(37,211,102,.2)',borderRadius:'7px',color:'#86efac',fontSize:'.82rem',fontWeight:'600',textDecoration:'none'}}>
                              💬 WhatsApp
                            </a>
                            {c.email && (
                              <a href={`mailto:${c.email}`} style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.55rem 1rem',background:'rgba(59,130,246,.08)',border:'1px solid rgba(59,130,246,.2)',borderRadius:'7px',color:'#93c5fd',fontSize:'.82rem',fontWeight:'600',textDecoration:'none'}}>
                                ✉ Email
                              </a>
                            )}
                            <button onClick={()=>toggleRead(c.id,c.status)} style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.55rem 1rem',background:'transparent',border:'1px solid rgba(245,158,11,.12)',borderRadius:'7px',color:'#64748b',fontSize:'.82rem',fontWeight:'500',cursor:'pointer',fontFamily:'var(--font-body)'}}>
                              {isUnread ? '✓ Mark Read' : '○ Mark Unread'}
                            </button>
                            <button onClick={()=>setDeleteTarget({id:c.id,type:'contact',title:c.name+' ki inquiry'})} style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.55rem 1rem',background:'rgba(239,68,68,.06)',border:'1px solid rgba(239,68,68,.18)',borderRadius:'7px',color:'#fca5a5',fontSize:'.82rem',fontWeight:'500',cursor:'pointer',fontFamily:'var(--font-body)'}}>
                              🗑 Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <div onClick={e=>{if(e.target===e.currentTarget)setDeleteTarget(null);}} style={{ position:'fixed',inset:0,zIndex:600,background:'rgba(5,10,24,.88)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'1.5rem' }}>
          <div style={{ background:'rgba(15,31,64,.97)',border:'1px solid rgba(239,68,68,.2)',borderRadius:'18px',padding:'2rem',maxWidth:'380px',width:'100%',textAlign:'center' }}>
            <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>🗑</div>
            <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.2rem',color:'#f8fafc',marginBottom:'.5rem'}}>Delete karein?</h3>
            <p style={{color:'#64748b',fontSize:'.875rem',marginBottom:'1.5rem',lineHeight:'1.6'}}>{deleteTarget.title} — permanently delete ho jaega.</p>
            <div style={{display:'flex',gap:'.75rem',justifyContent:'center'}}>
              <button onClick={()=>setDeleteTarget(null)} style={{padding:'.75rem 1.5rem',background:'transparent',border:'1px solid rgba(245,158,11,.2)',borderRadius:'8px',color:'#94a3b8',fontSize:'.875rem',cursor:'pointer',fontFamily:'var(--font-body)'}}>Cancel</button>
              <button onClick={doDelete} style={{padding:'.75rem 1.5rem',background:'rgba(239,68,68,.15)',border:'1px solid rgba(239,68,68,.3)',borderRadius:'8px',color:'#fca5a5',fontSize:'.875rem',fontWeight:'600',cursor:'pointer',fontFamily:'var(--font-body)'}}>Haan, Delete Karein</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position:'fixed',top:'80px',right:'1.5rem',zIndex:999,background:toast.type==='error'?'rgba(239,68,68,.12)':'rgba(34,197,94,.12)',border:`1px solid ${toast.type==='error'?'rgba(239,68,68,.3)':'rgba(34,197,94,.3)'}`,borderRadius:'12px',padding:'1rem 1.5rem',color:toast.type==='error'?'#fca5a5':'#86efac',fontSize:'.9rem',fontWeight:'500',boxShadow:'0 8px 32px rgba(0,0,0,.4)' }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
