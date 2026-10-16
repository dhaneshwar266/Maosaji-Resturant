import React from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {

  return (
    <footer className="footer-main" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="brand-emblem" aria-hidden="true">
                <span
                  style={{
                    fontFamily: 'var(--font-royal)',
                    color: 'var(--color-gold-light)',
                    fontWeight: 800,
                    fontSize: '1.3rem',
                  }}
                >
                  M
                </span>
              </div>
              <div className="brand-text-block">
                <span className="brand-name" style={{ fontSize: '1.35rem' }}>
                  Maosaji
                </span>
                <span className="brand-tagline">{RESTAURANT_CONFIG.tagline}</span>
              </div>
            </div>

            <p style={{ color: 'var(--color-cream)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              A sanctuary of authentic Indian vegetarian culinary craftsmanship in Bilaspur, Chhattisgarh. Serving
              crispy dosas, traditional Chatori Street savories, Punjabi thalis, and pure sweets with genuine warmth.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(228, 173, 82, 0.15)',
                border: '1px solid rgba(228, 173, 82, 0.35)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                color: 'var(--color-gold-light)',
                fontWeight: 700,
              }}
            >
              <ShieldCheck size={14} aria-hidden="true" />
              <span>100% Pure Vegetarian Restaurant</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="footer-col-title">Navigation</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#menu">Digital Menu (78 Dishes)</a>
              </li>
              <li>
                <a href="#featured">Signature Delicacies</a>
              </li>
              <li>
                <a href="#about">Our Culinary Heritage</a>
              </li>
              <li>
                <a href="#gallery">Food & Dining Gallery</a>
              </li>
              <li>
                <a href="#reservation">Table Reservations</a>
              </li>
              <li>
                <a href="#location">Directions & Location</a>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="footer-col-title">Cuisine Categories</h3>
            <ul className="footer-links-list">
              <li>
                <a href="#menu">Chatori Street & Chaat</a>
              </li>
              <li>
                <a href="#menu">South Indian Snacks</a>
              </li>
              <li>
                <a href="#menu">Snacks & Thali Platters</a>
              </li>
              <li>
                <a href="#menu">Chinese Corner & Noodles</a>
              </li>
              <li>
                <a href="#menu">Burgers & Sandwiches</a>
              </li>
              <li>
                <a href="#menu">Traditional Sweets (Mithai)</a>
              </li>
            </ul>
          </div>

          {/* Contact & Map Links */}
          <div>
            <h3 className="footer-col-title">Connect & Visit</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                <span style={{ fontSize: '0.88rem', color: 'var(--color-cream)', lineHeight: 1.5 }}>
                  {RESTAURANT_CONFIG.locationArea}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                <a
                  href={RESTAURANT_CONFIG.phoneTelUrl}
                  style={{ fontSize: '0.9rem', color: 'var(--color-ivory)', fontWeight: 600 }}
                >
                  {RESTAURANT_CONFIG.phoneDisplay}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={18} color="#25D366" style={{ flexShrink: 0 }} aria-hidden="true" />
                <a
                  href={RESTAURANT_CONFIG.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.9rem', color: '#25D366', fontWeight: 600 }}
                >
                  WhatsApp: +91 62664 44862
                </a>
              </div>

              <div style={{ marginTop: '8px' }}>
                <a
                  href={RESTAURANT_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-gold"
                  style={{ padding: '8px 16px', fontSize: '0.82rem', width: '100%' }}
                >
                  <span>Google Maps Pin</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>
            © {CURRENT_YEAR} <strong>{RESTAURANT_CONFIG.name}</strong>. All rights reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted with Indian Culinary Tradition</span>
            <Heart size={14} color="var(--color-gold)" fill="var(--color-gold)" aria-hidden="true" />
            <span>in Bilaspur, CG</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
