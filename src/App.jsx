import { useState, useCallback } from "react";
import Header from "./components/Header";
import { QuiSom, QueFem, OnSom, Esplac, Contacte, Instagram } from "./components/Sections";
import Galeria from "./components/Galeria";
import { PasswordModal, AdminModal, EditModal } from "./components/Modals";
import { useGaleria } from "./hooks/useGaleria";
import { CONFIG } from "./config/constants";

export default function App() {
  const { galeria, setGaleria, saveGaleria } = useGaleria();
  const [isAdmin, setIsAdmin] = useState(false);

  // Modals state
  const [passwordModal, setPasswordModal] = useState({ open: false, key: null });
  const [adminModal, setAdminModal] = useState(false);
  const [editModal, setEditModal] = useState({
    open: false,
    config: null,
    onSave: null,
    onDelete: null,
  });

  /* ── Galeria: accés públic ────────────────────────── */
  const handleSeccioClick = useCallback(
    (key) => {
      setPasswordModal({ open: true, key });
    },
    []
  );

  const handlePasswordValidate = useCallback(
    (input) => {
      const { key } = passwordModal;
      for (const curs in galeria) {
        if (galeria[curs][key]) {
          if (input === CONFIG.passwords.public) {
            setPasswordModal({ open: false, key: null });
            window.open(galeria[curs][key].link, "_blank");
          } else {
            alert("Contrasenya incorrecta.");
          }
          return;
        }
      }
      alert("Enllaç no trobat.");
    },
    [passwordModal, galeria]
  );

  /* ── Admin: autenticació ──────────────────────────── */
  const handleAdminValidate = useCallback((input) => {
    if (input === CONFIG.passwords.admin) {
      setIsAdmin(true);
      setAdminModal(false);
    } else {
      alert("Contrasenya incorrecta.");
    }
  }, []);

  /* ── Admin: accions de galeria ────────────────────── */
  const updateAndSave = useCallback(
    (newGaleria) => {
      setGaleria(newGaleria);
      saveGaleria(newGaleria);
    },
    [setGaleria, saveGaleria]
  );

  const handleAfegirCurs = useCallback(() => {
    const any = prompt("Introdueix l'any inicial (ex: 2024)");
    if (!any || isNaN(any)) {
      alert("Any invàlid.");
      return;
    }
    const etiqueta = `Curs ${any}–${parseInt(any) + 1}`;
    if (galeria[etiqueta]) {
      alert("Aquest curs ja existeix.");
      return;
    }
    updateAndSave({ ...galeria, [etiqueta]: {} });
  }, [galeria, updateAndSave]);

  const handleAfegirSeccio = useCallback(
    (curs) => {
      setEditModal({
        open: true,
        config: { titol: "Afegir nova secció", nom: "", link: "" },
        onSave: (nom, link) => {
          const key = `k_${Date.now()}`;
          const newGaleria = {
            ...galeria,
            [curs]: { ...galeria[curs], [key]: { nom, link } },
          };
          updateAndSave(newGaleria);
          setEditModal((prev) => ({ ...prev, open: false }));
        },
        onDelete: null,
      });
    },
    [galeria, updateAndSave]
  );

  const handleEditarSeccio = useCallback(
    (curs, key) => {
      const entrada = galeria[curs]?.[key];
      if (!entrada) {
        alert("Secció no trobada.");
        return;
      }
      setEditModal({
        open: true,
        config: { titol: "Editar secció", nom: entrada.nom, link: entrada.link },
        onSave: (nom, link) => {
          const novaKey = `k_${Date.now()}`;
          const cursSeccions = { ...galeria[curs] };
          delete cursSeccions[key];
          cursSeccions[novaKey] = { nom, link };
          updateAndSave({ ...galeria, [curs]: cursSeccions });
          setEditModal((prev) => ({ ...prev, open: false }));
        },
        onDelete: () => {
          const cursSeccions = { ...galeria[curs] };
          delete cursSeccions[key];
          updateAndSave({ ...galeria, [curs]: cursSeccions });
          setEditModal((prev) => ({ ...prev, open: false }));
        },
      });
    },
    [galeria, updateAndSave]
  );

  return (
    <>
      <Header onAdminClick={() => setAdminModal(true)} />

      <main className="container">
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

      <footer>
        &copy; 2025 Esplai El Casalot &middot; Tots els drets reservats
      </footer>

      <PasswordModal
        isOpen={passwordModal.open}
        onClose={() => setPasswordModal({ open: false, key: null })}
        onValidate={handlePasswordValidate}
      />

      <AdminModal
        isOpen={adminModal}
        onClose={() => setAdminModal(false)}
        onValidate={handleAdminValidate}
      />

      <EditModal
        isOpen={editModal.open}
        onClose={() => setEditModal((prev) => ({ ...prev, open: false }))}
        config={editModal.config}
        onSave={editModal.onSave}
        onDelete={editModal.onDelete}
      />
    </>
  );
}
