import { useEffect } from 'react';

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    overflow-x: hidden;
    line-height: 1.6;
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 30%, rgba(255,224,102,0.4) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(161,196,253,0.3) 0%, transparent 50%),
      linear-gradient(135deg, #f0f4ff 0%, #fef9e7 100%);
    background-attachment: fixed;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .fadeInUp  { animation: fadeInUp  0.6s ease-out both; }
  .scaleIn   { animation: scaleIn   0.3s cubic-bezier(0.34,1.56,0.64,1) both; }
  .fadeIn    { animation: fadeIn    0.3s ease both; }

  /* Accordion max-height transition */
  .acordio-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1),
                padding    0.45s cubic-bezier(0.4,0,0.2,1);
  }
  .acordio-body.open { max-height: 1000px; }

  /* Arrow spin */
  .fletxa { display:inline-block; transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); }
  .fletxa.open { transform: rotate(180deg); }

  /* Slider track */
  .slider-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
    will-change: transform;
  }
  .slider-track img {
    width: 100%; aspect-ratio: 4/3; object-fit: cover; flex-shrink: 0;
  }

  /* Ripple on section buttons */
  .ripple-btn { position: relative; overflow: hidden; }
  .ripple-btn::before {
    content: '';
    position: absolute; top: 50%; left: 50%;
    width: 0; height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    transform: translate(-50%,-50%);
    transition: width 0.6s, height 0.6s;
  }
  .ripple-btn:hover::before { width: 300px; height: 300px; }

  /* Link underline animat */
  .link-anim {
    color: #007BFF; text-decoration: none; position: relative;
    transition: color 0.2s;
  }
  .link-anim::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: #007BFF;
    transition: width 0.3s ease;
  }
  .link-anim:hover { color: #0056b3; }
  .link-anim:hover::after { width: 100%; }

  /* Slider button hover */
  .slider-btn { opacity: 0; transition: opacity 0.2s, transform 0.2s; }
  .slider-wrap:hover .slider-btn { opacity: 0.9; }
  .slider-btn:hover { opacity: 1 !important; transform: translateY(-50%) scale(1.1) !important; }
  .slider-btn:active { transform: translateY(-50%) scale(0.95) !important; }

  /* Boto admin spin */
  .boto-admin { transition: transform 0.2s, box-shadow 0.2s; }
  .boto-admin:hover { transform: scale(1.1) rotate(90deg); }
  .boto-admin:active { transform: scale(0.95); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  @media (max-width: 768px) {
    .main-grid { display: flex !important; flex-direction: column !important; }
    .slider-wrap img { max-width: 100%; }
  }
`;

export default function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}
