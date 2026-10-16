import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, AlertTriangle, Utensils, Package, User, FileText } from 'lucide-react';
import { useCart } from '../../context/useCart';
import { generateWhatsAppOrderUrl } from '../../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    hasEstimatedItems,
    orderInfo,
    setCustomerName,
    setDiningPreference,
    setOrderNotes,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const whatsappUrl = generateWhatsAppOrderUrl(cart, orderInfo, subtotal);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <aside
        className={`cart-drawer ${isCartOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-header-title">
            <ShoppingBag size={20} aria-hidden="true" />
            <span>Your Order ({totalItems})</span>
          </h2>
          <button
            type="button"
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon" aria-hidden="true">
                <ShoppingBag size={36} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-burgundy)' }}>
                Your order is empty
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '280px' }}>
                Browse our delicious menu and add traditional savories, dosas, snacks, and sweets.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsCartOpen(false)}
              >
                Browse Menu Now
              </button>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="cart-items-list">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-maroon)' }}>
                    Selected Dishes
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={13} aria-hidden="true" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {cart.map((cartItem) => {
                  const item = cartItem.item;
                  const itemTotal = item.price * cartItem.quantity;

                  return (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-info">
                        <div className="cart-item-name">
                          <span>{item.name}</span>
                          {item.priceEstimated && (
                            <span className="badge-estimated" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                              Est.
                            </span>
                          )}
                        </div>
                        <span className="cart-item-calc">
                          {cartItem.quantity} × ₹{item.price} = <strong>₹{itemTotal}</strong>
                        </span>
                      </div>

                      <div className="cart-item-controls">
                        <div className="cart-item-qty-badge">
                          <button
                            type="button"
                            className="cart-qty-mini-btn"
                            onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="cart-qty-mini-num">{cartItem.quantity}</span>
                          <button
                            type="button"
                            className="cart-qty-mini-btn"
                            onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimated Price Warning Notice */}
              {hasEstimatedItems && (
                <div
                  style={{
                    padding: '12px 14px',
                    backgroundColor: 'var(--color-estimated-bg)',
                    border: '1px solid var(--color-estimated-border)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    color: '#8A5200',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Price Note:</strong> Dishes with an <strong>Est.</strong> badge have temporary
                    estimated prices. Our team will confirm the final printed bill before preparing.
                  </div>
                </div>
              )}

              {/* Dining Preference: Dine-in vs Takeaway */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-burgundy)', marginBottom: '8px' }}>
                  Dining Preference:
                </label>
                <div className="dining-pref-selector">
                  <button
                    type="button"
                    className={`dining-pref-btn ${orderInfo.diningPreference === 'dine-in' ? 'active' : ''}`}
                    onClick={() => setDiningPreference('dine-in')}
                  >
                    <Utensils size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    <span>Dine-In</span>
                  </button>
                  <button
                    type="button"
                    className={`dining-pref-btn ${orderInfo.diningPreference === 'takeaway' ? 'active' : ''}`}
                    onClick={() => setDiningPreference('takeaway')}
                  >
                    <Package size={14} style={{ display: 'inline', marginRight: '6px' }} />
                    <span>Takeaway / Parcel</span>
                  </button>
                </div>
              </div>

              {/* Customer Name */}
              <div>
                <label
                  htmlFor="cart-cust-name"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-burgundy)',
                    marginBottom: '6px',
                  }}
                >
                  <User size={14} />
                  <span>Your Name (Optional)</span>
                </label>
                <input
                  id="cart-cust-name"
                  type="text"
                  placeholder="e.g. Ankit Verma"
                  value={orderInfo.customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid rgba(112, 40, 58, 0.2)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Special Instructions Notes */}
              <div>
                <label
                  htmlFor="cart-order-notes"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-burgundy)',
                    marginBottom: '6px',
                  }}
                >
                  <FileText size={14} />
                  <span>Special Preparation Instructions (Optional)</span>
                </label>
                <textarea
                  id="cart-order-notes"
                  rows={2}
                  placeholder="e.g. Less spicy, extra green chutney, pack parcel separately..."
                  value={orderInfo.notes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    fontSize: '0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid rgba(112, 40, 58, 0.2)',
                    outline: 'none',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Itemized Subtotal:</span>
              <span className="cart-grand-price">₹{subtotal}</span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
              *Taxes & parcel packaging charges (if applicable) will be detailed by the restaurant upon order confirmation.
            </p>

            <button
              type="button"
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              onClick={handleCheckout}
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span>Send Order to WhatsApp (₹{subtotal})</span>
            </button>

            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-light)',
                textAlign: 'center',
              }}
            >
              Notice: The restaurant team must confirm your order request on WhatsApp before preparation begins.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
