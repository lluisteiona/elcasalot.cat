import { useState } from 'react';
import Bloc, { H2 } from './Bloc';
import Acordio from './Acordio';
import { C } from '../config/constants';

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
    <Bloc id="galeria" style={{ gridArea: 'galeria' }}>
      <H2>Galeria</H2>

      {cursosOrdenats.map(etiqueta => (
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
          className="boto-admin"
          onClick={onAfegirCurs}
          title="Afegir curs nou"
          style={{
            display: 'block', margin: '0.5rem auto',
            width: '36px', height: '36px', borderRadius: '50%',
            background: C.blau, color: C.groc,
            border: 'none', fontSize: '1.4rem', fontWeight: 'bold',
            cursor: 'pointer', lineHeight: '36px', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontFamily: 'inherit',
          }}
        >
          +
        </button>
      )}
    </Bloc>
  );
}
