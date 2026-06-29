import { useState } from 'react';
import { C } from '../config/constants';

export default function AdminBar({ onLogout, saving }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      position: 'fixed', bottom: '20px', right: '20px', zIndex: 1100,
      background: C.blau, color: C.groc,
      borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      overflow: 'hidden', transition: 'all 0.3s',
      minWidth: expanded ? '220px' : '48px',
    }}>
      {/* Header de la barra */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setExpanded(p => !p)}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap',
          overflow: 'hidden', maxWidth: expanded ? '160px' : '0px', transition: 'max-width 0.3s' }}>
          ✏️ Mode administrador
        </span>
        <span style={{ fontSize: '1rem', transform: expanded ? 'rotate(0)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>▼</span>
      </div>

      {/* Contingut expandit */}
      {expanded && (
        <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Indicador de desat */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '0.78rem', opacity: 0.85 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%',
              background: saving ? '#ffc107' : '#28a745',
              boxShadow: saving ? '0 0 6px #ffc107' : '0 0 6px #28a745',
              display: 'inline-block', flexShrink: 0 }} />
            {saving ? 'Desant...' : 'Tots els canvis desats'}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,215,0,0.3)', paddingTop: '8px',
            fontSize: '0.78rem', color: 'rgba(255,215,0,0.8)', lineHeight: 1.5 }}>
            💡 Clica qualsevol text o imatge per editar-lo
          </div>

          <button onClick={onLogout} style={{
            marginTop: '4px', padding: '6px 12px', border: 'none', borderRadius: '6px',
            background: 'rgba(255,255,255,0.15)', color: C.groc,
            fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
            fontFamily: 'inherit', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
          >
            Sortir del mode admin
          </button>
        </div>
      )}
    </div>
  );
}
