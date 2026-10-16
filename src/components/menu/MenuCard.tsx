import React, { useState } from 'react';
import { Plus, Minus, CheckCircle, HelpCircle } from 'lucide-react';
import type { MenuItem } from '../../types/restaurant';
import { useCart } from '../../context/useCart';

interface MenuCardProps {
  item: MenuItem;
  onItemClick?: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onItemClick }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [imageError, setImageError] = useState(false);

  const cartEntry = cart.find((ci) => ci.item.id === item.id);
  const quantityInCart = cartEntry ? cartEntry.quantity : 0;

  return (
    <article className="menu-card-royal" id={`item-${item.id}`}>
      {/* Arch Window Preview */}
      <div
        className="menu-card-arch-window"
        onClick={() => onItemClick && onItemClick(item)}
        style={{ cursor: onItemClick ? 'pointer' : 'default' }}
      >
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className="menu-card-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-cream)',
              color: 'var(--color-maroon)',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-royal)',
                fontSize: '1.2rem',
                fontWeight: 800,
                marginBottom: '4px',
              }}
            >
              मौसाजी
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Traditional Kitchen
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="menu-card-badges">
          {/* Veg Emblem */}
          <div className="badge-veg" title="100% Pure Vegetarian" aria-label="Pure Vegetarian">
            <div className="badge-veg-dot" />
          </div>

          {/* Price Status Badge */}
          {item.priceEstimated ? (
            <span
              className="badge-estimated"
              title="Temporary estimated price. Requires final confirmation upon order."
            >
              <HelpCircle size={11} aria-hidden="true" />
              Est.
            </span>
          ) : (
            <span className="badge-verified" title="Verified printed price">
              <CheckCircle size={11} aria-hidden="true" />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="menu-card-body-royal">
        <div className="menu-card-header-royal">
          <div>
            <h3
              className="menu-card-title-royal"
              onClick={() => onItemClick && onItemClick(item)}
              style={{ cursor: onItemClick ? 'pointer' : 'default' }}
            >
              {item.name}
            </h3>
            <span
              style={{
                fontSize: '0.74rem',
                color: 'var(--color-gold-dark)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginTop: '2px',
              }}
            >
              {item.tags?.[0] || 'Traditional Recipe'}
            </span>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span className="gold-coin-price-tag">₹{item.price}</span>
            {item.priceEstimated && (
              <span
                style={{
                  display: 'block',
                  fontSize: '0.66rem',
                  color: 'var(--color-estimated)',
                  fontWeight: 700,
                  marginTop: '4px',
                }}
              >
                Est. Price
              </span>
            )}
          </div>
        </div>

        <p className="menu-card-desc-royal">{item.description}</p>

        {/* Card Footer: Add to Cart / Quantity adjuster */}
        <div className="menu-card-footer-royal">
          {quantityInCart === 0 ? (
            <button
              type="button"
              className="card-add-btn-royal"
              onClick={() => addToCart(item)}
              aria-label={`Add ${item.name} to order for ₹${item.price}`}
            >
              <Plus size={16} aria-hidden="true" />
              <span>Add to Order</span>
            </button>
          ) : (
            <div className="qty-control" aria-label={`Quantity of ${item.name}`}>
              <button
                type="button"
                className="qty-btn"
                onClick={() => updateQuantity(item.id, quantityInCart - 1)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                <Minus size={15} aria-hidden="true" />
              </button>
              <span className="qty-value">{quantityInCart}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => updateQuantity(item.id, quantityInCart + 1)}
                aria-label={`Increase ${item.name} quantity`}
              >
                <Plus size={15} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
