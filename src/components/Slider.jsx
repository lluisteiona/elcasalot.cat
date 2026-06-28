import { useSlider } from '../hooks/useSlider';
import { SLIDER_IMAGES } from '../config/constants';

export default function Slider() {
  const { current, goNext, goPrev } = useSlider(SLIDER_IMAGES.length);

  return (
    <div className="relative max-w-[400px] mx-auto my-6 overflow-hidden rounded-xl shadow-md group">
      {/* Track */}
      <div
        className="slider-inner"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDER_IMAGES.map((img, i) => (
          <img key={i} src={`assets/que-fem/${img}`} alt={`Foto ${i + 1}`} />
        ))}
      </div>

      {/* Botons prev/next */}
      {[
        { label: '❮', side: 'left-2',  action: goPrev, aria: 'Imatge anterior' },
        { label: '❯', side: 'right-2', action: goNext, aria: 'Imatge següent'  },
      ].map(({ label, side, action, aria }) => (
        <button
          key={side}
          aria-label={aria}
          onClick={action}
          className={`absolute top-1/2 -translate-y-1/2 ${side} opacity-0 group-hover:opacity-90 
            bg-[#003366]/80 backdrop-blur text-[#FFD700] text-2xl px-3 py-1 rounded-lg 
            transition-all duration-200 hover:opacity-100 hover:scale-110 active:scale-95 z-10`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
