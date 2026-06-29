import { useState } from 'react';
import { C } from '../config/constants';

export default function Acordio({
  etiqueta, seccions, isOpen, onToggle,
  onSeccioClick, isAdmin, onAfegirSeccio, onEditarSeccio,
}) {
  const [hoverTitle, setHoverTitle] = useState(false);

  const s = {
    wrap: {
      background: C.grisClar, borderRadius: '10px',
      marginBottom: '0.75rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      transition: 'box-shadow 0.3s',
    },
    title: {
      width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.75rem 1rem',
      background: hoverTitle ? C.blauMig : C.blau,
      color: C.groc, fontWeight: 'bold', fontSize: '1.05rem',
      border: 'none', cursor: 'pointer',
      transition: 'background 0.2s',
      fontFamily: 'inherit',
    },
    body: { background: C.blanc, padding: isOpen ? '0.75rem' : '0 0.75rem',
      display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    adminBtn: {
      display: 'block', margin: '0.5rem auto',
      width: '36px', height: '36px', borderRadius: '50%',
      background: C.blau, color: C.groc,
      border: 'none', fontSize: '1.4rem', fontWeight: 'bold',
      cursor: 'pointer', lineHeight: '36px', textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={s.wrap}>
      <button
        style={s.title}
        onClick={onToggle}
        onMouseEnter={() => setHoverTitle(true)}
        onMouseLeave={() => setHoverTitle(false)}
      >
        <span>{etiqueta}</span>
        <span className={`fletxa ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      <div className={`acordio-body ${isOpen ? 'open' : ''}`} style={s.body}>
        {Object.entries(seccions).map(([key, { nom }]) => (
          <SeccioBtn key={key} nom={nom}
            onClick={() => isAdmin ? onEditarSeccio(etiqueta, key) : onSeccioClick(key)} />
        ))}
      </div>

      {isAdmin && (
        <button className="boto-admin" style={s.adminBtn}
          onClick={() => onAfegirSeccio(etiqueta)} title="Afegir secció">
          +
        </button>
      )}
    </div>
  );
}

function SeccioBtn({ nom, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      className="ripple-btn"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '0.75rem 1rem', border: 'none', borderRadius: '8px',
        background: hover ? '#ffc700' : '#FFD700',
        color: '#003366', fontWeight: 600, fontSize: '0.95rem',
        cursor: 'pointer', textAlign: 'left', width: '100%',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {nom}
    </button>
  );
}
