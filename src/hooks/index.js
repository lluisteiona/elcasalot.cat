import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../config/firebase';
import { SCROLL_THRESHOLD, SLIDER_INTERVAL } from '../config/constants';

/* ── Firebase galeria ───────────────────────────────── */
export function useGaleria() {
  const [galeria, setGaleria] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onValue(
      ref(db, 'galeria'),
      (snap) => { setGaleria(snap.val() || {}); setLoading(false); },
      (err)  => { console.error(err); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const saveGaleria = useCallback(async (data) => {
    try { await set(ref(db, 'galeria'), data); }
    catch (e) { console.error('Error desant:', e); }
  }, []);

  return { galeria, setGaleria, saveGaleria, loading };
}

/* ── Firebase contingut editable ────────────────────── */
const CONTINGUT_DEFAULT = {
  quiSom: {
    titol: "Qui som?",
    text: "El Casalot és un esplai laic i inclusiu d'educació en el lleure on infants, monitores i monitors comparteixen una educació en valors, crítica i lliure. És un lloc on els infants poden desconnectar de la rutina diària i gaudir d'un temps de trobada enriquidor. A través d'activitats diverses i dinàmiques, promovem la reflexió sobre temes importants, tot fomentant valors com la cooperació, la convivència i el respecte, sempre des d'una perspectiva lúdica i divertida.",
  },
  queFem: {
    titol: "Què fem?",
    text: "Organitzem activitats cada dissabte a la tarda, colònies, campaments i projectes per fomentar el creixement personal i col·lectiu dels infants i joves.",
    fotos: ['foto1.png','foto2.png','foto3.png','foto4.png','foto5.png','foto6.png'],
  },
  onSom: {
    titol: "On som?",
    mapaUrl: "assets/mapa.png",
    mapsLink: "https://www.google.es/maps/place/Esplai+El+Casalot/@41.9802206,2.3085711,236m/data=!3m2!1e3!5s0x12a52f53c39d1ca7:0xdc584534014b1da!4m6!3m5!1s0x12a52f0e4f4496eb:0xc93ccc031614850e!8m2!3d41.9799582!4d2.3088258!16s%2Fg%2F11h9ktwd0y?hl=ca&entry=ttu",
  },
  esplac: {
    titol: "Esplac",
    intro: "Som un esplai associat a Esplais Catalans (Esplac), una entitat laica, progressista i transformadora que agrupa esplais d'arreu del territori català. Esplac promou l'educació en el lleure com una eina de transformació social, basada en la participació infantil i juvenil, l'assemblearisme i el compromís amb el territori.",
    valorsIntro: "Formar part d'Esplac vol dir compartir uns valors comuns, com ara:",
    valors: [
      "L'educació en el lleure com a espai educatiu lliure i crític.",
      "El feminisme, l'ecologisme i l'antiracisme com a eixos transversals del nostre dia a dia.",
      "L'autogestió i l'assemblearisme, donant veu a infants, joves i monitores en la presa de decisions.",
      "El compromís social, participant activament en la comunitat i promovent un món més just.",
    ],
    outro: "A través d'Esplac, ens formem, compartim experiències amb altres esplais i participem en trobades i accions conjuntes que enriqueixen el nostre projecte educatiu i ens connecten amb una xarxa més gran que ens dona força i sentit.",
  },
  contacte: {
    titol: "Contacte",
    email: "esplaielcasalot@gmail.com",
    instagram: "esplaielcasalot",
  },
  instagram: {
    titol: "Segueix-nos a Instagram",
    handle: "esplaielcasalot",
  },
  footer: {
    text: "2025 Esplai El Casalot · Tots els drets reservats",
  },
};

export function useContingut() {
  const [contingut, setContingut] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onValue(
      ref(db, 'contingut'),
      (snap) => {
        const data = snap.val();
        if (data) {
          // Merge amb defaults per si falten camps nous
          setContingut({
            ...CONTINGUT_DEFAULT,
            ...data,
            queFem: { ...CONTINGUT_DEFAULT.queFem, ...data.queFem },
            esplac: {
              ...CONTINGUT_DEFAULT.esplac,
              ...data.esplac,
              valors: data.esplac?.valors || CONTINGUT_DEFAULT.esplac.valors,
            },
          });
        } else {
          setContingut(CONTINGUT_DEFAULT);
          set(ref(db, 'contingut'), CONTINGUT_DEFAULT);
        }
        setLoading(false);
      },
      (err) => { console.error(err); setContingut(CONTINGUT_DEFAULT); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const saveContingut = useCallback(async (data) => {
    try { await set(ref(db, 'contingut'), data); }
    catch (e) { console.error('Error desant contingut:', e); }
  }, []);

  return { contingut, setContingut, saveContingut, loading };
}

/* ── Sticky header ──────────────────────────────────── */
export function useScrollCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const fn = () => setCompact(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return compact;
}

/* ── Slider autoplay ────────────────────────────────── */
export function useSlider(count) {
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % count), [count]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + count) % count), [count]);

  const restart = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(next, SLIDER_INTERVAL);
  }, [next]);

  useEffect(() => { restart(); return () => clearInterval(timer.current); }, [restart]);

  return {
    current,
    goNext: () => { next(); restart(); },
    goPrev: () => { prev(); restart(); },
  };
}
