import { useState, useRef, useEffect } from 'react';
import { C } from '../config/constants';

/* ──────────────────────────────────────────────────────
   EditableText  — clic per editar text inline
   ────────────────────────────────────────────────────── */
export function EditableText({ value, onSave, tag: Tag = 'p', style, isAdmin, multiline = false }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(value);
  const ref = useRef(null);

  useEffect(() => { setDraft(value); }, [value]);
  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  if (!isAdmin) return <Tag style={style}>{value}</Tag>;

  if (editing) {
    const inputStyle = {
      width: '100%', padding: '4px 6px',
      border: `2px solid ${C.accent}`,
      borderRadius: '6px', fontSize: 'inherit',
      fontFamily: 'inherit', lineHeight: 'inherit',
      color: 'inherit', background: '#f0f8ff',
      outline: 'none', resize: multiline ? 'vertical' : 'none',
      ...style,
    };
    const save = () => { setEditing(false); if (draft !== value) onSave(draft); };
    const cancel = () => { setEditing(false); setDraft(value); };
    const onKey = (e) => {
      if (e.key === 'Escape') cancel();
      if (e.key === 'Enter' && !multiline) { e.preventDefault(); save(); }
    };

    return (
      <div style={{ position: 'relative' }}>
        {multiline
          ? <textarea ref={ref} value={draft} onChange={e => setDraft(e.target.value)}
              onKeyDown={onKey} rows={4} style={inputStyle} />
          : <input ref={ref} value={draft} onChange={e => setDraft(e.target.value)}
              onKeyDown={onKey} style={inputStyle} />
        }
        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
          <SmallBtn color={C.blau} onClick={save}>✓ Desar</SmallBtn>
          <SmallBtn color="#888" onClick={cancel}>✕ Cancel</SmallBtn>
        </div>
      </div>
    );
  }

  return (
    <Tag
      onClick={() => setEditing(true)}
      title="Clic per editar"
      style={{
        ...style,
        cursor: 'text',
        outline: `2px dashed transparent`,
        borderRadius: '4px',
        transition: 'outline 0.15s, background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.outline = `2px dashed ${C.accent}`; e.currentTarget.style.background = 'rgba(0,123,255,0.04)'; }}
      onMouseLeave={e => { e.currentTarget.style.outline = '2px dashed transparent'; e.currentTarget.style.background = 'transparent'; }}
    >
      {value}
    </Tag>
  );
}

/* ──────────────────────────────────────────────────────
   EditableList  — llista editable d'ítems
   ────────────────────────────────────────────────────── */
export function EditableList({ items, onSave, isAdmin, itemStyle }) {
  const [editIdx, setEditIdx] = useState(null);
  const [draft, setDraft]     = useState('');

  const startEdit = (i) => { setEditIdx(i); setDraft(items[i]); };
  const save = () => {
    const next = [...items];
    next[editIdx] = draft;
    onSave(next);
    setEditIdx(null);
  };
  const remove = (i) => onSave(items.filter((_, idx) => idx !== i));
  const add    = () => onSave([...items, 'Nou element']);

  return (
    <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: '1.05rem', marginBottom: '0.4rem', lineHeight: 1.7, ...itemStyle }}>
          {isAdmin && editIdx === i ? (
            <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <input
                autoFocus
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditIdx(null); }}
                style={{ flex: 1, padding: '2px 6px', border: `2px solid ${C.accent}`, borderRadius: '4px', fontFamily: 'inherit', fontSize: 'inherit' }}
              />
              <SmallBtn color={C.blau} onClick={save}>✓</SmallBtn>
              <SmallBtn color="#888" onClick={() => setEditIdx(null)}>✕</SmallBtn>
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
              <span
                style={{ flex: 1, cursor: isAdmin ? 'text' : 'default', borderRadius: '3px', padding: '1px 3px', transition: 'background 0.15s' }}
                onClick={() => isAdmin && startEdit(i)}
                onMouseEnter={e => isAdmin && (e.currentTarget.style.background = 'rgba(0,123,255,0.06)')}
                onMouseLeave={e => isAdmin && (e.currentTarget.style.background = 'transparent')}
                title={isAdmin ? 'Clic per editar' : ''}
              >{item}</span>
              {isAdmin && (
                <SmallBtn color="#dc3545" onClick={() => remove(i)} style={{ flexShrink: 0, marginTop: '2px' }}>✕</SmallBtn>
              )}
            </span>
          )}
        </li>
      ))}
      {isAdmin && (
        <li style={{ listStyle: 'none', marginTop: '6px' }}>
          <SmallBtn color={C.blau} onClick={add}>+ Afegir element</SmallBtn>
        </li>
      )}
    </ul>
  );
}

/* ──────────────────────────────────────────────────────
   EditableImage  — clic per canviar imatge (URL o fitxer)
   ────────────────────────────────────────────────────── */
export function EditableImage({ src, onSave, isAdmin, imgStyle, alt = '' }) {
  const [showPanel, setShowPanel] = useState(false);
  const [urlDraft, setUrlDraft]   = useState('');
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { onSave(ev.target.result); setShowPanel(false); };
    reader.readAsDataURL(file);
  };

  const handleUrl = () => {
    if (urlDraft.trim()) { onSave(urlDraft.trim()); setShowPanel(false); setUrlDraft(''); }
  };

  if (!isAdmin) return <img src={src} alt={alt} style={imgStyle} />;

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <img
        src={src} alt={alt}
        style={{ ...imgStyle, cursor: 'pointer' }}
        onClick={() => setShowPanel(p => !p)}
        title="Clic per canviar imatge"
      />
      {/* Overlay hint */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,51,102,0.45)', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
        borderRadius: imgStyle?.borderRadius || '8px', opacity: showPanel ? 1 : 0,
        transition: 'opacity 0.2s', pointerEvents: 'none',
      }}>
        📷 Canviar imatge
      </div>

      {showPanel && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 200,
          background: '#fff', border: `2px solid ${C.accent}`, borderRadius: '10px',
          padding: '1rem', width: '320px', boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          marginTop: '6px',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: C.blau }}>Canviar imatge</p>

          {/* Opció 1: Pujar fitxer */}
          <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '4px' }}>Opció 1: Pujar fitxer</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile}
            style={{ fontSize: '0.8rem', marginBottom: '0.75rem', width: '100%' }} />

          {/* Opció 2: URL */}
          <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '4px' }}>Opció 2: Enganxa una URL</p>
          <input
            type="text" placeholder="https://..." value={urlDraft}
            onChange={e => setUrlDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUrl()}
            style={{ width: '100%', padding: '6px 8px', border: '1px solid #ccc', borderRadius: '6px',
              fontSize: '0.8rem', marginBottom: '6px', fontFamily: 'inherit' }}
          />
          <div style={{ display: 'flex', gap: '6px' }}>
            <SmallBtn color={C.blau} onClick={handleUrl}>Desar URL</SmallBtn>
            <SmallBtn color="#888" onClick={() => setShowPanel(false)}>Cancel</SmallBtn>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   EditableSlider  — gestió de fotos del slider
   ────────────────────────────────────────────────────── */
export function EditableSliderManager({ fotos, onSave, isAdmin }) {
  const [showPanel, setShowPanel] = useState(false);
  const [urlDraft, setUrlDraft]   = useState('');
  const fileRef = useRef(null);

  if (!isAdmin) return null;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onSave([...fotos, ev.target.result]);
      if (fileRef.current) fileRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleUrl = () => {
    if (urlDraft.trim()) { onSave([...fotos, urlDraft.trim()]); setUrlDraft(''); }
  };

  const remove = (i) => onSave(fotos.filter((_, idx) => idx !== i));

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <SmallBtn color={C.blau} onClick={() => setShowPanel(p => !p)}>
        ⚙️ Gestionar fotos del slider ({fotos.length})
      </SmallBtn>

      {showPanel && (
        <div style={{
          marginTop: '0.5rem', background: '#f8f9ff', border: `1px solid ${C.accent}`,
          borderRadius: '10px', padding: '1rem',
        }}>
          {/* Llista de fotos actuals */}
          <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: C.blau }}>Fotos actuals:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto', marginBottom: '0.75rem' }}>
            {fotos.map((foto, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '6px', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
                <img src={foto.startsWith('data:') || foto.startsWith('http') ? foto : `assets/que-fem/${foto}`}
                  alt={`Foto ${i+1}`} style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                <span style={{ flex: 1, fontSize: '0.75rem', color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {foto.startsWith('data:') ? `[Imatge pujada ${i+1}]` : foto}
                </span>
                <SmallBtn color="#dc3545" onClick={() => remove(i)}>✕</SmallBtn>
              </div>
            ))}
          </div>

          {/* Afegir per fitxer */}
          <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '4px' }}>Afegir per fitxer:</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile}
            style={{ fontSize: '0.8rem', marginBottom: '0.75rem', width: '100%' }} />

          {/* Afegir per URL */}
          <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '4px' }}>Afegir per URL:</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input type="text" placeholder="https://..." value={urlDraft}
              onChange={e => setUrlDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUrl()}
              style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'inherit' }} />
            <SmallBtn color={C.blau} onClick={handleUrl}>+ Afegir</SmallBtn>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Botó petit reutilitzable ───────────────────────── */
function SmallBtn({ onClick, color, children, style }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '3px 10px', border: 'none', borderRadius: '5px',
        background: hover ? darken(color) : color,
        color: '#fff', fontSize: '0.78rem', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'background 0.15s',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function darken(hex) {
  // Simple darkening: reduce brightness by 15%
  try {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.max(0, (n >> 16) - 30);
    const g = Math.max(0, ((n >> 8) & 0xff) - 30);
    const b = Math.max(0, (n & 0xff) - 30);
    return `rgb(${r},${g},${b})`;
  } catch { return hex; }
}
