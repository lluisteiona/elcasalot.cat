import { useState } from "react";
import Acordio from "./Acordio";

export default function Galeria({
  galeria,
  isAdmin,
  onSeccioClick,
  onAfegirSeccio,
  onEditarSeccio,
  onAfegirCurs,
}) {
  const [openCurs, setOpenCurs] = useState(null);

  const cursosOrdenats = Object.keys(galeria).sort((a, b) => {
    const anyA = parseInt(a.match(/\d{4}/)?.[0]) || 0;
    const anyB = parseInt(b.match(/\d{4}/)?.[0]) || 0;
    return anyB - anyA;
  });

  const handleToggle = (etiqueta) => {
    setOpenCurs((prev) => (prev === etiqueta ? null : etiqueta));
  };

  return (
    <section id="galeria" className="bloc galeria">
      <h2>Galeria</h2>
      <div className="acordio-galeria">
        {cursosOrdenats.map((etiqueta) => (
          <Acordio
            key={etiqueta}
            etiqueta={etiqueta}
            seccions={galeria[etiqueta] || {}}
            isOpen={openCurs === etiqueta}
            onToggle={() => handleToggle(etiqueta)}
            onSeccioClick={onSeccioClick}
            isAdmin={isAdmin}
            onAfegirSeccio={onAfegirSeccio}
            onEditarSeccio={onEditarSeccio}
          />
        ))}

        {isAdmin && (
          <button
            className="boto-admin"
            onClick={onAfegirCurs}
            title="Afegir curs"
          >
            +
          </button>
        )}
      </div>
    </section>
  );
}
