import { useState, useCallback } from 'react';
import Header from './components/Header';
import { QuiSom, QueFem, OnSom, Esplac, Contacte, Instagram } from './components/Sections';
import Galeria from './components/Galeria';
import { PasswordModal, AdminModal, EditModal } from './components/Modals';
import { useGaleria } from './hooks/useGaleria';
import { PASSWORDS } from './config/constants';

export default function App() {
  const { galeria, setGaleria, saveGaleria } = useGaleria();
  const [isAdmin, setIsAdmin] = useState(false);

  // Modals
  const [pwModal,   setPwModal]   = useState({ open: false, key: null });
  const [adminModal, setAdminModal] = useState(false);
  const [editModal,  setEditModal]  = useState({ open: false, config: null, onSave: null, onDelete: null });

  /* ── Helpers ─────────────────────────────────────────── */
  const updateAndSave = useCallback((next) => {
    setGaleria(next);
    saveGaleria(next);
  }, [setGaleria, saveGaleria]);

  const closeEdit = () => setEditModal(p => ({ ...p, open: false }));

  /* ── Accés públic a seccions ─────────────────────────── */
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

  /* ── Admin autenticació ──────────────────────────────── */
  const handleAdminValidate = (input) => {
    if (input === PASSWORDS.admin) {
      setIsAdmin(true);
      setAdminModal(false);
    } else {
      alert('Contrasenya incorrecta.');
    }
  };

  /* ── Admin: gestió de cursos i seccions ──────────────── */
  const handleAfegirCurs = () => {
    const any = prompt('Introdueix l\'any inicial (ex: 2024)');
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
        updateAndSave({
          ...galeria,
          [curs]: { ...galeria[curs], [`k_${Date.now()}`]: { nom, link } },
        });
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

  /* ── Layout ──────────────────────────────────────────── */
  return (
    <>
      <Header onAdminClick={() => setAdminModal(true)} />

      <main
        className="max-w-[1200px] mx-auto w-full p-4 md:p-8 grid gap-4"
        style={{
          gridTemplateColumns: '1fr 0.7fr',
          gridTemplateAreas: `
            "bloc1    contacte"
            "bloc2    galeria"
            "bloc3    galeria"
            "bloc4    galeria"
            "bloc6    galeria"
          `,
        }}
      >
        <QuiSom />
        <QueFem />
        <OnSom />
        <Esplac />
        <Contacte />
        <Instagram />
        <Galeria
          galeria={galeria}
          isAdmin={isAdmin}
          onSeccioClick={handleSeccioClick}
          onAfegirSeccio={handleAfegirSeccio}
          onEditarSeccio={handleEditarSeccio}
          onAfegirCurs={handleAfegirCurs}
        />
      </main>

      <footer className="text-center py-8 px-4 bg-[#003366] text-[#FFD700] mt-12 text-sm">
        &copy; 2025 Esplai El Casalot &middot; Tots els drets reservats
      </footer>

      {/* Modals */}
      <PasswordModal
        isOpen={pwModal.open}
        onClose={() => setPwModal({ open: false, key: null })}
        onValidate={handlePasswordValidate}
      />
      <AdminModal
        isOpen={adminModal}
        onClose={() => setAdminModal(false)}
        onValidate={handleAdminValidate}
      />
      <EditModal
        isOpen={editModal.open}
        onClose={closeEdit}
        config={editModal.config}
        onSave={editModal.onSave}
        onDelete={editModal.onDelete}
      />
    </>
  );
}
