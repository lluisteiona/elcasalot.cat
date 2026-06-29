import { useState, useCallback, useRef } from 'react';
import GlobalStyles from './GlobalStyles';
import Header from './components/Header';
import { QuiSom, QueFem, OnSom, Esplac, Contacte, Instagram } from './components/Sections';
import Galeria from './components/Galeria';
import AdminBar from './components/AdminBar';
import { PasswordModal, AdminModal, EditModal } from './components/Modals';
import { useGaleria, useContingut } from './hooks';
import { PASSWORDS, C } from './config/constants';

export default function App() {
  const { galeria, setGaleria, saveGaleria }       = useGaleria();
  const { contingut, setContingut, saveContingut } = useContingut();
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const saveTimer = useRef(null);

  // Modals
  const [pwModal,    setPwModal]    = useState({ open: false, key: null });
  const [adminModal, setAdminModal] = useState(false);
  const [editModal,  setEditModal]  = useState({ open: false, config: null, onSave: null, onDelete: null });

  /* ── Desar contingut amb debounce ─────────────────── */
  const handleContingutChange = useCallback((seccio, nouValor) => {
    const next = { ...contingut, [seccio]: nouValor };
    setContingut(next);
    // Debounce: espera 800ms d'inactivitat per desar
    setSaving(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await saveContingut(next);
      setSaving(false);
    }, 800);
  }, [contingut, setContingut, saveContingut]);

  /* ── Helpers galeria ──────────────────────────────── */
  const updateAndSave = useCallback((next) => {
    setGaleria(next);
    saveGaleria(next);
  }, [setGaleria, saveGaleria]);

  const closeEdit = () => setEditModal(p => ({ ...p, open: false }));

  /* ── Accés públic ─────────────────────────────────── */
  const handleSeccioClick = (key) => setPwModal({ open: true, key });

  const handlePasswordValidate = (input) => {
    const { key } = pwModal;
    for (const curs in galeria) {
      if (galeria[curs][key]) {
        if (input === PASSWORDS.public) {
          setPwModal({ open: false, key: null });
          window.open(galeria[curs][key].link, '_blank');
        } else {
          alert('Contrasenya incorrecta.');
        }
        return;
      }
    }
    alert('Enllaç no trobat.');
  };

  /* ── Admin auth ───────────────────────────────────── */
  const handleAdminValidate = (input) => {
    if (input === PASSWORDS.admin) {
      setIsAdmin(true);
      setAdminModal(false);
    } else {
      alert('Contrasenya incorrecta.');
    }
  };

  /* ── Admin galeria CRUD ───────────────────────────── */
  const handleAfegirCurs = () => {
    const any = prompt("Introdueix l'any inicial (ex: 2024)");
    if (!any || isNaN(any)) { alert('Any invàlid.'); return; }
    const etiqueta = `Curs ${any}–${parseInt(any) + 1}`;
    if (galeria[etiqueta]) { alert('Aquest curs ja existeix.'); return; }
    updateAndSave({ ...galeria, [etiqueta]: {} });
  };

  const handleAfegirSeccio = (curs) => {
    setEditModal({
      open: true,
      config: { titol: 'Afegir nova secció', nom: '', link: '' },
      onSave: (nom, link) => {
        updateAndSave({ ...galeria, [curs]: { ...galeria[curs], [`k_${Date.now()}`]: { nom, link } } });
        closeEdit();
      },
      onDelete: null,
    });
  };

  const handleEditarSeccio = (curs, key) => {
    const entrada = galeria[curs]?.[key];
    if (!entrada) { alert('Secció no trobada.'); return; }
    setEditModal({
      open: true,
      config: { titol: 'Editar secció', nom: entrada.nom, link: entrada.link },
      onSave: (nom, link) => {
        const seccions = { ...galeria[curs] };
        delete seccions[key];
        seccions[`k_${Date.now()}`] = { nom, link };
        updateAndSave({ ...galeria, [curs]: seccions });
        closeEdit();
      },
      onDelete: () => {
        const seccions = { ...galeria[curs] };
        delete seccions[key];
        updateAndSave({ ...galeria, [curs]: seccions });
        closeEdit();
      },
    });
  };

  /* ── Render ───────────────────────────────────────── */
  if (!contingut) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      height:'100vh', color: C.blau, fontSize: '1.2rem' }}>
      Carregant...
    </div>
  );

  return (
    <>
      <GlobalStyles />
      <Header onAdminClick={() => setAdminModal(true)} />

      <main className="main-grid" style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '1.5rem',
        display: 'grid', gap: '1rem',
        gridTemplateColumns: '1fr 0.7fr',
        gridTemplateAreas: `
          "bloc1    contacte"
          "bloc2    galeria"
          "bloc3    galeria"
          "bloc4    galeria"
          "bloc6    galeria"
        `,
      }}>
        <QuiSom   data={contingut.quiSom}   isAdmin={isAdmin} onChange={v => handleContingutChange('quiSom', v)} />
        <QueFem   data={contingut.queFem}   isAdmin={isAdmin} onChange={v => handleContingutChange('queFem', v)} />
        <OnSom    data={contingut.onSom}    isAdmin={isAdmin} onChange={v => handleContingutChange('onSom', v)} />
        <Esplac   data={contingut.esplac}   isAdmin={isAdmin} onChange={v => handleContingutChange('esplac', v)} />
        <Contacte data={contingut.contacte} isAdmin={isAdmin} onChange={v => handleContingutChange('contacte', v)} />
        <Instagram data={contingut.instagram} isAdmin={isAdmin} onChange={v => handleContingutChange('instagram', v)} />
        <Galeria
          galeria={galeria} isAdmin={isAdmin}
          onSeccioClick={handleSeccioClick}
          onAfegirSeccio={handleAfegirSeccio}
          onEditarSeccio={handleEditarSeccio}
          onAfegirCurs={handleAfegirCurs}
        />
      </main>

      <footer style={{ textAlign:'center', padding:'2rem 1rem',
        background: C.blau, color: C.groc, marginTop:'3rem', fontSize:'0.9rem' }}>
        {isAdmin
          ? <EditableFooter text={contingut.footer?.text} onSave={v => handleContingutChange('footer', { text: v })} />
          : <span>&copy; {contingut.footer?.text}</span>
        }
      </footer>

      {isAdmin && <AdminBar onLogout={() => setIsAdmin(false)} saving={saving} />}

      <PasswordModal isOpen={pwModal.open} onClose={() => setPwModal({ open: false, key: null })} onValidate={handlePasswordValidate} />
      <AdminModal    isOpen={adminModal}   onClose={() => setAdminModal(false)}                   onValidate={handleAdminValidate} />
      <EditModal     isOpen={editModal.open} onClose={closeEdit} config={editModal.config} onSave={editModal.onSave} onDelete={editModal.onDelete} />
    </>
  );
}

function EditableFooter({ text, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState(text);

  if (editing) return (
    <span style={{ display:'flex', alignItems:'center', gap:'6px', justifyContent:'center' }}>
      <input value={draft} onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if(e.key==='Enter'){ onSave(draft); setEditing(false); } if(e.key==='Escape') setEditing(false); }}
        style={{ padding:'2px 8px', borderRadius:'4px', border:'none', fontFamily:'inherit', fontSize:'inherit', color:'#111' }} />
      <button onClick={() => { onSave(draft); setEditing(false); }}
        style={{ background:'#28a745', color:'#fff', border:'none', borderRadius:'4px', padding:'2px 8px', cursor:'pointer', fontFamily:'inherit' }}>✓</button>
    </span>
  );

  return (
    <span onClick={() => { setDraft(text); setEditing(true); }}
      style={{ cursor:'text', padding:'2px 4px', borderRadius:'3px', transition:'background 0.15s' }}
      onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
      onMouseLeave={e => e.target.style.background = 'transparent'}
      title="Clic per editar">
      &copy; {text}
    </span>
  );
}
