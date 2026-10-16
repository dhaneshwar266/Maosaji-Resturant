import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Calendar, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';
import { useCart } from '../../context/useCart';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="navbar-sticky">
        <div className="container navbar-container">
          {/* Brand Logo & Title */}
          <a href="#" className="brand-logo-link" aria-label="Maosaji Home">
            <div className="brand-emblem-royal" aria-hidden="true">
              <span
                style={{
                  fontFamily: 'var(--font-royal)',
                  color: 'var(--color-gold-light)',
                  fontWeight: 900,
                  fontSize: '1.45rem',
                }}
              >
                M
              </span>
            </div>
            <div className="brand-text-block">
              <span className="brand-name-royal">Maosaji</span>
              <span className="brand-tagline-royal">{RESTAURANT_CONFIG.tagline}</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links-desktop">
              {navLinks.map((link) => (
                <li key={link.label} className="nav-link-item">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="nav-actions">
            {/* Cart Trigger Button */}
            <button
              type="button"
              className="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`View Cart, ${totalItems} items`}
              title="Open Cart & Checkout"
            >
              <ShoppingBag size={20} aria-hidden="true" />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Reserve Table CTA */}
            <a href="#reservation" className="btn btn-primary nav-reserve-btn">
              <Calendar size={16} aria-hidden="true" />
              <span>Reserve Table</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <MenuIcon size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Out Drawer */}
      <aside
        className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}
        aria-label="Mobile Navigation Drawer"
      >
        <div className="mobile-drawer-header">
          <div className="brand-text-block">
            <span className="brand-name" style={{ fontSize: '1.3rem' }}>
              Maosaji
            </span>
            <span className="brand-tagline">{RESTAURANT_CONFIG.tagline}</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile Links">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <span>{link.label}</span>
                  <span style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}>→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <a
            href="#reservation"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Calendar size={18} aria-hidden="true" />
            <span>Reserve Table</span>
          </a>
          <button
            type="button"
            className="btn btn-outline-gold"
            style={{ width: '100%' }}
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            <span>Open Cart ({totalItems})</span>
          </button>
        </div>

        <div className="mobile-drawer-contact">
          <div className="mobile-contact-line">
            <Phone size={16} color="var(--color-gold)" aria-hidden="true" />
            <a href={RESTAURANT_CONFIG.phoneTelUrl}>{RESTAURANT_CONFIG.phoneDisplay}</a>
          </div>
          <div className="mobile-contact-line">
            <MapPin size={16} color="var(--color-gold)" aria-hidden="true" />
            <span>{RESTAURANT_CONFIG.locationArea}</span>
          </div>
        </div>
      </aside>
    </>
  );
};
