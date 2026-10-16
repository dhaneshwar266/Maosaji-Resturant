import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { LightboxModal } from './LightboxModal';

export const GallerySection: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-header">
          <span className="section-pretitle">झरोखा • Visual Showcase</span>
          <h2 id="gallery-title" className="section-title">
            Food & Ambiance Gallery
          </h2>
          <div className="decorative-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
          <p className="section-description">
            A glimpse into the authentic vegetarian specialities, rich Indian street chaats, and welcoming family
            dining ambiance at Maosaji. Click any Jharokha arched frame to expand the interactive lightbox viewer.
          </p>
        </div>

        {/* Traditional Jharokha Arched Gallery Grid */}
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="gallery-arch-card"
              onClick={() => setActiveLightboxIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveLightboxIndex(index);
                }
              }}
              aria-label={`Open photo of ${item.title}`}
            >
              <img
                src={item.imageUrl}
                alt={item.altText}
                loading="lazy"
              />
              <div className="gallery-arch-overlay">
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-gold-bright)',
                    marginBottom: '4px',
                  }}
                >
                  {item.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    color: '#FFFFFF',
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: 'var(--color-gold-light)',
                    marginTop: '6px',
                  }}
                >
                  <Maximize2 size={13} aria-hidden="true" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <LightboxModal
          items={GALLERY_ITEMS}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onNavigate={(newIndex) => setActiveLightboxIndex(newIndex)}
        />
      )}
    </section>
  );
};
