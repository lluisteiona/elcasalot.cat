import { useState, useEffect, useRef } from "react";

/* ── Modal genèric ────────────────────────────────────── */
function Modal({ id, isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id={id}
      className="modal"
      style={{ display: "flex" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
    >
      <div className="modal-content">{children}</div>
    </div>
  );
}

/* ── Modal de contrasenya de galeria ─────────────────── */
export function PasswordModal({ isOpen, onClose, onValidate }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSubmit = () => onValidate(value.trim());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Modal id="passwordModal" isOpen={isOpen} onClose={onClose}>
      <h3>Accés a la galeria</h3>
      <input
        ref={inputRef}
        type="password"
        placeholder="Contrasenya"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Contrasenya d'accés"
      />
      <div className="modal-buttons">
        <button onClick={handleSubmit}>Entrar</button>
        <button onClick={onClose}>Cancel·lar</button>
      </div>
    </Modal>
  );
}

/* ── Modal d'administració ───────────────────────────── */
export function AdminModal({ isOpen, onClose, onValidate }) {
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSubmit = () => onValidate(password.trim());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Modal id="adminPanel" isOpen={isOpen} onClose={onClose}>
      <h3>Accés administració</h3>
      <input
        ref={inputRef}
        type="password"
        id="adminPassword"
        placeholder="Contrasenya"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Contrasenya d'administració"
      />
      <div className="modal-buttons">
        <button onClick={handleSubmit}>Entrar</button>
        <button onClick={onClose}>Cancel·lar</button>
      </div>
    </Modal>
  );
}

/* ── Modal d'edició de secció ────────────────────────── */
export function EditModal({ isOpen, onClose, config, onSave, onDelete }) {
  const [nom, setNom] = useState("");
  const [link, setLink] = useState("");
  const nomRef = useRef(null);

  useEffect(() => {
    if (isOpen && config) {
      setNom(config.nom || "");
      setLink(config.link || "");
      setTimeout(() => nomRef.current?.focus(), 50);
    }
  }, [isOpen, config]);

  const handleSave = () => {
    if (!nom.trim() || !link.trim()) {
      alert("Has d'omplir tots els camps.");
      return;
    }
    onSave(nom.trim(), link.trim());
  };

  const handleDelete = () => {
    if (window.confirm("Segur que vols esborrar aquesta secció?")) {
      onDelete();
    }
  };

  return (
    <Modal id="editModal" isOpen={isOpen} onClose={onClose}>
      <h3>{config?.titol || "Editar secció"}</h3>
      <input
        ref={nomRef}
        type="text"
        placeholder="Nom de la secció"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        aria-label="Nom de la secció"
      />
      <input
        type="text"
        placeholder="Enllaç"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        aria-label="Enllaç de la secció"
      />
      <div className="modal-buttons">
        <button onClick={handleSave}>Desar</button>
        {onDelete && (
          <button id="editEsborrar" onClick={handleDelete}>
            Esborrar
          </button>
        )}
        <button onClick={onClose}>Cancel·lar</button>
      </div>
    </Modal>
  );
}
