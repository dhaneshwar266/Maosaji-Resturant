import React from 'react';
import { Utensils, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';
import { useCart } from '../../context/useCart';

export const MobileQuickBar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="mobile-quick-action-bar" aria-label="Mobile Quick Actions">
      <a href="#menu" className="quick-bar-item" aria-label="Browse Menu">
        <Utensils size={19} aria-hidden="true" />
        <span>Menu</span>
      </a>

      <a
        href={RESTAURANT_CONFIG.whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="quick-bar-item"
        style={{ color: '#25D366' }}
        aria-label="Order on WhatsApp"
      >
        <MessageCircle size={20} aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      <a
        href={RESTAURANT_CONFIG.phoneTelUrl}
        className="quick-bar-item"
        aria-label={`Call ${RESTAURANT_CONFIG.phoneDisplay}`}
      >
        <Phone size={19} aria-hidden="true" />
        <span>Call</span>
      </a>

      <button
        type="button"
        className="quick-bar-item"
        onClick={() => setIsCartOpen(true)}
        aria-label={`View Cart, ${totalItems} items`}
      >
        <ShoppingBag size={19} aria-hidden="true" />
        <span>Cart</span>
        {totalItems > 0 && <span className="quick-bar-cart-badge">{totalItems}</span>}
      </button>
    </nav>
  );
};
