import { useSlider } from '../hooks';
import { C } from '../config/constants';

// Suporta: nom fitxer local, URL https, o base64
function resolveImg(src) {
  if (!src) return '';
  if (src.startsWith('data:') || src.startsWith('http')) return src;
  return `assets/que-fem/${src}`;
}

export default function Slider({ fotos }) {
  const images = fotos && fotos.length > 0 ? fotos : ['foto1.png'];
  const { current, goNext, goPrev } = useSlider(images.length);

  return (
    <div style={{ position: 'relative', maxWidth: '400px', margin: '1.5rem auto 0',
      overflow: 'hidden', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
      className="slider-wrap"
    >
      <div className="slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <img key={i} src={resolveImg(img)} alt={`Foto ${i + 1}`}
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', flexShrink: 0 }} />
        ))}
      </div>
      {images.length > 1 && <>
        <button className="slider-btn" onClick={goPrev} aria-label="Anterior"
          style={{ position:'absolute', top:'50%', left:'10px', transform:'translateY(-50%)',
            border:'none', borderRadius:'8px', background:'rgba(0,51,102,0.8)',
            backdropFilter:'blur(4px)', color: C.groc, fontSize:'2rem',
            padding:'0.4rem 0.75rem', cursor:'pointer', zIndex:10 }}>❮</button>
        <button className="slider-btn" onClick={goNext} aria-label="Següent"
          style={{ position:'absolute', top:'50%', right:'10px', transform:'translateY(-50%)',
            border:'none', borderRadius:'8px', background:'rgba(0,51,102,0.8)',
            backdropFilter:'blur(4px)', color: C.groc, fontSize:'2rem',
            padding:'0.4rem 0.75rem', cursor:'pointer', zIndex:10 }}>❯</button>
      </>}
    </div>
  );
}
