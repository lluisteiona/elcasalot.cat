import { useEffect, useRef, useState } from 'react';

/* ── Modal base ───────────────────────────────────────── */
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-sm p-6 text-center animate-scaleIn">
        {children}
      </div>
    </div>
  );
}

/* ── Botons estàndard del modal ───────────────────────── */
function ModalBtn({ onClick, variant = 'primary', children }) {
  const base = 'px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0';
  const variants = {
    primary: 'bg-[#003366] text-white hover:bg-[#001f3f]',
    danger:  'bg-red-600 text-white hover:bg-red-700',
    ghost:   'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}

/* ── Input estàndard ──────────────────────────────────── */
function ModalInput({ inputRef, ...props }) {
  return (
    <input
      ref={inputRef}
      className="w-full mt-3 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003366] transition-colors"
      {...props}
    />
  );
}

/* ── Modal contrasenya galeria ────────────────────────── */
export function PasswordModal({ isOpen, onClose, onValidate }) {
  const [val, setVal] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) { setVal(''); setTimeout(() => ref.current?.focus(), 50); }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-[#003366] text-xl font-bold mb-1">Accés a la galeria</h3>
      <ModalInput
        inputRef={ref}
        type="password"
        placeholder="Contrasenya"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onValidate(val.trim())}
        aria-label="Contrasenya d'accés"
      />
      <div className="flex gap-2 justify-center mt-4">
        <ModalBtn onClick={() => onValidate(val.trim())}>Entrar</ModalBtn>
        <ModalBtn onClick={onClose} variant="ghost">Cancel·lar</ModalBtn>
      </div>
    </Modal>
  );
}

/* ── Modal admin ──────────────────────────────────────── */
export function AdminModal({ isOpen, onClose, onValidate }) {
  const [val, setVal] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) { setVal(''); setTimeout(() => ref.current?.focus(), 50); }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-[#003366] text-xl font-bold mb-1">Accés administració</h3>
      <ModalInput
        inputRef={ref}
        type="password"
        placeholder="Contrasenya"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onValidate(val.trim())}
        aria-label="Contrasenya d'administració"
      />
      <div className="flex gap-2 justify-center mt-4">
        <ModalBtn onClick={() => onValidate(val.trim())}>Entrar</ModalBtn>
        <ModalBtn onClick={onClose} variant="ghost">Cancel·lar</ModalBtn>
      </div>
    </Modal>
  );
}

/* ── Modal edició secció ──────────────────────────────── */
export function EditModal({ isOpen, onClose, config, onSave, onDelete }) {
  const [nom, setNom]   = useState('');
  const [link, setLink] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && config) {
      setNom(config.nom || '');
      setLink(config.link || '');
      setTimeout(() => ref.current?.focus(), 50);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    if (!nom.trim() || !link.trim()) { alert("Has d'omplir tots els camps."); return; }
    onSave(nom.trim(), link.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-[#003366] text-xl font-bold mb-1">
        {config?.titol || 'Editar secció'}
      </h3>
      <ModalInput inputRef={ref} type="text" placeholder="Nom de la secció"
        value={nom} onChange={(e) => setNom(e.target.value)} />
      <ModalInput type="text" placeholder="Enllaç (URL)"
        value={link} onChange={(e) => setLink(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()} />
      <div className="flex gap-2 justify-center mt-4 flex-wrap">
        <ModalBtn onClick={handleSave}>Desar</ModalBtn>
        {onDelete && (
          <ModalBtn
            variant="danger"
            onClick={() => window.confirm('Segur que vols esborrar?') && onDelete()}
          >
            Esborrar
          </ModalBtn>
        )}
        <ModalBtn onClick={onClose} variant="ghost">Cancel·lar</ModalBtn>
      </div>
    </Modal>
  );
}
