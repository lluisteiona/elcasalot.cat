import { useState, useEffect, useRef, useCallback } from "react";
import { CONFIG } from "../config/constants";

export default function Slider({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);
  const slideImages = images || CONFIG.slider.images;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  }, [slideImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + slideImages.length) % slideImages.length
    );
  }, [slideImages.length]);

  const startAutoPlay = useCallback(() => {
    timerRef.current = setInterval(nextSlide, CONFIG.slider.autoPlayInterval);
  }, [nextSlide]);

  const resetAutoPlay = useCallback(() => {
    clearInterval(timerRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, [startAutoPlay]);

  const handlePrev = () => {
    prevSlide();
    resetAutoPlay();
  };

  const handleNext = () => {
    nextSlide();
    resetAutoPlay();
  };

  return (
    <div className="slider" id="slider-que-fem">
      <div
        className="slider-inner"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slideImages.map((imgName, i) => (
          <img
            key={i}
            src={`assets/que-fem/${imgName}`}
            alt={`Foto ${i + 1}`}
          />
        ))}
      </div>
      <button
        className="slider-btn prev"
        aria-label="Imatge anterior"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="slider-btn next"
        aria-label="Següent imatge"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
  );
}
