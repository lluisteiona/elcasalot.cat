import { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDER_INTERVAL_MS } from '../config/constants';

export function useSlider(count) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % count), [count]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + count) % count), [count]);

  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, SLIDER_INTERVAL_MS);
  }, [next]);

  useEffect(() => {
    restart();
    return () => clearInterval(timerRef.current);
  }, [restart]);

  const goNext = () => { next(); restart(); };
  const goPrev = () => { prev(); restart(); };

  return { current, goNext, goPrev };
}
