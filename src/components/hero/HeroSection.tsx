import React from 'react';
import { Utensils, Calendar, MessageCircle, ShieldCheck, Flame, Heart } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurantConfig';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-royal-section" aria-labelledby="hero-title">
      <div className="hero-royal-backdrop-mandala" aria-hidden="true" />

      <div className="container hero-royal-grid">
        {/* Left Editorial Copy */}
        <div className="hero-copy-column">
          <div className="hero-sanskrit-tag">
            <span>॥ शुद्ध शाकाहारी • भारतीय स्वाद परंपरा ॥</span>
          </div>

          <h1 id="hero-title" className="hero-royal-heading">
            A Tradition of Taste,
            <span className="hero-highlight-gold">Made for Every Occasion.</span>
          </h1>

          <p className="hero-royal-sub">{RESTAURANT_CONFIG.heroSubheadline}</p>

          <div className="hero-royal-ctas">
            <a href="#menu" className="btn btn-primary">
              <Utensils size={18} aria-hidden="true" />
              <span>Explore Menu</span>
            </a>
            <a href="#reservation" className="btn btn-outline-gold">
              <Calendar size={18} aria-hidden="true" />
              <span>Book Table</span>
            </a>
            <a
              href={RESTAURANT_CONFIG.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              aria-label="Direct WhatsApp Ordering"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>WhatsApp Quick Order</span>
            </a>
          </div>

          {/* Floating Heritage Medallions */}
          <div className="hero-heritage-medallions">
            <div className="heritage-medallion">
              <div className="medallion-icon" aria-hidden="true">
                <ShieldCheck size={20} />
              </div>
              <span className="medallion-title">100% शुद्ध शाकाहारी</span>
              <span className="medallion-sub">Pure Vegetarian Kitchen</span>
            </div>

            <div className="heritage-medallion">
              <div className="medallion-icon" aria-hidden="true">
                <Flame size={20} />
              </div>
              <span className="medallion-title">ताज़ा मसाले व घी</span>
              <span className="medallion-sub">Crafted Fresh Daily</span>
            </div>

            <div className="heritage-medallion">
              <div className="medallion-icon" aria-hidden="true">
                <Heart size={20} />
              </div>
              <span className="medallion-title">पारिवारिक आतिथ्य</span>
              <span className="medallion-sub">Family Hospitality</span>
            </div>

            <div className="heritage-medallion">
              <div className="medallion-icon" aria-hidden="true">
                <Utensils size={20} />
              </div>
              <span className="medallion-title">78 स्वादिष्ट व्यंजन</span>
              <span className="medallion-sub">Chaat, Dosa & Mithai</span>
            </div>
          </div>
        </div>

        {/* Right Architectural Jharokha Window Frame */}
        <div className="hero-visual-column">
          <div className="hero-jharokha-frame">
            <div className="hero-jharokha-inner">
              <img
                src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80"
                alt="Crispy golden roasted masala dosa with freshly stone-ground coconut chutney and aromatic sambhar"
                className="hero-jharokha-img"
                loading="eager"
              />
              <div className="hero-jharokha-badge-overlay">
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-bright)',
                    letterSpacing: '0.12em',
                    marginBottom: '4px',
                  }}
                >
                  राजसी स्वाद • Signature Heritage Dish
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                  }}
                >
                  Crispy Golden Dosas & Chatori Chaat
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-cream)', marginTop: '4px' }}>
                  Handcrafted with pure desi butter and traditional fermentation in Bilaspur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
