import { useState } from "react";

export default function Acordio({
  etiqueta,
  seccions,
  isOpen,
  onToggle,
  onSeccioClick,
  isAdmin,
  onAfegirSeccio,
  onEditarSeccio,
}) {
  return (
    <div className={`acordio${isOpen ? " open" : ""}`} data-curs={etiqueta}>
      <button className="acordio-titol" onClick={onToggle}>
        <span>{etiqueta}</span>
        <span className="fletxa">▼</span>
      </button>

      <div className="acordio-contingut">
        {Object.entries(seccions).map(([key, { nom }]) => (
          <button
            key={key}
            data-key={key}
            onClick={() =>
              isAdmin ? onEditarSeccio(etiqueta, key) : onSeccioClick(key)
            }
          >
            {nom}
          </button>
        ))}
      </div>

      {isAdmin && (
        <button
          className="boto-admin"
          onClick={() => onAfegirSeccio(etiqueta)}
          title="Afegir secció"
        >
          +
        </button>
      )}
    </div>
  );
}
