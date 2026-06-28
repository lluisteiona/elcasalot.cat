import { useState, useEffect, useCallback } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../config/firebase";

export function useGaleria() {
  const [galeria, setGaleria] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const galeriaRef = ref(db, "galeria");
    const unsubscribe = onValue(
      galeriaRef,
      (snapshot) => {
        const data = snapshot.val();
        setGaleria(data || {});
        setLoading(false);
      },
      (err) => {
        console.error("Error carregant galeria:", err);
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const saveGaleria = useCallback(async (newGaleria) => {
    try {
      await set(ref(db, "galeria"), newGaleria);
    } catch (err) {
      console.error("Error desant dades:", err);
      throw err;
    }
  }, []);

  return { galeria, setGaleria, saveGaleria, loading, error };
}
