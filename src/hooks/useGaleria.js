import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../config/firebase';

export function useGaleria() {
  const [galeria, setGaleria] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const galeriaRef = ref(db, 'galeria');
    const unsub = onValue(
      galeriaRef,
      (snap) => { setGaleria(snap.val() || {}); setLoading(false); },
      (err) => { console.error('Firebase error:', err); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const saveGaleria = useCallback(async (data) => {
    try {
      await set(ref(db, 'galeria'), data);
    } catch (err) {
      console.error('Error desant:', err);
    }
  }, []);

  return { galeria, setGaleria, saveGaleria, loading };
}
