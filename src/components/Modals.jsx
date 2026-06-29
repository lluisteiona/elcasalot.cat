import { useState, useEffect, useRef } from 'react';
import { C } from '../config/constants';

/* ── Estils compartits ────────────────────────────────── */
const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(3px)',
  },
  box: {
    background: C.blanc, borderRadius: '12px', padding: '1.5rem',
    width: '90%', maxWidth: '400px', textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  h3: { color: C.blau, fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.5rem' },
  input: {
    width: '100%', marginTop: '0.75rem', padding: '0.6rem 0.75rem',
    fontSize: '1rem', borderRadius: '8px', border: `2px solid #e0e0e0`,
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  btns: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' },
};

function Btn({ onClick, color = C.blau, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '0.6rem 1.25rem', border: 'none', borderRadius: '8px',
        background: hover ? (color === C.blau ? C.blauFosc : '#c82333') : color,
        color: C.blanc, fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ onClick, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '0.6rem 1.25rem', border: 'none', borderRadius: '8px',
        background: hover ? '#e0e0e0' : '#f0f0f0',
        color: '#444', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
        transition: 'all 0.2s', fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

function FocusInput({ inputRef, ...props }) {
  return (
    <input
      ref={inputRef}
      style={s.input}
      onFocus={e  => e.target.style.borderColor = C.blau}
      onBlur={e   => e.target.style.borderColor = '#e0e0e0'}
      {...props}
    />
  );
}

/* ── Base modal ───────────────────────────────────────── */
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fadeIn" style={s.overlay} onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="scaleIn" style={s.box}>{children}</div>
    </div>
  );
}

/* ── Modal contrasenya ────────────────────────────────── */
export function PasswordModal({ isOpen, onClose, onValidate }) {
  const [val, setVal] = useState('');
  const ref = useRef(null);
  useEffect(() => { if (isOpen) { setVal(''); setTimeout(() => ref.current?.focus(), 50); } }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 style={s.h3}>Accés a la galeria</h3>
      <FocusInput inputRef={ref} type="password" placeholder="Contrasenya"
        value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onValidate(val.trim())} />
      <div style={s.btns}>
        <Btn onClick={() => onValidate(val.trim())}>Entrar</Btn>
        <GhostBtn onClick={onClose}>Cancel·lar</GhostBtn>
      </div>
    </Modal>
  );
}

/* ── Modal admin ──────────────────────────────────────── */
export function AdminModal({ isOpen, onClose, onValidate }) {
  const [val, setVal] = useState('');
  const ref = useRef(null);
  useEffect(() => { if (isOpen) { setVal(''); setTimeout(() => ref.current?.focus(), 50); } }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 style={s.h3}>Accés administració</h3>
      <FocusInput inputRef={ref} type="password" placeholder="Contrasenya"
        value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onValidate(val.trim())} />
      <div style={s.btns}>
        <Btn onClick={() => onValidate(val.trim())}>Entrar</Btn>
        <GhostBtn onClick={onClose}>Cancel·lar</GhostBtn>
      </div>
    </Modal>
  );
}

/* ── Modal edició ─────────────────────────────────────── */
export function EditModal({ isOpen, onClose, config, onSave, onDelete }) {
  const [nom, setNom]   = useState('');
  const [link, setLink] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && config) {
      setNom(config.nom || ''); setLink(config.link || '');
      setTimeout(() => ref.current?.focus(), 50);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    if (!nom.trim() || !link.trim()) { alert("Has d'omplir tots els camps."); return; }
    onSave(nom.trim(), link.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 style={s.h3}>{config?.titol || 'Editar secció'}</h3>
      <FocusInput inputRef={ref} type="text" placeholder="Nom de la secció"
        value={nom} onChange={e => setNom(e.target.value)} />
      <FocusInput type="text" placeholder="Enllaç (URL)"
        value={link} onChange={e => setLink(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSave()} />
      <div style={s.btns}>
        <Btn onClick={handleSave}>Desar</Btn>
        {onDelete && (
          <Btn color="#dc3545"
            onClick={() => window.confirm('Segur que vols esborrar?') && onDelete()}>
            Esborrar
          </Btn>
        )}
        <GhostBtn onClick={onClose}>Cancel·lar</GhostBtn>
      </div>
    </Modal>
  );
}
