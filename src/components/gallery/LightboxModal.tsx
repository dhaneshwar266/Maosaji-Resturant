import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../../types/restaurant';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Gallery"
    >
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close Lightbox"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-prev-btn"
          onClick={handlePrev}
          aria-label="View previous image"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          className="lightbox-nav-btn lightbox-next-btn"
          onClick={handleNext}
          aria-label="View next image"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>

        {/* Active Image */}
        <img
          src={currentItem.imageUrl}
          alt={currentItem.altText}
          className="lightbox-img"
        />

        {/* Details & Caption */}
        <div className="lightbox-details">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
              }}
            >
              {currentItem.category} • {currentIndex + 1} of {items.length}
            </span>
          </div>

          <h3 className="lightbox-title">{currentItem.title}</h3>
          <p className="lightbox-desc">{currentItem.description}</p>
        </div>
      </div>
    </div>
  );
};
