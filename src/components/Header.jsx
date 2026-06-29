import { useScrollCompact } from '../hooks';
import { C } from '../config/constants';

export default function Header({ onAdminClick }) {
  const compact = useScrollCompact();

  const s = {
    header: {
      position: 'sticky', top: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '1rem',
      padding: compact ? '0.3rem 1rem' : '0.75rem 1.5rem',
      backgroundColor: C.blau,
      color: C.groc,
      boxShadow: compact ? '0 4px 16px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      willChange: 'padding, box-shadow',
    },
    img: {
      height: compact ? '0px' : '70px',
      opacity: compact ? 0 : 1,
      transform: compact ? 'scale(0.7)' : 'scale(1)',
      pointerEvents: compact ? 'none' : 'auto',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      overflow: 'hidden',
    },
    h1: {
      flex: 1, textAlign: 'center', fontWeight: 'bold',
      fontSize: compact ? '1.5rem' : 'clamp(1.5rem, 4vw, 2.5rem)',
      transition: 'font-size 0.3s ease',
    },
  };

  return (
    <header style={s.header}>
      <img
        src="assets/logo.png"
        alt="Logo Esplai El Casalot"
        style={s.img}
        onClick={onAdminClick}
      />
      <h1 style={s.h1}>El Casalot</h1>
    </header>
  );
}
