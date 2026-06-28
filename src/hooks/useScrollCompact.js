import { useState, useEffect } from 'react';
import { SCROLL_THRESHOLD } from '../config/constants';

export function useScrollCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return compact;
}
