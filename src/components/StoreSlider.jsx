import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  { id: 1, src: '/img1_.jpg', alt: 'Offer 1' },
  { id: 2, src: '/img2_.jpg', alt: 'Offer 2' },
  { id: 3, src: '/img3_.jpg', alt: 'Offer 3' },
  { id: 4, src: '/img4_.jpg', alt: 'Offer 4' },
  { id: 5, src: '/img5_.jpg', alt: 'Offer 5' },
  { id: 6, src: '/img6_.jpg', alt: 'Offer 6' },
  { id: 7, src: '/img7_.jpg', alt: 'Offer 7' },
  { id: 8, src: '/img8_.jpg', alt: 'Offer 8' },
];

export default function StoreSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const goTo   = useCallback((idx) => setCurrent((idx + SLIDES.length) % SLIDES.length), []);
  const next   = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev   = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <div
      className="img-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Images */}
      <div className="img-slider-track">
        {SLIDES.map((s, i) => (
          <img
            key={s.id}
            src={s.src}
            alt={s.alt}
            className={`img-slider-img ${i === current ? 'active' : ''}`}
            draggable={false}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <button className="img-slider-arrow arrow-prev" onClick={prev} aria-label="Previous">&#8249;</button>
      <button className="img-slider-arrow arrow-next" onClick={next} aria-label="Next">&#8250;</button>

      {/* Dots */}
      <div className="img-slider-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`img-slider-dot ${i === current ? 'active' : ''}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="img-slider-progress">
        <div className={`img-slider-bar ${!paused ? 'running' : ''}`} key={`${current}-bar`} />
      </div>
    </div>
  );
}
