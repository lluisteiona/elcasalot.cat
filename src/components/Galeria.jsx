import { useState } from 'react';
import Acordio from './Acordio';
import Bloc from './Bloc';

export default function Galeria({
  galeria, isAdmin,
  onSeccioClick, onAfegirSeccio, onEditarSeccio, onAfegirCurs,
}) {
  const [openCurs, setOpenCurs] = useState(null);

  const cursosOrdenats = Object.keys(galeria).sort((a, b) => {
    const anyA = parseInt(a.match(/\d{4}/)?.[0]) || 0;
    const anyB = parseInt(b.match(/\d{4}/)?.[0]) || 0;
    return anyB - anyA;
  });

  return (
    <Bloc id="galeria" className="col-span-1 md:col-span-1 row-span-5" style={{ gridArea: 'galeria' }}>
      <h2 className="text-[#003366] text-2xl font-bold mb-4">Galeria</h2>

      {cursosOrdenats.map((etiqueta) => (
        <Acordio
          key={etiqueta}
          etiqueta={etiqueta}
          seccions={galeria[etiqueta] || {}}
          isOpen={openCurs === etiqueta}
          onToggle={() => setOpenCurs(p => p === etiqueta ? null : etiqueta)}
          onSeccioClick={onSeccioClick}
          isAdmin={isAdmin}
          onAfegirSeccio={onAfegirSeccio}
          onEditarSeccio={onEditarSeccio}
        />
      ))}

      {isAdmin && (
        <button
          onClick={onAfegirCurs}
          className="block mx-auto mt-2 w-9 h-9 rounded-full bg-[#003366] text-[#FFD700] text-xl font-bold
            hover:scale-110 hover:rotate-90 active:scale-95 transition-all duration-200 shadow-sm"
          title="Afegir curs"
        >
          +
        </button>
      )}
    </Bloc>
  );
}
