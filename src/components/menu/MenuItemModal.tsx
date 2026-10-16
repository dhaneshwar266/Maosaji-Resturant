import React, { useEffect } from 'react';
import { X, Plus, Minus, CheckCircle, HelpCircle } from 'lucide-react';
import type { MenuItem } from '../../types/restaurant';
import { useCart } from '../../context/useCart';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const cartEntry = cart.find((ci) => ci.item.id === item.id);
  const quantity = cartEntry ? cartEntry.quantity : 0;

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dish-title"
    >
      <div
        className="lightbox-content-box"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close dish preview"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Dish Image */}
        <div style={{ position: 'relative', height: '300px', backgroundColor: 'var(--color-cream)' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <div className="badge-veg" title="Pure Veg">
              <div className="badge-veg-dot" />
            </div>
            {item.priceEstimated ? (
              <span className="badge-estimated">
                <HelpCircle size={12} aria-hidden="true" />
                Estimated Price
              </span>
            ) : (
              <span className="badge-verified">
                <CheckCircle size={12} aria-hidden="true" />
                Verified Price
              </span>
            )}
          </div>
        </div>

        {/* Modal Info */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', color: 'var(--color-text-dark)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <div>
              <h2
                id="modal-dish-title"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  color: 'var(--color-burgundy)',
                  marginBottom: '4px',
                }}
              >
                {item.name}
              </h2>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-maroon)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                Category: {item.category.replace('-', ' ')}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--color-maroon)',
                }}
              >
                ₹{item.price}
              </span>
              {item.priceEstimated && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    color: 'var(--color-estimated)',
                    fontWeight: 600,
                  }}
                >
                  Temporary Estimate
                </span>
              )}
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
            {item.description}
          </p>

          {item.priceEstimated && (
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: 'var(--color-estimated-bg)',
                border: '1px solid var(--color-estimated-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                color: '#8A5200',
                marginBottom: '20px',
              }}
            >
              <strong>Notice:</strong> This item's price is temporarily estimated based on comparable regional dishes. Our restaurant team will verify the final official printed bill with you over WhatsApp before preparation.
            </div>
          )}

          {/* Quantity and Add CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(112, 40, 58, 0.1)',
            }}
          >
            {quantity === 0 ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => addToCart(item)}
              >
                <Plus size={18} aria-hidden="true" />
                <span>Add to Cart (₹{item.price})</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-burgundy)' }}>
                  In your order:
                </span>
                <div style={{ width: '150px' }}>
                  <div className="qty-control">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                    >
                      <Minus size={15} />
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
