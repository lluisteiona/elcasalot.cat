import { useState } from 'react';
import { C } from '../config/constants'; // eslint-disable-line no-unused-vars

export default function Bloc({ children, style, id }) {
  const [hover, setHover] = useState(false);
  return (
    <section
      id={id}
      className="fadeInUp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.blanc, borderRadius: '16px', padding: '1.5rem',
        boxShadow: hover
          ? '0 12px 30px rgba(0,0,0,0.2)'
          : '0 8px 24px rgba(0,0,0,0.15)',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        willChange: 'transform, box-shadow',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export function H2({ children }) {
  return (
    <h2 style={{ color: '#003366', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
      marginBottom: '0.75rem', fontWeight: 'bold' }}>
      {children}
    </h2>
  );
}

export function P({ children, style }) {
  return (
    <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '0.75rem',
      color: '#333', ...style }}>
      {children}
    </p>
  );
}

export function A({ href, children, external }) {
  return (
    <a
      href={href}
      className="link-anim"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
