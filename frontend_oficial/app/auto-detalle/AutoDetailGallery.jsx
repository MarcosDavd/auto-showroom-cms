'use client';

import { useState } from 'react';

export default function AutoDetailGallery({ images = [], name }) {
  const [activeImage, setActiveImage] = useState(0);
  const safeImages = images.length ? images : ['/images/carroCarrusel1.avif'];

  function moveImage(direction) {
    setActiveImage((current) => (current + direction + safeImages.length) % safeImages.length);
  }

  return (
    <section className="detail-gallery" aria-label={`Fotos de ${name}`}>
      <div className="detail-main-image">
        <img src={safeImages[activeImage]} alt={`${name}, foto ${activeImage + 1}`} />
        {safeImages.length > 1 && (
          <>
            <button type="button" className="gallery-arrow gallery-arrow-prev" onClick={() => moveImage(-1)} aria-label="Foto anterior">‹</button>
            <button type="button" className="gallery-arrow gallery-arrow-next" onClick={() => moveImage(1)} aria-label="Foto siguiente">›</button>
          </>
        )}
      </div>
      {safeImages.length > 1 && (
        <div className="gallery-dots" aria-label="Seleccionar foto">
          {safeImages.map((image, index) => (
            <button
              type="button"
              key={image}
              className={index === activeImage ? 'gallery-dot active' : 'gallery-dot'}
              onClick={() => setActiveImage(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === activeImage ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}